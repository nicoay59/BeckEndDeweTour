package repository

import (
	"dumbmerch/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransaction() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(status string, orderId int) (models.Transaction, error)
	DeleteTransaction(transaction models.Transaction, ID int) (models.Transaction, error)
	GetTransByUSer(ID int) ([]models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransaction() ([]models.Transaction, error) {
	var transaction []models.Transaction
	// err := r.db.Find(&Transaction).Error
	err := r.db.Preload("UserData").Preload("Trip.Country").Find(&transaction).Error

	return transaction, err
}

func (r *repository) GetTransByUSer(ID int) ([]models.Transaction, error) {
	var transaction []models.Transaction
	err := r.db.Where("user_data_id=?", ID).Preload("UserData").Preload("Trip.Country").Find(&transaction).Error

	return transaction, err
	
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("UserData").Preload("Trip.Country").First(&transaction, ID).Error
	// err := r.db.First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(status string, orderId int) (models.Transaction, error) {
	var transaction models.Transaction
	r.db.Preload("Trip.Country").First(&transaction, orderId)

	transaction.Status = status
	err := r.db.Save(&transaction).Error
	return transaction, err
}

func (r *repository) DeleteTransaction(transaction models.Transaction, ID int) (models.Transaction, error) {
	err := r.db.Delete(&transaction, ID).Scan(&transaction).Error

	return transaction, err
}
