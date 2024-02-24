package middlewares

import (
	"fmt"
	"lps/cemetery/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Middleware для проверки, является ли пользователь модератором или администратором
func IsModeratorOrAdmin() gin.HandlerFunc {
	return func(c *gin.Context) {
		user, exists := c.Get("user")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		// Print user details for debugging
		userClaims, ok := user.(*models.Claims)
		if !ok {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user data"})
			c.Abort()
			return
		}
		fmt.Printf("User ID: %d, Username: %s, Role: %s\n", userClaims.ID, userClaims.Username, userClaims.Role)

		// Check if the role is admin or moderator
		if userClaims.Role != string(models.Admin) && userClaims.Role != string(models.Moderator) {
			c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
			c.Abort()
			return
		}

		// Continue with the request
		c.Next()
	}
}
