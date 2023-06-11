package countrydatadto

type CreateDataCountryRequest struct {
	Name string `json:"name" form:"name" validate:"required"`
}

type UpdateDataCOuntryRequest struct {
	Name string `json:"name" form:"name"`
}
