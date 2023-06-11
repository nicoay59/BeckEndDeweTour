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

type Country struct {
	ID   int    `json:"id"`
	Name string `json:"country_name" gorm:"varchar(255)"`
}

type CountryResponse struct {
	ID   int    `json:"id"`
	Name string `json:"country_name"`
}

func (CountryResponse) TableName() string {
	return "countries"
}
