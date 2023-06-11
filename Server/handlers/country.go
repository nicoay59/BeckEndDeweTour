package handlers

import (
	countrydatadto "dumbmerch/dto/country"
	dto "dumbmerch/dto/result"
	"dumbmerch/models"
	"dumbmerch/repository"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type CountryHandler struct {
	CountryRepository repository.CountryRepository
}

func HandlerCountry(CountryRepository repository.CountryRepository) *CountryHandler {
	return &CountryHandler{CountryRepository}
}

func (h *CountryHandler) FindCountry(c echo.Context) error {
	Country, err := h.CountryRepository.FindCountry()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Country})
}

func (h *CountryHandler) GetCountry(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	Country, err := h.CountryRepository.GetCountry(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Country})
}

func (h *CountryHandler) CreateCountry(c echo.Context) error {
	request := new(countrydatadto.CreateDataCountryRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	country := models.Country{
		Name: request.Name,
	}

	data, err := h.CountryRepository.CreateCountry(country)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertCountryResponse(data)})
}

func (h *CountryHandler) UpdateCountry(c echo.Context) error {
	request := new(countrydatadto.UpdateDataCOuntryRequest)
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))

	country, err := h.CountryRepository.GetCountry(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Name != "" {
		country.Name = request.Name
	}

	data, err := h.CountryRepository.UpdateCountry(country)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertCountryResponse(data)})
}

func (h *CountryHandler) DeleteCountry(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	country, err := h.CountryRepository.GetCountry(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.CountryRepository.DeleteCountry(country, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertCountryResponse(data)})
}

func convertCountryResponse(u models.Country) countrydatadto.DataCountryResponse {
	return countrydatadto.DataCountryResponse{
		ID:   u.ID,
		Name: u.Name,
	}
}
