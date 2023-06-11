package routes

import (
	"dumbmerch/handlers"
	"dumbmerch/pkg/middleware"
	"dumbmerch/pkg/mysql"
	"dumbmerch/repository"

	"github.com/labstack/echo/v4"
)

func TripRoutes(e *echo.Group) {
	tripRepository := repository.RepositoryTrip(mysql.DB)
	h := handlers.HandlerTrip(tripRepository)

	e.GET("/trips", h.FindTrip)
	e.GET("/trip/:id", h.GetTrip)
	e.POST("/trip", middleware.UploadFile(h.CreateTrip))
	e.PATCH("/trip/:id", h.UpdateTrip)
	e.DELETE("/trip/:id", h.DeleteTrip)
	// middleware.Auth()
	// 	middleware.Auth()
	// 	middleware.Auth()
}
