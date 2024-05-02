package handlers

import (
	"errors"
	"lps/cemetery/models"
	"lps/cemetery/pkg/jwt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// @ Get MBTI type by userId
func (u *UserHandler) GetMBTIData(c *gin.Context) {
	userIDStr := c.Param("id")
	userID, err := strconv.ParseUint(userIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	var mbtiData models.MBTI
	if err := u.DB.Where("user_id = ?", userID).First(&mbtiData).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "MBTI data not found for the user"})
		return
	}

	c.JSON(http.StatusOK, mbtiData)
}

// ? Обновление результата MBTI пользователя в бд
func (u *UserHandler) UpdateMBTIResult(c *gin.Context) {
	var requestBody struct {
		Type string `json:"type"`
	}
	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	//@ Получить ID пользователя из параметров запроса
	userIDStr := c.Param("id")
	userID, err := strconv.ParseUint(userIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	uintUserID := uint(userID)

	//@ Поиск пользователя в бд
	var user models.User
	if err := u.DB.First(&user, uintUserID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	//? Поиск записи MBTI для пользователя
	var mbti models.MBTI
	if err := u.DB.Where("user_id = ?", uintUserID).First(&mbti).Error; err != nil {
		// Если запись не найдена, создаем новую запись
		mbti = models.MBTI{UserID: uintUserID, Type: requestBody.Type}
		if err := u.DB.Create(&mbti).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create MBTI result"})
			return
		}
	} else {
		//? Если запись найдена, обновляем её
		mbti.Type = requestBody.Type
		if err := u.DB.Save(&mbti).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update MBTI result"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "MBTI result updated successfully", "type": requestBody.Type})
}

// ! Troop Test
// @ Сохранение результатов теста Струпа
func (u *UserHandler) SaveStroopResult(c *gin.Context) {
	var requestBody struct {
		UserID    uint `json:"userId"`
		Correct   int  `json:"correct"`
		Incorrect int  `json:"incorrect"`
	}
	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	var result models.StroopResult
	err := u.DB.Where("user_id = ?", requestBody.UserID).First(&result).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusNotFound, gin.H{"error": "User or result not found"})
		return
	}

	result.UserID = requestBody.UserID
	result.Correct = requestBody.Correct
	result.Incorrect = requestBody.Incorrect

	// Создание нового или обновление существующего результата
	if err := u.DB.Save(&result).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save or update test result", "details": err.Error()})
		return
	}

	// Повторное получение пользователя с обновленными результатами для генерации нового токена
	var user models.User
	u.DB.Preload("StroopResult").First(&user, requestBody.UserID)
	newToken, err := jwt.CreateToken(user) // Обновление JWT токена
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create JWT token", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":   "Результаты теста сохраненны",
		"result_id": result.ID,
		"token":     newToken,
	})
}

// @ Получение результатов теста Струпа для пользователя
func (u *UserHandler) GetStroopResults(c *gin.Context) {
	userIDStr := c.Param("id")
	userID, err := strconv.ParseUint(userIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	var results []models.StroopResult
	if err := u.DB.Where("user_id = ?", uint(userID)).Find(&results).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No results found for the user"})
		return
	}

	c.JSON(http.StatusOK, results)
}
