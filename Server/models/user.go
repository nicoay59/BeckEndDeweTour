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

type UserData struct {
	ID          int           `json:"id"`
	FullName    string        `json:"fullname" gorm:"varchar(255)"`
	Email       string        `json:"email" gorm:"varchar(255)"`
	Password    string        `json:"password" gorm:"varchar(255)"`
	Phone       string        `json:"phone"`
	Address     string        `json:"address" gorm:"varchar(255)"`
	Role string `json:"role" gorm:"varchar(255)"`
	TransactionID int `json:"transaction_id"`
	Transaction []TransactionResponse `json:"transaction" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type UserDataResponse struct {
	ID       int    `json:"id"`
	FullName string `json:"fullname" gorm:"varchar(255)"`
	Email    string `json:"email" gorm:"varchar(255)"`
	Password string `json:"password" gorm:"varchar(255)"`
	Phone    string `json:"phone"`
	Address  string `json:"address" gorm:"varchar(255)"`
	Role string `json:"role" gorm:"varchar(255)"`
}

func (UserDataResponse) TableName() string {
	return "user_data"
}
