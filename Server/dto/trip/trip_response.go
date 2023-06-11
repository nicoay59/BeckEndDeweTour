package tripdto

import "dumbmerch/models"

type TripResponse struct {
	Title          string                 `json:"title" gorm:"varchar(255)"`
	CountryID      int                    `json:"country_id"`
	Country        models.CountryResponse `json:"country"`
	Acomodation    string                 `json:"acomodation" gorm:"varchar(255)"`
	Transportation string                 `json:"transportation" gorm:"varchar(255)"`
	Eat            string                 `json:"eat" gorm:"varchar(255)"`
	Day            int                    `json:"day"`
	Night          int                    `json:"night"`
	DateTrip       string                 `json:"date_trip" gorm:"varchar(255)"`
	Price          int                    `json:"price"`
	Quota          int                    `json:"quota"`
	Description    string                 `json:"description" gorm:"type:text"`
	Image          string                 `json:"image" gorm:"varchar(255)"`
}
