package jwt

import (
	"MyndHarmony/models"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

// Создание JWT токена
func CreateToken(user models.User) (string, error) {
	claims := models.Claims{
		ID: user.GormModel.ID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24 * 7).Unix(),
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

	//@ Должность
	claims.Position = user.Position
	// @ Должность
	claims.Position = user.Position
	claims.Section.ID = user.Section.ID
	claims.Section.Name = user.Section.Name

	//@ Результаты MBTI
	claims.MBTI.ID = user.MBTI.ID
	claims.MBTI.UserID = user.GormModel.ID
	claims.MBTI.Type = user.MBTI.Type

	//@ Результаты Теста Струпа
	claims.StroopResult.ID = user.StroopResult.ID
	claims.StroopResult.UserID = user.StroopResult.UserID
	claims.StroopResult.Correct = user.StroopResult.Correct
	claims.StroopResult.Incorrect = user.StroopResult.Incorrect

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}
