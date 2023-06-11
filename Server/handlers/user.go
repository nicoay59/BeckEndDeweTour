package handlers

import (
	dto "dumbmerch/dto/result"
	usersdto "dumbmerch/dto/user"
	"dumbmerch/models"
	"dumbmerch/repository"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type UserDataHandler struct {
	UserDataRepository repository.UserDataRepository
}

func HandlerUserData(UserDataRepository repository.UserDataRepository) *UserDataHandler {
	return &UserDataHandler{UserDataRepository}
}

func (h *UserDataHandler) FindUsers(c echo.Context) error {
	userData, err := h.UserDataRepository.FindUsers()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: userData})
}

func (h *UserDataHandler) GetTrans(c echo.Context) error {
	userData, err := h.UserDataRepository.GetTrans()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: userData})
}

func (h *UserDataHandler) GetUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	userData, err := h.UserDataRepository.GetUser(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: userData})
}

func (h *UserDataHandler) CreateUser(c echo.Context) error {
	request := new(usersdto.CreateUserDataRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	user := models.UserData{
		FullName: request.FullName,
		Email:    request.Email,
		Password: request.Password,
		Address:  request.Address,
		Phone:    request.Phone,
		Role: request.Role,
	}

	data, err := h.UserDataRepository.CreateUser(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(data)})
}

func (h *UserDataHandler) UpdateUser(c echo.Context) error {
	request := new(usersdto.UpdateUserDataRequest)
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserDataRepository.GetUser(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.FullName != "" {
		user.FullName = request.FullName
	}

	if request.Email != "" {
		user.Email = request.Email
	}

	if request.Password != "" {
		user.Password = request.Password
	}
	if request.Address != "" {
		user.Address = request.Address
	}
	if request.Phone != "" {
		user.Phone = request.Phone
	}
	if request.Role != "" {
		user.Role = request.Role
	}

	data, err := h.UserDataRepository.UpdateUser(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(data)})
}

func (h *UserDataHandler) DeleteUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserDataRepository.GetUser(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.UserDataRepository.DeleteUser(user, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(data)})
}

func convertResponse(u models.UserData) usersdto.UserDataResponse {
	return usersdto.UserDataResponse{
		ID:       u.ID,
		FullName: u.FullName,
		Email:    u.Email,
		Password: u.Password,
		Address:  u.Address,
		Phone:    u.Phone,
		Role: u.Role,
	}
}
