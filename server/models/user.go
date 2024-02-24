package models

import (
	"github.com/golang-jwt/jwt"
	"gorm.io/gorm"
)

/* //@ User's roles
* admin
* moderator
* support
* user
 */

type UserRole string

const (
	Admin      UserRole = "admin"
	Moderator  UserRole = "moderator"
	Support    UserRole = "support"
	SimpleUser UserRole = "user"
)

// @ User table...
type User struct {
	gorm.Model
	Email        string        `gorm:"unique_index;not null" json:"email"`
	Password     string        `json:"password"`
	Role         string        `gorm:"default:'user'" json:"role"`
	Username     string        `json:"username"`
	Name         string        `json:"name"`
	BirthDate    string        `json:"birthday"`
	Country      string        `json:"country"`
	City         string        `json:"city"`
	PhoneNumber  string        `json:"phone"`
	Content      []Content     `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE" json:"content"`
	TimeCapsules []TimeCapsule `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
}

// @ JWT user claims
type Claims struct {
	ID          uint   `json:"id"`
	Email       string `gorm:"unique_index;not null" json:"email"`
	Password    string `json:"password"`
	Role        string `gorm:"default:'user'" json:"role"`
	Username    string `json:"username"`
	Name        string `json:"name"`
	BirthDate   string `json:"birthday"`
	Country     string `json:"country"`
	City        string `json:"city"`
	PhoneNumber string `json:"phone"`
	jwt.StandardClaims
	Content []Content `gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE" json:"content"`
}

type UpdateUserRequest struct {
	Name        string `json:"name"`
	BirthDate   string `json:"birthDate"`
	Country     string `json:"country"`
	City        string `json:"city"`
	PhoneNumber string `json:"phoneNumber"`
}

// ? User UPD role request stuct
type UpdateUserRoleRequest struct {
	NewRole string `json:"newRole" binding:"required" enums:"user,support,moderator,admin"`
}
