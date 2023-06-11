package handlers

import (
	dto "dumbmerch/dto/result"
	transactiondto "dumbmerch/dto/transaction"
	"dumbmerch/models"
	"dumbmerch/repository"
	"fmt"
	"net/http"
	"strconv"
	"time"
	"os"
	"log"
	"gopkg.in/gomail.v2"



	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

type TransactionHandler struct {
	TransactionRepository repository.TransactionRepository
}



func HandlerTransaction(TransactionRepository repository.TransactionRepository) *TransactionHandler {
	return &TransactionHandler{TransactionRepository}
}

var path_files = "http://localhost:5000/uploads/"

func (h *TransactionHandler) FindTransaction(c echo.Context) error {
	transaction, err := h.TransactionRepository.FindTransaction()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	for i, p := range transaction {
		transaction[i].Attachment = path_files + p.Attachment
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transaction})
}

func (h *TransactionHandler) GetTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	transaction.Attachment = os.Getenv("PATH_FILE") + transaction.Attachment
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transaction})
}


func (h *TransactionHandler) GetTransByUSer(c echo.Context) error {
	// id, _ := strconv.Atoi(c.Param("id"))
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	transaction, err := h.TransactionRepository.GetTransByUSer(int(userId))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	// transaction.Attachment = path_file + transaction.Attachment
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: transaction})
}

func (h *TransactionHandler) CreateTransaction(c echo.Context) error {
	// request := new(transactiondto.CreateTransactionRequest)
	// if err := c.Bind(request); err != nil {
	// 	return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	// }
	
	// dataFile := c.Get("dataFile").(string)
	// fmt.Println("this is data file", dataFile)

	counterqty, _ := strconv.Atoi(c.FormValue("counter_qty"))
	// fmt.Println(countryid)
	total, _ := strconv.Atoi(c.FormValue("total"))
	tripid, _ := strconv.Atoi(c.FormValue("trip_id"))
	// userdataid, _ := strconv.Atoi(c.FormValue("userdata_id"))

	
	
		userLogin := c.Get("userLogin")
		userId := userLogin.(jwt.MapClaims)["id"].(float64)

		
		request := transactiondto.CreateTransactionRequest{
			CounterQty: counterqty,
			Total:      total,
			Status:     c.FormValue("status"),
			// Attachment: dataFile,
			TripID:     tripid,
			UserDataID: int(userId),
		}
		fmt.Println(request, "ini request dapet nggaknya")
		
		request.Status = "pending"
		request.UserDataID = int(userId)

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	var transactionIsMatch = false
	var transactionId int
	for !transactionIsMatch {
	transactionId = int(time.Now().Unix())
	transactionData, _ := h.TransactionRepository.GetTransaction(transactionId)
	if transactionData.ID == 0 {
		transactionIsMatch = true
	}
	}

	transaction := models.Transaction{
		ID: transactionId,
		CounterQty: request.CounterQty,
		Total:      request.Total,
		Status:     request.Status,
		// Attachment: request.Attachment,
		TripID:     request.TripID,
		UserDataID: int(userId),
	}
	
	data, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}
	
	// 1. Initiate Snap client
	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)
	// Use to midtrans.Production if you want Production Environment (accept real transaction).

	// 2. Initiate Snap request param
	req := &snap.Request{
	TransactionDetails: midtrans.TransactionDetails{
		OrderID:  strconv.Itoa(data.ID),
		GrossAmt: int64(data.Total),
	},
	CreditCard: &snap.CreditCardDetails{
		Secure: true,
	},
	CustomerDetail: &midtrans.CustomerDetails{
		FName: data.UserData.FullName,
		Email: data.UserData.Email,
	},
}

// 3. Execute request create Snap transaction to Midtrans Snap API
snapResp, _ := s.CreateTransaction(req)

return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: snapResp})

// transaction, _ = h.TransactionRepository.GetTransaction(transaction.ID)

// return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}




