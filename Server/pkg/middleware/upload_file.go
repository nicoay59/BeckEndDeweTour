package middleware

import (
	"fmt"
	"net/http"
	"os"
	"context"
	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"

	"github.com/labstack/echo/v4"
)

func UploadFile(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		file, err := c.FormFile("image")
		if file != nil {
		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}

		src, err := file.Open()
		if err != nil {
			return c.JSON(http.StatusBadRequest, err)
		}
		defer src.Close()

		var ctx = context.Background()
		var CLOUD_NAME = os.Getenv("CLOUD_NAME")
		var API_KEY = os.Getenv("API_KEY")
		var API_SECRET = os.Getenv("API_SECRET")
	
		// Add your Cloudinary credentials ...
		cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
	
		// Upload file to Cloudinary ...
		resp, err := cld.Upload.Upload(ctx, src, uploader.UploadParams{Folder: "dewe_tour"})
	
		if err != nil {
			fmt.Println(err.Error())
		}

		c.Set("dataFile", resp.SecureURL)
		return next(c)
	}
	
	c.Set("dataFile", "")
	return next(c)
	}
}
