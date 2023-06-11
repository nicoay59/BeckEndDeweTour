package authdto

type AuthRequest struct {
	FullName string `json:"fullname" validate:"required"`
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
	Phone    string `json:"phone" validate:"required"`
	Address  string `json:"address" validate:"required"`
	Role  string `json:"role"`
}

type LoginRequest struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
}
