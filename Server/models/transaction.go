package models

// url = {your_host}/api/v1/users
// mehtod = GET
// response body =
// ### 2. Delete Users
// >**url** = {your_host}/api/v1/user/{id_user}
// **method** = DELETE
// **response body** =

// >```json
// data: {
//   "id" : 1
// }

type Transaction struct {
	ID         int              `json:"id"`
	CounterQty int              `json:"counter_qty"`
	Total      int              `json:"total"`
	Status     string           `json:"status" gorm:"varchar(255)"`
	Attachment string           `json:"attachment" gorm:"varchar(255)"`
	TripID     int              `json:"trip_id"`
	Trip       TripResponse      `json:"trip" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	UserDataID int              `json:"userdata_id"`
	UserData   UserDataResponse `json:"userdata" gorm:"foreignKey:UserDataID"`
}

type TransactionResponse struct {
	ID         int    `json:"id"`
	CounterQty int    `json:"counter_qty"`
	Total      int    `json:"total"`
	Status     string `json:"status"`
	// Attachment string `json:"attachment"`
	TripID     int    `json:"trip_id"`
	Trip       Trip   `json:"trip"`
	UserDataID int              `json:"userdata_id"`

}

func (TransactionResponse) TableName() string {
	return "transactions"
}
