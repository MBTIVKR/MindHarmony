package models

import (
	"encoding/json"
	"time"

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

type GormModel struct {
	ID        uint `gorm:"primarykey" json:"id"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

type User struct {
	GormModel
	Auth     `json:"auth"`
	Personal `json:"personal"`
	Location `json:"location"`
	Position string `json:"position"`
	MBTI     `json:"mbti_result" gorm:"foreignKey:UserID"`
}

// type MBTIResult struct {
// 	ID     uint   `gorm:"primaryKey" json:"id"`
// 	UserID uint   `json:"user_id" gorm:"foreignKey:UserID"`
// 	Type   string `json:"type"`
// }

func (u *User) MarshalJSON() ([]byte, error) {
	// Extract ID from gorm.Model
	id := u.GormModel.ID

	// Create a map with desired structure
	data := map[string]interface{}{
		"id":       id,
		"auth":     u.Auth,
		"personal": u.Personal,
		"location": u.Location,
		"position": u.Position,
		"mbti":     u.MBTI,
	}

	// Marshal the map to JSON
	return json.Marshal(data)
}

type (
	Auth struct {
		Username string `json:"username"`
		Email    string `gorm:"unique_index;not null" json:"email"`
		Password string `json:"password,omitempty"`
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
		ID     uint   `gorm:"primaryKey" json:"id"`
		UserID uint   `json:"user_id" gorm:"foreignKey:UserID"`
		Type   string `json:"type"`
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
		ID     uint   `gorm:"primaryKey" json:"id"`
		UserID uint   `json:"user_id" gorm:"foreignKey:UserID"`
		Type   string `json:"type"`
	}
	jwt.StandardClaims
}

type UpdateUserRequest struct {
	Auth struct {
		Username string `json:"username"`
		Email    string `gorm:"unique_index;not null" json:"email"`
		Password string `json:"password,omitempty"`
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
		ID     uint   `gorm:"primaryKey" json:"id"`
		UserID uint   `json:"user_id" gorm:"foreignKey:UserID"`
		Type   string `json:"type"`
	}
	PasswordChanged bool `json:"password_changed"`
}

// ? User UPD role request stuct
type UpdateUserRoleRequest struct {
	NewRole string `json:"newRole" binding:"required" enums:"user,support,moderator,admin"`
}
