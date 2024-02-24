package auth

import (
	"errors"
	"lps/cemetery/models"
	password "lps/cemetery/pkg/Password"
	"lps/cemetery/pkg/jwt"
	"lps/cemetery/pkg/vars"
	"net/http"
	"time"

	"github.com/Avdushin/gogger/logger"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type AuthHandler struct {
	DB *gorm.DB
}

// @Summary Регистрация пользователя
// @Description Регистрирует пользователя с ролью по-умолчанию (user)
// @Tags auth
// @Accept json
// @Produce json
// @Request json
// @Param request body swagger.AuthRequest true "Данные для входа"
// @Success 200 {string} string "Пользователь успешно зарегистрирован"
// @Failure 400 {string} string "Ошибка при регистрации пользователя"
// @Router /register [POST]
func (u *AuthHandler) Register(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Ошибка при регистрации пользователя"})
		return
	}

	// Проверка наличия пользователя с таким же email
	var existingUser models.User
	if err := u.DB.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
		return
	}

	// Хеширование пароля
	hashedPassword, err := password.HashPassword(user.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	user.Password = hashedPassword
	user.Role = string(models.SimpleUser)

	// Присвоение роли по умолчанию, если не указана
	if user.Role == "" {
		user.Role = string(models.SimpleUser)
	}

	// Создание пользователя
	u.DB.Create(&user)

	// Загрузка связанных объектов (например, Content и TimeCapsules)
	u.DB.Preload("Content").Preload("TimeCapsules").Find(&user)

	c.JSON(http.StatusCreated, gin.H{"message": "Пользователь успешно зарегистрирован"})
}

// @Summary Авторизация пользователя
// @Description Авторизация пользователя и выдача JWT токена с использованием Cookie
// @Tags auth
// @Accept json
// @Produce json
// @Request json
// @Param request body swagger.AuthRequest true "Данные для входа"
// @Success 200 {object} swagger.SuccessResponse "Успешная авторизация"
// @Failure 400 {string} string "Ошибка авторизации пользователя"
// @Router /login [POST]
func (u *AuthHandler) Login(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Ошибка авторизации пользователя"})
		return
	}

	// Поиск пользователя по email
	var dbUser models.User
	if err := u.DB.Where("email = ?", user.Email).First(&dbUser).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to query user"})
		return
	}

	// Проверка пароля
	if err := bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(user.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Пробуем выполнить предварительную загрузку объектов и игнорируем ошибку
	_ = u.DB.Model(&dbUser).Preload("Content").Preload("TimeCapsules").Find(&dbUser).Error

	// Создание токена
	token, err := jwt.CreateToken(dbUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Установка токена в Cookie
	c.SetCookie("token", token, int((time.Hour * 24 * 30).Seconds()), "/", "", false, false)

	c.JSON(http.StatusOK, gin.H{
		"message": "Успешная авторизация",
		"token":   token,
	})
}

// @Summary Выход пользователя (Logout)
// @Description Завершение сеанса пользователя и удаление JWT токена из Cookie
// @Tags auth
// @Produce json
// @Success 200 {string} string "Успешный выход"
// @Router /logout [GET]
func (u *AuthHandler) Logout(c *gin.Context) {
	c.SetCookie("token", "", -1, "/", "", false, false)
	c.JSON(http.StatusOK, gin.H{"message": "Logout successful"})
}

func CreateAdmin(db *gorm.DB) {
	//? Проверка наличия пользователя с ролью администратора
	var adminUser models.User
	result := db.Where("role = ?", string(models.Admin)).First(&adminUser)
	if result.Error == nil {
		logger.Info("Admin user already exists.")
		return
	}

	newAdmin := models.User{
		Email:    vars.ADMIN_EMAIL,
		Password: vars.ADMIN_PASS,
		Role:     string(models.Admin),
	}

	if err := db.Create(&newAdmin).Error; err != nil {
		logger.Error("Failed to create admin user:", err)
		return
	}

	logger.Debug("Admin user created successfully...")
}
