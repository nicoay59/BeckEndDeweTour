package handlers

import (
	dto "dumbmerch/dto/result"
	tripdto "dumbmerch/dto/trip"
	"dumbmerch/models"
	"dumbmerch/repository"
	"fmt"
	"net/http"
	"strconv"






	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type TripHandler struct {
	TripRepository repository.TripRepository
}

func HandlerTrip(TripRepository repository.TripRepository) *TripHandler {
	return &TripHandler{TripRepository}
}

var path_file = "http://localhost:5000/uploads/"



func (h *TripHandler) FindTrip(c echo.Context) error {
	trip, err := h.TripRepository.FindTrip()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// for i, p := range trip {
	// 	imagePath := os.Getenv("PATH_FILE") + p.Image
	// 	trip[i].Image = imagePath
	//   }
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: trip})
}

func (h *TripHandler) GetTrip(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	trip, err := h.TripRepository.GetTrip(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// trip.Image = os.Getenv("PATH_FILE") + trip.Image
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: trip})
}

func (h *TripHandler) CreateTrip(c echo.Context) error {

	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	countryid, _ := strconv.Atoi(c.FormValue("country_id"))
	fmt.Println(countryid)
	day, _ := strconv.Atoi(c.FormValue("day"))
	night, _ := strconv.Atoi(c.FormValue("night"))
	price, _ := strconv.Atoi(c.FormValue("price"))
	quota, _ := strconv.Atoi(c.FormValue("quota"))

	request := tripdto.CreateTripRequest{
		Title:          c.FormValue("title"),
		CountryID:      countryid,
		Acomodation:    c.FormValue("acomodation"),
		Transportation: c.FormValue("transportation"),
		Eat:            c.FormValue("eat"),
		Day:            day,
		Night:          night,
		DateTrip:       c.FormValue("date_trip"),
		Price:          price,
		Quota:          quota,
		Description:    c.FormValue("description"),
		Image:          dataFile,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}







	// trip, err = h.TripRepository.CreateTrip(trip)
	// if err != nil {
	//   return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	// }

	// trip, _ = h.TripRepository.GetTrip(trip.ID)

	// return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseTrip(trip)})

	trip := models.Trip{
		// FullName: request.FullName,
		// Email:    request.Email,
		// Password: request.Password,
		// Address:  request.Address,
		// Phone:    request.Phone,
		Title:          request.Title,
		Country:        request.Country,
		CountryID:      request.CountryID,
		Acomodation:    request.Acomodation,
		Transportation: request.Transportation,
		Eat:            request.Eat,
		Day:            request.Day,
		Night:          request.Night,
		DateTrip:       request.DateTrip,
		Price:          request.Price,
		Quota:          request.Quota,
		Description:    request.Description,
		Image:          dataFile,
	}

	data, err := h.TripRepository.CreateTrip(trip)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertTripResponse(data)})
}

func (h *TripHandler) UpdateTrip(c echo.Context) error {
	request := new(tripdto.UpdateTripRequest)
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))

	trip, err := h.TripRepository.GetTrip(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Title != "" {
		trip.Title = request.Title
	}
	if request.CountryID != 0 {
		trip.CountryID = request.CountryID
	}

	// if request.Country != request.Country {
	// 	trip.Country = request.Country
	// }

	if request.Acomodation != "" {
		trip.Acomodation = request.Acomodation
	}
	if request.Transportation != "" {
		trip.Transportation = request.Transportation
	}
	if request.Eat != "" {
		trip.Eat = request.Eat
	}
	if request.Day != 0 {
		trip.Day = request.Day
	}
	if request.Night != 0 {
		trip.Night = request.Night
	}
	if request.DateTrip != "" {
		trip.DateTrip = request.DateTrip
	}
	if request.Price != 0 {
		trip.Price = request.Price
	}
	if request.Quota != 0 {
		trip.Quota = request.Quota
	}
	if request.Description != "" {
		trip.Description = request.Description
	}
	if request.Image != "" {
		trip.Image = request.Image
	}

	data, err := h.TripRepository.UpdateTrip(trip)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertTripResponse(data)})
}

func (h *TripHandler) DeleteTrip(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	trip, err := h.TripRepository.GetTrip(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.TripRepository.DeleteTrip(trip, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertTripResponse(data)})
}

func convertTripResponse(u models.Trip) tripdto.TripResponse {
	return tripdto.TripResponse{
		// ID:   u.ID,
		// Name: u.Name,
		Title: u.Title,
		// CountryID:      u.CountryID,
		Country:        u.Country,
		Acomodation:    u.Acomodation,
		Transportation: u.Transportation,
		Eat:            u.Eat,
		Day:            u.Day,
		Night:          u.Night,
		DateTrip:       u.DateTrip,
		Price:          u.Price,
		Quota:          u.Quota,
		Description:    u.Description,
		Image:          u.Image,
	}
}
