package countrydatadto

type DataCountryResponse struct {
	ID   int    `json:"id"`
	Name string `json:"name" form:"name" validate:"required"`
}
