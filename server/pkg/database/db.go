package database

import (
	"MyndHarmony/models"
	"MyndHarmony/pkg/vars"

	"github.com/Avdushin/gogger/logger"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// @ Инициализация базы данных
func InitDB() {
	var err error
	dsn := vars.DB + " sslmode=disable TimeZone=Europe/Moscow"
	logger.Info("Database adres %s", dsn)

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		logger.Error("Failed to connect to database:", err)
		panic("Failed to connect to database")
	}
}

// @ DataBase auto-migrate tables from structures...
// @ Таблицы: users, Section, MBTI, StroopResult
func SyncDB() {
	DB.AutoMigrate(&models.User{})
	DB.AutoMigrate(&models.Section{})
	DB.AutoMigrate(&models.MBTI{})
	DB.AutoMigrate(&models.StroopResult{})
	DB.AutoMigrate(&models.SMIL{})
	DB.AutoMigrate(&models.BeckTestResult{})

	migrator := DB.Migrator()

	// Создаем таблицу password_reset_requests, если ее нет
	if !migrator.HasTable(&models.PasswordResetRequest{}) {
		if err := migrator.CreateTable(&models.PasswordResetRequest{}); err != nil {
			panic("Failed to create password_reset_requests table")
		}
	}

	// Создаем таблицу forgot_password_requests, если ее нет
	if !migrator.HasTable(&models.ForgotPasswordRequest{}) {
		if err := migrator.CreateTable(&models.ForgotPasswordRequest{}); err != nil {
			panic("Failed to create forgot_password_requests table")
		}
	}

	logger.Info("✅ Tables has been migrated...")
}
