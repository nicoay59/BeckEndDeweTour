package routes

import (
	"dumbmerch/handlers"
	"dumbmerch/pkg/mysql"
	"dumbmerch/repository"

	"github.com/labstack/echo/v4"
)

// HandlerDataCountry

func DataCountryRoutes(e *echo.Group) {
	countryRepository := repository.RepositoryDataCountry(mysql.DB)
	h := handlers.HandlerCountry(countryRepository)

	e.GET("/countries", h.FindCountry )
	e.GET("/country/:id", h.GetCountry)
	e.POST("/country", h.CreateCountry)
	e.PATCH("/country/:id", h.UpdateCountry)
	e.DELETE("/country/:id", h.DeleteCountry)
	// middleware.Auth()
	// middleware.Auth()
}
