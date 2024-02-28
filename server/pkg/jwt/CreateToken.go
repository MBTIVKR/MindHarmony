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
		ID: user.ID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24 * 30).Unix(),
		},
	}

	//@ Auth Data
	claims.Auth.Username = user.Auth.Username
	claims.Auth.Email = user.Auth.Email
	claims.Auth.Password = user.Auth.Password
	claims.Auth.Role = user.Auth.Role

	//@ Personal Data
	claims.Personal.Name = user.Personal.Name
	claims.Personal.Surname = user.Personal.Surname
	claims.Personal.Patronymic = user.Personal.Patronymic
	claims.Personal.BirthDate = user.Personal.BirthDate
	claims.Personal.PhoneNumber = user.Personal.PhoneNumber

	//@ Location Data
	claims.Location.Country = user.Location.Country
	claims.Location.City = user.Location.City

	//@ Включение остальных полей
	claims.Position = user.Position
	claims.MBTI = user.MBTI

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}
