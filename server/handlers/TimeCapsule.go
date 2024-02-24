package handlers

import (
	"fmt"
	"log"
	"lps/cemetery/models"
	"lps/cemetery/pkg/email"
	"lps/cemetery/pkg/vars"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var db *gorm.DB

// @Summary Создание капсулы времени
// @Description Создает капсулу времени для пользователя
// @Tags time-capsule
// @Security CookieAuth
// @Param request body models.CreateTimeCapsuleRequest true "Данные для создания капсулы времени"
// @Success 200 {string} string "Time capsule created successfully"
// @Failure 400 {string} string "Invalid request data"
// @Failure 401 {string} string "Unauthorized"
// @Failure 500 {string} string "Failed to create time capsule"
// @Router /auth/time-capsule/create [post]
func (u *UserHandler) CreateTimeCapsuleHandler(c *gin.Context) {
	var request models.CreateTimeCapsuleRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data", "details": err.Error()})
		return
	}

	// Получите информацию о текущем пользователе из контекста
	claims, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found in the context"})
		return
	}
	currentUser := claims.(*models.Claims)

	timeCapsule := models.TimeCapsule{
		UserID:    currentUser.ID,
		Content:   request.Content,
		OpenAt:    &request.OpenAt,
		Category:  models.ContentCategory(request.Category),
		Signature: request.Signature,
	}

	if err := u.DB.Create(&timeCapsule).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create time capsule", "details": err.Error()})
		return
	}

	// Отправка капсулы времени по электронной почте
	subject := "Новая капсула времени"
	body := fmt.Sprintf("Привет %s, ваша капсула времени была успешно создана! Ссылка на капсулу: %s",
		currentUser.Username, getCapsuleURL(timeCapsule.ID))
	err := email.SendEmail(currentUser.Email, subject, body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send email", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Time capsule created successfully"})
}

// @Summary Получение страницы капсулы времени
// @Description Возвращает страницу капсулы времени для пользователя
// @Tags time-capsule
// @Security CookieAuth
// @Param id path int true "ID капсулы времени"
// @Success 200 {string} string "Get time capsule page successfully"
// @Failure 401 {string} string "Unauthorized"
// @Failure 500 {string} string "Failed to get time capsule page"
// @Router /time-capsule/{id} [get]
func (u *UserHandler) GetTimeCapsulePage(c *gin.Context) {
	// Получите ID капсулы времени из параметра пути
	id := c.Param("id")

	capsule, err := u.FindTimeCapsuleByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get time capsule page", "details": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"capsule": capsule})

}

// @Summary Получение списка капсул времени пользователя
// @Description Возвращает список капсул времени для пользователя
// @Tags time-capsule
// @Security CookieAuth
// @Success 200 {array} models.TimeCapsule "Get user's time capsules successfully"
// @Failure 401 {string} string "Unauthorized"
// @Failure 500 {string} string "Failed to get user's time capsules"
// @Router /auth/time-capsules [get]
func (u *UserHandler) GetTimeCapsules(c *gin.Context) {
	// Получите информацию о текущем пользователе из контекста
	user, exists := c.Get("user")
	log.Printf("Type of user in context: %T\n", user)

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found in the context"})
		return
	}

	// Проверка типа user
	switch currentUser := user.(type) {
	case *models.Claims:
		// Тип правильный, продолжаем

		// Получите капсулы времени для текущего пользователя
		var timeCapsules []models.TimeCapsule
		if err := u.DB.Where("user_id = ?", currentUser.ID).Find(&timeCapsules).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user's time capsules", "details": err.Error()})
			return
		}

		c.JSON(http.StatusOK, timeCapsules)

	default:
		// Неправильный тип, возвращаем ошибку
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user type in context"})
	}
}

// Функция для генерации URL-ссылки на страницу капсулы времени
func getCapsuleURL(capsuleID uint) string {
	// Верните URL-ссылку на страницу капсулы времени
	// Например: return fmt.Sprintf("http://yourdomain.com/time-capsule/%d", capsuleID)
	return fmt.Sprintf("http://%s/time-capsule/%d", vars.SERVER_URL, capsuleID)
}

// FindTimeCapsuleByID ищет капсулу времени по ее ID в базе данных
func (u *UserHandler) FindTimeCapsuleByID(id string) (*models.TimeCapsule, error) {
	var timeCapsule models.TimeCapsule
	if err := u.DB.Where("id = ?", id).First(&timeCapsule).Error; err != nil {
		return nil, err
	}
	return &timeCapsule, nil
}
