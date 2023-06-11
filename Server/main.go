package main

import (
	"dumbmerch/database"
	"dumbmerch/pkg/mysql"
	"dumbmerch/routes"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	godotenv.Load()
	e := echo.New()



	mysql.DatabaseInit()
	database.RunMigration()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PATCH, echo.DELETE},
		AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization"},
	}))

	routes.RouteInit(e.Group("/api/v1"))
	e.Static("/uploads", "./uploads")


	PORT := os.Getenv("PORT")

	fmt.Println("Success Running on port 5000 😎👍")
	e.Logger.Fatal(e.Start(":" + PORT))
}
