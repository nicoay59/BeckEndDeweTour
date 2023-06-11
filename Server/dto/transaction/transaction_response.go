package transactiondto

import "dumbmerch/models"

type TransactionResponse struct {
	CounterQty int         `json:"countery_qty"`
	Total      int         `json:"total"`
	Status     string      `json:"status" gorm:"varchar(255)"`
	Attachment string      `json:"attahcment" gorm:"varchar(255)"`
	TripID     int         `json:"transportation" gorm:"varchar(255)"`
	Trip       models.Trip `json:"trip"`
}
