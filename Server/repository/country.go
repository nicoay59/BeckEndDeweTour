package repository

import (
	"dumbmerch/models"

	"gorm.io/gorm"
)

type CountryRepository interface {
	FindCountry() ([]models.Country, error)
	GetCountry(ID int) (models.Country, error)
	CreateCountry(country models.Country) (models.Country, error)
	UpdateCountry(country models.Country) (models.Country, error)
	DeleteCountry(country models.Country, ID int) (models.Country, error)
}

func RepositoryDataCountry(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindCountry() ([]models.Country, error) {
	var countries []models.Country
	err := r.db.Find(&countries).Error
	// err := r.db.Preload("Trip").Find(&countries).Error

	return countries, err
}

func (r *repository) GetCountry(ID int) (models.Country, error) {
	var countries models.Country
	// err := r.db.Preload("Trip").First(&countries, ID).Error
	err := r.db.First(&countries, ID).Error

	return countries, err
}

func (r *repository) CreateCountry(countries models.Country) (models.Country, error) {
	err := r.db.Create(&countries).Error

	return countries, err
}

func (r *repository) UpdateCountry(countries models.Country) (models.Country, error) {
	err := r.db.Save(&countries).Error

	return countries, err
}

func (r *repository) DeleteCountry(countries models.Country, ID int) (models.Country, error) {
	err := r.db.Delete(&countries, ID).Scan(&countries).Error

	return countries, err
}
