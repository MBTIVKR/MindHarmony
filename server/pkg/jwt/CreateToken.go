package jwt

import (
	"lps/cemetery/models"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

// Создание JWT токена
func CreateToken(user models.User) (string, error) {
	claims := models.Claims{
		ID:          user.ID,
		Email:       user.Email,
		Username:    user.Username,
		Role:        user.Role,
		Name:        user.Name,
		BirthDate:   user.BirthDate,
		Country:     user.Country,
		City:        user.City,
		PhoneNumber: user.PhoneNumber,
		Content:     user.Content,

		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24 * 30).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}
