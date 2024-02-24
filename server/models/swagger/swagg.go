package swagger

import "lps/cemetery/models"

// SuccessResponse represents a successful response.
type SuccessResponse struct {
	Message string `json:"message"`
	Token   string `json:"token"`
}

// ErrorResponse представляет структуру ответа для ошибок.
type ErrorResponse struct {
	Error string `json:"error"`
}

// Определение структуры для запроса
type AuthRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

/* Content */
type UpdateContentStatusRequest struct {
	Status models.ContentStatus `json:"status" binding:"required"`
}