func (h *TransactionHandler) Notification(c echo.Context) error {
	var notificationPayload map[string]interface{}

	if err := c.Bind(&notificationPayload); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)

	order_id, _ := strconv.Atoi(orderId)

	fmt.Print("ini payloadnya", notificationPayload)

	transaction, _ := h.TransactionRepository.GetTransaction(order_id)

	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			// TODO set transaction status on your database to 'challenge'
			// e.g: 'Payment status challenged. Please take action on your Merchant Administration Portal
			h.TransactionRepository.UpdateTransaction("pending", order_id)
			} else if fraudStatus == "accept" {
				// TODO set transaction status on your database to 'success'
				SendMail("success", transaction)
			h.TransactionRepository.UpdateTransaction("success", order_id)
		}
	} else if transactionStatus == "settlement" {
		// TODO set transaction status on your databaase to 'success'
		SendMail("success", transaction)
		h.TransactionRepository.UpdateTransaction("success", order_id)
	} else if transactionStatus == "deny" {
		// TODO you can ignore 'deny', because most of the time it allows payment retries
		// and later can become success
		h.TransactionRepository.UpdateTransaction("failed", order_id)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		// TODO set transaction status on your databaase to 'failure'
		h.TransactionRepository.UpdateTransaction("failed", order_id)
	} else if transactionStatus == "pending" {
		// TODO set transaction status on your databaase to 'pending' / waiting payment
		h.TransactionRepository.UpdateTransaction("pending", order_id)
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: notificationPayload})
}

func SendMail(status string, transaction models.Transaction) {

	if status != transaction.Status && (status == "success") {
		var CONFIG_SMTP_HOST = "smtp.gmail.com"
		var CONFIG_SMTP_PORT = 587
		var CONFIG_SENDER_NAME = "DeweTour - <nicoay59@gmail.com>"
		var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
		var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")

		var productName = transaction.Trip.Title
		var price = strconv.Itoa(transaction.Total)

		mailer := gomail.NewMessage()
		mailer.SetHeader("From", CONFIG_SENDER_NAME)
		mailer.SetHeader("To", transaction.UserData.Email)
		mailer.SetHeader("Subject", "Transaction Status")
		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
		<html lang="en">
			<head>
			<meta charset="UTF-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Document</title>
			<style>
			h1 {
			color: brown;
			}
			</style>
			</head>
			<body>
			<h2>Product payment :</h2>
			<ul style="list-style-type:none;">
			<li>Name : %s</li>
			<li>Total payment: Rp.%s</li>
			<li>Status : <b>%s</b></li>
			</ul>
			</body>
		</html>`, productName, price, status))

		dialer := gomail.NewDialer(
			CONFIG_SMTP_HOST,
			CONFIG_SMTP_PORT,
			CONFIG_AUTH_EMAIL,
			CONFIG_AUTH_PASSWORD,
		)

		err := dialer.DialAndSend(mailer)
		if err != nil {
			log.Fatal(err.Error())
		}

		log.Println("Mail sent! to " + transaction.UserData.Email)
	}
}




// func (h *TransactionHandler) UpdateTransaction(c echo.Context) error {
// 	request := new(transactiondto.UpdateTransactionRequest)
// 	if err := c.Bind(&request); err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	}

// 	id, _ := strconv.Atoi(c.Param("id"))

// 	transaction, err := h.TransactionRepository.GetTransaction(id)

// 	if err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	}

// 	if request.CounterQty != 0 {
// 		transaction.CounterQty = request.CounterQty
// 	}
// 	if request.Total != 0 {
// 		transaction.Total = request.Total
// 	}

// 	if request.Status != "" {
// 		transaction.Status = request.Status
// 	}

// 	// if request.Attachment != "" {
// 	// 	transaction.Attachment = request.Attachment
// 	// }
// 	if request.TripID != 0 {
// 		transaction.TripID = request.TripID
// 	}
// 	// if request.Trip != "" {
// 	// 	transaction.Trip = request.Trip
// 	// }

// 	data, err := h.TransactionRepository.UpdateTransaction(transaction)
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 	}

// 	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertTransactionResponse(data)})
// }

func (h *TransactionHandler) DeleteTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.TransactionRepository.DeleteTransaction(transaction, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertTransactionResponse(data)})
}

func convertTransactionResponse(u models.Transaction) transactiondto.TransactionResponse {
	return transactiondto.TransactionResponse{
		CounterQty: u.CounterQty,
		Total:      u.Total,
		Status:     u.Status,
		Attachment: u.Attachment,
		TripID:     u.TripID,
		Trip:       models.Trip(u.Trip),
	}
}
