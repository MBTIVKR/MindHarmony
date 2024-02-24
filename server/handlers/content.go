package handlers

import (
	"errors"
	"fmt"
	"log"
	"lps/cemetery/models"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// @ Content handlers

// Создание контента и присвоение статуса "На рассмотрении"
func (u *UserHandler) CreateContent(user *models.User, category models.ContentCategory, title, description string, date *time.Time) error {
	content := models.Content{
		UserID:      user.ID,
		Category:    category,
		Title:       title,
		Description: description,
		Date:        date,
		Status:      models.StatusPending,
	}
	return u.DB.Create(&content).Error
}

// Функция для создания контента
func (u *UserHandler) createContent(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	userClaims, ok := user.(*models.Claims)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user data"})
		return
	}

	var content models.Content
	if err := c.ShouldBindJSON(&content); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data", "details": err.Error()})
		return
	}

	// Устанавливаем ID пользователя в соответствии с тем, кто создает контент
	content.UserID = userClaims.ID
	// Устанавливаем статус по умолчанию
	content.Status = models.StatusPending

	// Проверка уникальности заголовка для конкретного пользователя
	var existingContent models.Content
	if err := u.DB.Where("title = ? AND user_id = ?", content.Title, userClaims.ID).Find(&existingContent).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Нельзя создавать страницы с одинаковым заголовком"})
		return
	}

	// Создание контента
	if err := u.DB.Create(&content).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create content", "details": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Content created successfully"})
}

// @Summary Создание контента
// @Description Создает контент с указанными параметрами и устанавливает статус "На рассмотрении".
// @Tags content
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param Authorization header string true "Bearer token"
// @Param request body models.ContentRequest true "Данные для создания контента"
// @Success 201 {object} swagger.SuccessResponse "Контент создан успешно"
// @Failure 400 {object} swagger.ErrorResponse "Ошибка валидации запроса"
// @Failure 401 {object} swagger.ErrorResponse "Ошибка авторизации"
// @Failure 403 {object} swagger.ErrorResponse "Доступ запрещен"
// @Failure 409 {object} swagger.ErrorResponse "Контент с таким заголовком уже существует"
// @Failure 500 {object} swagger.ErrorResponse "Внутренняя ошибка сервера"
// @Router /auth/content/create [post]
func (u *UserHandler) CreateContentHandler(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	userClaims, ok := user.(*models.Claims)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user data"})
		return
	}

	var content models.Content
	if err := c.ShouldBindJSON(&content); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data", "details": err.Error()})
		return
	}

	// Проверка уникальности заголовка для конкретного пользователя
	var existingContent models.Content
	result := u.DB.Where("title = ? AND user_id = ?", content.Title, userClaims.ID).First(&existingContent)
	if result.Error == nil {
		// Если контент существует, возвращаем сообщение об ошибке с деталями
		c.JSON(http.StatusConflict, gin.H{"error": "Контент с таким заголовком уже существует", "duplicated_title": content.Title})
		return
	} else if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
		// Если возникла другая ошибка при выполнении запроса, возвращаем сообщение об ошибке
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Ошибка при проверке уникальности заголовка", "details": result.Error.Error()})
		return
	}

	if content.Date == nil {
		currentTime := time.Now().UTC()
		content.Date = &currentTime
	}

	// Получаем пользователя из базы данных
	var userInstance models.User
	if err := u.DB.First(&userInstance, userClaims.ID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user", "details": err.Error()})
		return
	}

	// Создание контента с использованием метода CreateContent структуры User
	if err := u.CreateContent(&userInstance, content.Category, content.Title, content.Description, content.Date); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create content", "details": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Content created successfully"})
}

// @Summary Получение контента на рассмотрении
// @Description Получение контента на рассмотрении
// @Tags content
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param Authorization header string true "Bearer token"
// @Success 200 {object} swagger.SuccessResponse "Контент на проверке успешно получен"
// @Failure 400 {object} swagger.ErrorResponse "Ошибка валидации запроса"
// @Failure 401 {object} swagger.ErrorResponse "Ошибка авторизации"
// @Failure 403 {object} swagger.ErrorResponse "Доступ запрещен"
// @Failure 404 {object} swagger.ErrorResponse "Контент не найден"
// @Failure 500 {object} swagger.ErrorResponse "Внутренняя ошибка сервера"
// @Router /auth/content/pending [GET]
func (u *UserHandler) GetPendingContent(c *gin.Context) {
	var content []models.Content
	if err := u.DB.Where("status = ?", models.StatusPending).Find(&content).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get pending content", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, content)
}

// @Summary Получение утвержденного контента
// @Description Получение  утвержденного контента
// @Tags content
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param Authorization header string true "Bearer token"
// @Success 200 {object} swagger.SuccessResponse "Контент со статцсом Approved успешно получен"
// @Failure 400 {object} swagger.ErrorResponse "Ошибка валидации запроса"
// @Failure 401 {object} swagger.ErrorResponse "Ошибка авторизации"
// @Failure 403 {object} swagger.ErrorResponse "Доступ запрещен"
// @Failure 404 {object} swagger.ErrorResponse "Контент не найден"
// @Failure 500 {object} swagger.ErrorResponse "Внутренняя ошибка сервера"
// @Router /auth/content/approved [GET]
func (u *UserHandler) GetApprovedContent(c *gin.Context) {
	var content []models.Content
	if err := u.DB.Where("status = ?", models.StatusApproved).Find(&content).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get approved content", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, content)
}

