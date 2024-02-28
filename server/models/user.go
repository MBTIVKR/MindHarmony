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
	Auth     `json:"auth`
	Personal `json:"personal"`
	Location `json:"location"`
	Position string `json:"position"`
	MBTI

	// omitempty
}

type (
	Auth struct {
		Username string `json:"username"`
		Email    string `gorm:"unique_index;not null" json:"email"`
		Password string `json:"password"`
		Role     string `gorm:"default:'user'" json:"role"`
	}
	Personal struct {
		Name        string `json:"name"`
		Surname     string `json:"surname"`
		Patronymic  string `json:"patronymic"`
		BirthDate   string `json:"birthday"`
		PhoneNumber string `json:"phone"`
	}
	Location struct {
		Country string `json:"country"`
		City    string `json:"city"`
	}
	MBTI struct {
		Type string `json:"type"`
	}
)

// @ JWT user claims
type Claims struct {
	ID   uint `json:"id"`
	Auth struct {
		Username string `json:"username"`
		Email    string `gorm:"unique_index;not null" json:"email"`
		Password string `json:"password"`
		Role     string `gorm:"default:'user'" json:"role"`
	}
	Personal struct {
		Name        string `json:"name"`
		Surname     string `json:"surname"`
		Patronymic  string `json:"patronymic"`
		BirthDate   string `json:"birthday"`
		PhoneNumber string `json:"phone"`
	}
	Location struct {
		Country string `json:"country"`
		City    string `json:"city"`
	}
	Position string `json:"position"`
	MBTI     struct {
		Type string `json:"type"`
	}
	jwt.StandardClaims
}

type UpdateUserRequest struct {
	Username    string `json:"username"`
	Email       string `gorm:"unique_index;not null" json:"email"`
	Password    string `json:"password"`
	Role        string `gorm:"default:'user'" json:"role"`
	Name        string `json:"name"`
	Surname     string `json:"surname"`
	Patronymic  string `json:"patronymic"`
	BirthDate   string `json:"birthday"`
	PhoneNumber string `json:"phone"`
	Country     string `json:"country"`
	City        string `json:"city"`
}

// ? User UPD role request stuct
type UpdateUserRoleRequest struct {
	NewRole string `json:"newRole" binding:"required" enums:"user,support,moderator,admin"`
}
