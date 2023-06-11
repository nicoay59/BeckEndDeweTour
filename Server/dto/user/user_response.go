package userdatadto

import "dumbmerch/models"

type UserDataResponse struct {
	ID            int                        `json:"id"`
	FullName      string                     `json:"fullname" form:"fullname"`
	Email         string                     `json:"email" form:"email"`
	Password      string                     `json:"password" form:"password"`
	Address       string                     `json:"address" form:"address"`
	Phone         string                     `json:"phone" form:"phone"`
	Role         string                     `json:"role" form:"role"`
	TransactionID int                        `json:"transaction_id"`
	Transaction   models.TransactionResponse `json:"transaction"`
}
