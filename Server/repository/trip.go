package repository

import (
	"dumbmerch/models"

	"gorm.io/gorm"
)

type TripRepository interface {
	FindTrip() ([]models.Trip, error)
	GetTrip(ID int) (models.Trip, error)
	CreateTrip(trip models.Trip) (models.Trip, error)
	UpdateTrip(trip models.Trip) (models.Trip, error)
	DeleteTrip(trip models.Trip, ID int) (models.Trip, error)
}

func RepositoryTrip(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTrip() ([]models.Trip, error) {
	var trip []models.Trip
	// err := r.db.Find(&trip).Error
	err := r.db.Preload("Country").Find(&trip).Error

	return trip, err
}

func (r *repository) GetTrip(ID int) (models.Trip, error) {
	var trip models.Trip
	err := r.db.Preload("Country").First(&trip, ID).Error
	// err := r.db.First(&trip, ID).Error

	return trip, err
}

func (r *repository) CreateTrip(trip models.Trip) (models.Trip, error) {
	err := r.db.Create(&trip).Error

	return trip, err
}

func (r *repository) UpdateTrip(trip models.Trip) (models.Trip, error) {
	err := r.db.Save(&trip).Error

	return trip, err
}

func (r *repository) DeleteTrip(trip models.Trip, ID int) (models.Trip, error) {
	err := r.db.Delete(&trip, ID).Scan(&trip).Error

	return trip, err
}
