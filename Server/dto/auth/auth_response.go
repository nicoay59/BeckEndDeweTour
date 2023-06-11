package authdto
// import "dumbmerch/models"

type LoginResponse struct {
	FullName string `gorm:"type: varchar(255)" json:"fullname"`
	Email    string `gorm:"type: varchar(255)" json:"email"`
	Password string `gorm:"type: varchar(255)" json:"password"`
	Token    string `gorm:"type: varchar(255)" json:"token"`
	Role    string `gorm:"type: varchar(255)" json:"role"`
	Address       string                     `gorm:"type: varchar(255)" json:"address"`
	Phone         string                     `gorm:"type: varchar(255)" json:"phone"`
	// TransactionID int                        `gorm:"type: varchar(255)" json:"transaction_id"`
	// Transaction   models.TransactionResponse `gorm:"type: varchar(255)" json:"transaction"`
	
}
