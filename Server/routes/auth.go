package routes

import (
	"dumbmerch/handlers"
	"dumbmerch/pkg/mysql"
	"dumbmerch/repository"
	"dumbmerch/pkg/middleware"


	"github.com/labstack/echo/v4"
)

func AuthRoutes(e *echo.Group) {
	authRepository := repository.RepositoryAuth(mysql.DB)
	h := handlers.HandlerAuth(authRepository)

	e.POST("/register", h.Register)
	e.POST("/login", h.Login) // add this code
	e.GET("/check-auth", middleware.Auth(h.CheckAuth)) // add this code

}
