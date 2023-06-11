package repository

import (
	"dumbmerch/models"

	"gorm.io/gorm"
)

type AuthRepository interface {
	Register(user models.UserData) (models.UserData, error)
	Login(email string) (models.UserData, error)
	CheckAuth(ID int) (models.UserData, error)

}

func RepositoryAuth(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Register(user models.UserData) (models.UserData, error) {
	err := r.db.Create(&user).Error

	return user, err
}

func (r *repository) Login(email string) (models.UserData, error) {
	var user models.UserData
	err := r.db.First(&user, "email=?", email).Error

	return user, err
}

func (r *repository) CheckAuth(ID int) (models.UserData, error) {
	var user models.UserData
	err := r.db.Preload("Transaction.Trip.Country").First(&user, ID).Error // add this code

	return user, err
}