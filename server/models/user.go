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

type Section struct {
	GormModel
	Name string `json:"name" gorm:"unique"`
}

type User struct {
	GormModel
	Auth           `json:"auth"`
	Personal       `json:"personal"`
	Location       `json:"location"`
	Position       string         `json:"position"`
	SectionID      *uint          `json:"section_id"`
	Section        Section        `json:"section" gorm:"foreignKey:SectionID"`
	MBTI           MBTI           `json:"mbti" gorm:"foreignKey:UserID"`
	StroopResult   StroopResult   `json:"stroop" gorm:"foreignKey:UserID;references:ID"`
	SMIL           SMIL           `json:"smil" gorm:"foreignKey:UserID;references:ID"`
	BeckTestResult BeckTestResult `json:"backtes" gorm:"foreignKey:UserID;references:ID`
}

func (u *User) MarshalJSON() ([]byte, error) {
	id := u.GormModel.ID

	data := map[string]interface{}{
		"id":       id,
		"auth":     u.Auth,
		"personal": u.Personal,
		"location": u.Location,
		"position": u.Position,
		"section":  u.Section,
		"mbti":     u.MBTI,
		"stroop":   u.StroopResult,
		"smil":     u.SMIL,
		"becktest": u.BeckTestResult,
	}

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
	StroopResult struct {
		ID        uint `gorm:"primaryKey" json:"id"`
		UserID    uint `gorm:"foreignKey:UserID" json:"user_id"`
		Correct   int  `json:"correct"`
		Incorrect int  `json:"incorrect"`
	}
	SMIL struct {
		ID     uint   `gorm:"primaryKey" json:"id"`
		UserID uint   `gorm:"foreignKey:UserID" json:"user_id"`
		Url    string `json:"url"`
	}
	BeckTestResult struct {
		ID         uint            `gorm:"primaryKey" json:"id"`
		UserID     uint            `gorm:"foreignKey:UserID"`
		Answers    json.RawMessage `json:"answers"`
		TotalScore int             `json:"totalScore"`
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
	Section  struct {
		ID   uint   `json:"id"`
		Name string `json:"name"`
	}
	MBTI struct {
		ID     uint   `json:"id"`
		UserID uint   `json:"user_id"`
		Type   string `json:"type"`
	}
	StroopResult struct {
		ID        uint `gorm:"primaryKey" json:"id"`
		UserID    uint `gorm:"foreignKey:UserID" json:"user_id"`
		Correct   int  `json:"correct"`
		Incorrect int  `json:"incorrect"`
	}
	SMIL struct {
		ID     uint   `gorm:"primaryKey" json:"id"`
		UserID uint   `gorm:"foreignKey:UserID" json:"user_id"`
		Url    string `json:"url"`
	}
	BeckTestResult struct {
		ID         uint            `gorm:"primaryKey" json:"id"`
		UserID     uint            `gorm:"foreignKey:UserID"`
		Answers    json.RawMessage `json:"answers"`
		TotalScore int             `json:"totalScore"`
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
	Section  `json:"section"`
	MBTI     struct {
		ID     uint   `gorm:"primaryKey" json:"id"`
		UserID uint   `json:"user_id" gorm:"foreignKey:UserID"`
		Type   string `json:"type"`
	}
	StroopResult struct {
		ID        uint `gorm:"primaryKey" json:"id"`
		UserID    uint `gorm:"foreignKey:UserID" json:"user_id"`
		Correct   int  `json:"correct"`
		Incorrect int  `json:"incorrect"`
	}
	SMIL struct {
		ID     uint   `gorm:"primaryKey" json:"id"`
		UserID uint   `gorm:"foreignKey:UserID" json:"user_id"`
		Url    string `json:"url"`
	}
	BeckTestResult struct {
		ID         uint            `gorm:"primaryKey" json:"id"`
		UserID     uint            `gorm:"foreignKey:UserID"`
		Answers    json.RawMessage `json:"answers"`
		TotalScore int             `json:"totalScore"`
	}
	PasswordChanged bool `json:"password_changed"`
}

// ? User UPD role request stuct
type UpdateUserRoleRequest struct {
	NewRole string `json:"newRole" binding:"required" enums:"user,support,moderator,admin"`
}

// ? User UPD section request stuct
type UpdateUserSectionRequest struct {
	SectionID   uint   `json:"section_id" binding:"required"`
	SectionName string `json:"section_name" binding:"required"`
}
