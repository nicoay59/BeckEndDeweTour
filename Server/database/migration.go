package database

import (
	"dumbmerch/models"
	"dumbmerch/pkg/mysql"
	"fmt"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.UserData{},
		&models.Country{},
		&models.Trip{},
		&models.Transaction{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration Failed😢😢😢😢")
	}

	fmt.Println("Migration Success😎😎👍👍👍👍👌👌👌")
}
