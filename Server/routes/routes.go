package routes

import "github.com/labstack/echo/v4"

func RouteInit(e *echo.Group) {
	UserDataRoutes(e)
	DataCountryRoutes(e)
	TripRoutes(e)
	TransactionRoutes(e)
	AuthRoutes(e)
	// ProfileRoutes(e)
	// ProductRoutes(e)
	// CategoryRoutes(e)
}
