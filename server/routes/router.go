package routes

import (
	"lps/cemetery/handlers"
	"lps/cemetery/handlers/auth"
	"lps/cemetery/middlewares"
	_ "lps/cemetery/pkg/vars"

	docs "lps/cemetery/docs"

	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @ Функция для настройки роутинга
func SetupRouter(a *auth.AuthHandler, u *handlers.UserHandler) *gin.Engine {
	r := gin.Default()
	middlewares.EnableCORS(r)

	docs.SwaggerInfo.BasePath = "/"

	api := r.Group("/api")
	{
		api.GET("/users", u.GetAllUsers)
		api.POST("/forgot-password", u.ForgotPassword)
		api.POST("/reset-password", u.ResetPassword)
	}

	// Маршруты
	r.POST("/register", a.Register)
	r.POST("/login", a.Login)
	r.GET("/logout", a.Logout)

	r.DELETE("/users/:id", middlewares.AuthMiddleware(), middlewares.IsAdmin(), u.DeleteUser)
	r.PUT("/users/update/:id", middlewares.AuthMiddleware(), middlewares.IsAdmin(), u.UpdateUser)

	// Admin routes
	r.PUT("/users/update-role/:id", middlewares.AuthMiddleware(), middlewares.IsAdmin(), u.UpdateUserRole)

	r.GET("/users", u.GetAllUsers)

	//@ Группа маршрутов, требующих авторизации и определенной роли
	authGroup := r.Group("/auth")
	{
		authGroup.Use(middlewares.AuthMiddleware())
		// authGroup.Use(isAdmin())
		authGroup.GET("/dashboard", u.Dashboard)

		// Маршрут для создания контента (требует авторизации)
		authGroup.POST("/content/create", middlewares.AuthMiddleware(), u.CreateContentHandler)
		authGroup.PUT("/content/update/:id", middlewares.AuthMiddleware(), middlewares.IsAdmin(), u.UpdateContentStatus)
		authGroup.DELETE("/content/delete/:id", middlewares.AuthMiddleware(), middlewares.IsModeratorOrAdmin(), u.DeleteContent)
		authGroup.GET("/content/pending", middlewares.AuthMiddleware(), u.GetPendingContent)
		authGroup.GET("/content/approved", middlewares.AuthMiddleware(), u.GetApprovedContent)
		authGroup.GET("/content/rejected", middlewares.AuthMiddleware(), u.GetRejectedContent)

		// Маршрут для создания капсулы времени (требует авторизации)
		authGroup.POST("/time-capsule/create", middlewares.AuthMiddleware(), u.CreateTimeCapsuleHandler)
		// Маршрут для получения списка капсул времени пользователя (требует авторизации)
		authGroup.GET("/time-capsules", middlewares.AuthMiddleware(), u.GetTimeCapsules)
		authGroup.GET("/time-capsule/:id", middlewares.AuthMiddleware(), u.GetTimeCapsulePage)
	}

	// @Swagger Docs
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	return r
}
