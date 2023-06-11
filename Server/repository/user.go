package repository

import (
	"dumbmerch/models"

	"gorm.io/gorm"
)

type UserDataRepository interface {
	FindUsers() ([]models.UserData, error)
	GetUser(ID int) (models.UserData, error)
	GetTrans() ([]models.Transaction, error)
	CreateUser(user models.UserData) (models.UserData, error)
	UpdateUser(user models.UserData) (models.UserData, error)
	DeleteUser(user models.UserData, ID int) (models.UserData, error)
}

func RepositoryUserData(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindUsers() ([]models.UserData, error) {
	var users []models.UserData
	// err := r.db.Find(&users).Error
	err := r.db.Preload("Transaction.Trip.Country").Find(&users).Error

	return users, err
}
func (r *repository) GetTrans() ([]models.Transaction, error) {
	var trans []models.Transaction
	// err := r.db.Find(&users).Error
	err := r.db.Preload("Transaction").Find(&trans).Error

	return trans, err
}

func (r *repository) GetUser(ID int) (models.UserData, error) {
	var user models.UserData
	err := r.db.Preload("Transaction").First(&user, ID).Error
	// err := r.db.First(&user, ID).Error

	return user, err
}

func (r *repository) CreateUser(user models.UserData) (models.UserData, error) {
	err := r.db.Create(&user).Error

	return user, err
}

func (r *repository) UpdateUser(user models.UserData) (models.UserData, error) {
	err := r.db.Save(&user).Error

	return user, err
}

func (r *repository) DeleteUser(user models.UserData, ID int) (models.UserData, error) {
	err := r.db.Delete(&user, ID).Scan(&user).Error

	return user, err
}
