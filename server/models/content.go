package models

import (
	"database/sql/driver"
	"fmt"
	"time"

	"gorm.io/gorm"
)

// @ Статусы обработки пользовательского контента
type ContentStatus string

type UpdateContentStatusRequest struct {
	Status ContentStatus `json:"status" binding:"required"`
}

/*
 * На рассмотрении
 * Принята
 * Отклонена
 */
const (
	StatusPending  ContentStatus = "Pending"
	StatusApproved ContentStatus = "Approved"
	StatusRejected ContentStatus = "Rejected"
)

type ContentCategory string

const (
	MemoryPage ContentCategory = "MemoryPage"
	FamilyTree ContentCategory = "FamilyTree"
	Other      ContentCategory = "Other"
	// @ Капсула времени
	// TimeCapsule  ContentCategory = "TimeCapsule"
	// @ Капсула времени
	TimeCapsuleCategory ContentCategory = "TimeCapsule"

	Letter       ContentCategory = "Letter"
	VideoMessage ContentCategory = "VideoMessage"
)

// @ User's content for moderation
type Content struct {
	gorm.Model
	UserID      uint            `json:"userId"`
	Category    ContentCategory `gorm:"type:content_category;not null" json:"category" binding:"required"`
	Title       string          `json:"title" binding:"required" sql:"type:TEXT CHARACTER SET utf8 COLLATE utf8_general_ci"`
	Description string          `json:"description"`
	Date        *time.Time      `json:"date"`
	Status      ContentStatus   `gorm:"type:content_status;default:'Pending'" json:"status"`
}

// @Request structure for creating content
type ContentRequest struct {
	Category    string `json:"category" binding:"required"`
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
}

// Методы Scan и Value для GORM
func (s *ContentStatus) Scan(value interface{}) error {
	switch v := value.(type) {
	case []byte:
		*s = ContentStatus(v)
	case string:
		*s = ContentStatus(v)
	default:
		return fmt.Errorf("unexpected type for ContentStatus: %T", value)
	}
	return nil
}

func (s ContentStatus) Value() (driver.Value, error) {
	return string(s), nil
}

// @Time capsule request
type TimeCapsule struct {
	gorm.Model
	UserID        uint            `json:"userId"`
	Content       string          `gorm:"type:text" json:"content"`
	OpenAt        *time.Time      `json:"openAt"`
	Category      ContentCategory `gorm:"type:content_category;default:'TimeCapsule'" json:"category"`
	Signature     string          `json:"signature"`
	AttachedFiles []string        `gorm:"type:json" json:"attachedFiles"`
}

type CreateTimeCapsuleRequest struct {
	Content   string    `json:"content" binding:"required"`
	OpenAt    time.Time `json:"openAt" binding:"required"`
	Category  string    `json:"category" binding:"required"`
	Signature string    `json:"signature" binding:"required"`
}
