package handlers

import (
	"lps/cemetery/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
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

	// Check if the user exists
	var user models.User
	if err := u.DB.First(&user, requestBody.UserID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	var result models.StroopResult
	// Try to find existing result for the user
	resultFound := u.DB.Where("user_id = ?", requestBody.UserID).First(&result).Error == nil

	result.UserID = requestBody.UserID
	result.Correct = requestBody.Correct
	result.Incorrect = requestBody.Incorrect

	if resultFound {
		// Update existing result
		if err := u.DB.Save(&result).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update test result", "details": err.Error()})
			return
		}
	} else {
		// Create new result if none exist
		if err := u.DB.Create(&result).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save test result", "details": err.Error()})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "Результат теста успешно сохранен", "result_id": result.ID})
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
