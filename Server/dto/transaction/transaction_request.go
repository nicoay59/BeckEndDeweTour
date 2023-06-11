package transactiondto

import "dumbmerch/models"

type CreateTransactionRequest struct {
	CounterQty int         `json:"counter_qty" form:"counter_qty" validate:"required"`
	Total      int         `json:"total" form:"total" validate:"required"`
	Status     string      `json:"status" form:"status"`
	Attachment string      `json:"attachment" form:"attachment"`
	TripID     int         `json:"trip_id" form:"trip_id" validate:"required"`
	Trip       models.Trip `json:"trip"`
	UserDataID int         `json:"userdata_id"`
}

type UpdateTransactionRequest struct {
	CounterQty int         `json:"counter_qty" form:"counter_qty"`
	Total      int         `json:"total" form:"total"`
	Status     string      `json:"status" form:"status"`
	Attachment string      `json:"attachment" form:"attachment"`
	TripID     int         `json:"trip_id" form:"trip_id"`
	Trip       models.Trip `json:"trip"`
}