// @Summary Получение утвержденного контента
// @Description Получение  утвержденного контента
// @Tags content
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param Authorization header string true "Bearer token"
// @Success 200 {object} swagger.SuccessResponse "Контент со статцсом Rejected успешно получен"
// @Failure 400 {object} swagger.ErrorResponse "Ошибка валидации запроса"
// @Failure 401 {object} swagger.ErrorResponse "Ошибка авторизации"
// @Failure 403 {object} swagger.ErrorResponse "Доступ запрещен"
// @Failure 404 {object} swagger.ErrorResponse "Контент не найден"
// @Failure 500 {object} swagger.ErrorResponse "Внутренняя ошибка сервера"
// @Router /auth/content/rejected [GET]
func (u *UserHandler) GetRejectedContent(c *gin.Context) {
	var content []models.Content
	if err := u.DB.Where("status = ?", models.StatusRejected).Find(&content).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get Rejected content", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, content)
}

// @Summary Обновление статуса контента
// @Description Обновляет статус контента по указанному идентификатору.
// @Tags content
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param Authorization header string true "Bearer token"
// @Param id path int true "ID контента"
// @Param request body models.UpdateContentStatusRequest true "Данные для обновления статуса контента"
// @Success 200 {object} swagger.SuccessResponse "Статус контента обновлен успешно"
// @Failure 400 {object} swagger.ErrorResponse "Ошибка валидации запроса"
// @Failure 401 {object} swagger.ErrorResponse "Ошибка авторизации"
// @Failure 403 {object} swagger.ErrorResponse "Доступ запрещен"
// @Failure 404 {object} swagger.ErrorResponse "Контент не найден"
// @Failure 500 {object} swagger.ErrorResponse "Внутренняя ошибка сервера"
// @Router /auth/content/update/{id} [put]
// @Param status body string true "Статус контента" Enums(Pending, Approved, Rejected)
func (u *UserHandler) UpdateContentStatus(c *gin.Context) {
	// Получаем параметр id из URL
	contentIDStr := c.Param("id")
	contentID, err := strconv.ParseUint(contentIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid content ID"})
		return
	}

	// Получаем статус из тела запроса
	var updateRequest models.UpdateContentStatusRequest
	if err := c.ShouldBindJSON(&updateRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid data", "details": err.Error()})
		return
	}

	// Вызываем функцию обновления статуса контента
	if err := u.UpdateContentStatusDB(uint(contentID), updateRequest.Status); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update content status", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Content status updated successfully"})
}

// Обновление статуса контента в базе данных
func (u *UserHandler) UpdateContentStatusDB(contentID uint, status models.ContentStatus) error {
	// Проверка допустимости значения status
	switch status {
	case models.StatusPending, models.StatusApproved, models.StatusRejected:
		// Допустимые значения
	default:
		return fmt.Errorf("invalid status: %s", status)
	}

	// Обновление статуса в базе данных
	return u.DB.Model(&models.Content{}).Where("id = ?", contentID).Update("status", status).Error
}

// @Summary Удаление контента
// @Description Удаляет контент по указанному идентификатору.
// @Tags content
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param Authorization header string true "Bearer token"
// @Param id path int true "ID контента"
// @Success 204 {object} swagger.SuccessResponse "Контент успешно удален"
// @Failure 400 {object} swagger.ErrorResponse "Ошибка валидации запроса"
// @Failure 401 {object} swagger.ErrorResponse "Ошибка авторизации"
// @Failure 403 {object} swagger.ErrorResponse "Доступ запрещен"
// @Failure 404 {object} swagger.ErrorResponse "Контент не найден"
// @Failure 500 {object} swagger.ErrorResponse "Внутренняя ошибка сервера"
// @Router /auth/content/delete/{id} [delete]
func (u *UserHandler) DeleteContent(c *gin.Context) {
	// Получаем параметр id из URL
	contentIDStr := c.Param("id")
	contentID, err := strconv.ParseUint(contentIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid content ID"})
		return
	}

	// Получаем пользователя из контекста
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	// Проверяем роль пользователя
	userClaims, ok := user.(*models.Claims)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user data"})
		return
	}

	// Проверяем, является ли пользователь модератором или администратором
	if userClaims.Role != string(models.Admin) && userClaims.Role != string(models.Moderator) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
		return
	}

	// Проверяем существование контента
	var existingContent models.Content
	if err := u.DB.First(&existingContent, contentID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Content not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get content", "details": err.Error()})
		}
		return
	}

	// Удаляем контент из базы данных
	if err := u.DB.Delete(&existingContent).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete content", "details": err.Error()})
		return
	}

	resp := fmt.Sprintf("Content %v deleted successfully", &existingContent)
	log.Println(resp)
	c.JSON(http.StatusNoContent, gin.H{"message": resp})
}
