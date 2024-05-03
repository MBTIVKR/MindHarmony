package handlers

import (
	"MyndHarmony/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// @ handlers/section_handlers.go
func (u *UserHandler) CreateSection(c *gin.Context) {
	var section models.Section
	if err := c.ShouldBindJSON(&section); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request", "details": err.Error()})
		return
	}

	fmt.Println("Received JSON body:", section)

	if section.Name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Section name is required"})
		return
	}

	if err := u.DB.Create(&section).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create section"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Section created successfully", "section": section})
}

func (u *UserHandler) GetSections(c *gin.Context) {
	var sections []models.Section
	if err := u.DB.Find(&sections).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get sections"})
		return
	}

	c.JSON(http.StatusOK, sections)
}

// @Summary Обновление отдела пользователя
// @Description Обновляет отдел пользователя по указанному идентификатору
// @Tags users
// @Security CookieAuth
// @Param id path int true "ID пользователя"
// @Param request body models.UpdateUserSectionRequest true "Данные для обновления отдела пользователя"
// @Success 200 {string} string "User section updated successfully"
// @Failure 400 {string} string "Invalid user ID or request data"
// @Failure 401 {string} string "Unauthorized"
// @Failure 403 {string} string "Access denied"
// @Failure 404 {string} string "User or section not found"
// @Failure 500 {string} string "Failed to update user section"
// @Router /api/users/update-section/{id} [put]
func (u *UserHandler) UpdateUserSection(c *gin.Context) {
	userID := c.Param("id")

	// Parse request body into UpdateUserSectionRequest
	var request models.UpdateUserSectionRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data", "details": err.Error()})
		return
	}

	// Check if the user with the given ID exists
	var user models.User
	if err := u.DB.First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Check if the section with the given ID exists
	var section models.Section
	if err := u.DB.First(&section, request.SectionID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Section not found"})
		return
	}

	// Обновляем отдел пользователя
	user.SectionID = &request.SectionID

	// Сохраняем пользователя
	if err := u.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user section"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User section updated successfully", "user": user})
}

func (u *UserHandler) DeleteSection(c *gin.Context) {
	id := c.Param("id")
	var section models.Section
	if err := u.DB.First(&section, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Section not found"})
		return
	}

	if err := u.DB.Delete(&section).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete section"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Section deleted successfully"})
}
