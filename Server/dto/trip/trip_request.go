package tripdto

import "dumbmerch/models"

type CreateTripRequest struct {
	// FullName string `json:"fullname" form:"fullname" validate:"required"`
	// Email    string `json:"email" form:"email" validate:"required"`
	// Password string `json:"password" form:"password" validate:"required"`
	// Address  string `json:"address" form:"address" validate:"required"`
	// Phone    string `json:"phone" form:"phone" validate:"required"`
	Country        models.CountryResponse `json:"country" form:"country" validate:"required"`
	Title          string                 `json:"title" form:"title" validate:"required"`
	CountryID      int                    `json:"country_id" form:"country_id"`
	Acomodation    string                 `json:"acomodation" form:"acomodation" validate:"required"`
	Transportation string                 `json:"transportation" form:"transportation" validate:"required"`
	Eat            string                 `json:"eat" form:"eat" validate:"required"`
	Day            int                    `json:"day" form:"day" validate:"required"`
	Night          int                    `json:"night" form:"night" validate:"required"`
	DateTrip       string                 `json:"date_trip" form:"date_trip" validate:"required"`
	Price          int                    `json:"price" form:"price" validate:"required"`
	Quota          int                    `json:"quota" form:"quota" validate:"required"`
	Description    string                 `json:"description" form:"description" validate:"required"`
	Image          string                 `json:"image" form:"image" validate:"required"`
}

type UpdateTripRequest struct {
	// FullName string `json:"fullname" form:"fullname"`
	// Email    string `json:"email" form:"email"`
	// Password string `json:"password" form:"password"`
	// Address  string `json:"address" form:"address"`
	// Phone    string `json:"phone" form:"phone"`
	Title          string                 `json:"title" form:"title"`
	CountryID      int                    `json:"country_id" form:"country_id"`
	Country        models.CountryResponse `json:"country" form:"country"`
	Acomodation    string                 `json:"acomodation" form:"acomodation"`
	Transportation string                 `json:"transportation" form:"transportation"`
	Eat            string                 `json:"eat" form:"eat"`
	Day            int                    `json:"day" form:"day"`
	Night          int                    `json:"night" form:"night"`
	DateTrip       string                 `json:"date_trip" form:"date_trip"`
	Price          int                    `json:"price" form:"price"`
	Quota          int                    `json:"quota" form:"quota"`
	Description    string                 `json:"description" form:"description"`
	Image          string                 `json:"image" form:"image"`
}
