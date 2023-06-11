package userdatadto

type CreateUserDataRequest struct {
	FullName string `json:"fullname" form:"fullname" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required"`
	Password string `json:"password" form:"password" validate:"required"`
	Address  string `json:"address" form:"address" validate:"required"`
	Phone    string `json:"phone" form:"phone" validate:"required"`
	Role    string `json:"role" form:"role"`
}

type UpdateUserDataRequest struct {
	FullName string `json:"fullname" form:"fullname"`
	Email    string `json:"email" form:"email"`
	Password string `json:"password" form:"password"`
	Address  string `json:"address" form:"address"`
	Phone    string `json:"phone" form:"phone"`
	Role    string `json:"role" form:"role"`
}
