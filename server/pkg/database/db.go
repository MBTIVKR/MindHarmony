package database

import (
	"lps/cemetery/models"
	"lps/cemetery/pkg/vars"

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

	// Проверяем, существует ли уже тип content_status
	var contentTypeExists bool
	if err := DB.Raw("SELECT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'content_status')").Row().Scan(&contentTypeExists); err != nil {
		panic("Failed to check if content_status type exists")
	}

	// Создаем тип content_status, если его еще нет
	if !contentTypeExists {
		if err := DB.Exec(`CREATE TYPE content_status AS ENUM ('Pending', 'Approved', 'Rejected')`).Error; err != nil {
			panic("Failed to create content_status type")
		}
	}

	var contentCategoryExists bool
	if err := DB.Raw("SELECT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'content_category')").Row().Scan(&contentCategoryExists); err != nil {
		panic("Failed to check if content_category type exists")
	}

	// Создаем тип content_category, если его еще нет
	if !contentCategoryExists {
		if err := DB.Exec(`CREATE TYPE content_category AS ENUM ('MemoryPage', 'TimeCapsule', 'FamilyTree', 'Other')`).Error; err != nil {
			panic("Failed to create content_category type")
		}
	}
}

// @ DataBase auto-migrate tables from structures...
// @ Таблицы: users, Section, MBTI, password_reset_requests, forgot_password_requests
func SyncDB() {
	DB.AutoMigrate(&models.User{})
	DB.AutoMigrate(&models.Section{})
	DB.AutoMigrate(&models.MBTI{})

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
