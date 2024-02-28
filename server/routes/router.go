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
		//? Users
		api.GET("/users", u.GetAllUsers)
		api.DELETE("/users/:id", middlewares.AuthMiddleware(), middlewares.IsAdmin(), u.DeleteUser)
		api.PUT("/users/update/:id", middlewares.AuthMiddleware(), middlewares.IsAdmin(), u.UpdateUser)
		api.PUT("/users/update-role/:id", middlewares.AuthMiddleware(), middlewares.IsAdmin(), u.UpdateUserRole)
		//? Auth
		api.POST("/forgot-password", u.ForgotPassword)
		api.POST("/reset-password", u.ResetPassword)
		api.POST("/register", a.Register)
		api.POST("/login", a.Login)
		api.GET("/logout", a.Logout)
	}

	//@ Группа маршрутов, требующих авторизации и определенной роли
	authGroup := r.Group("/auth")
	{
		authGroup.Use(middlewares.AuthMiddleware())
		// authGroup.Use(isAdmin())
		authGroup.GET("/dashboard", u.Dashboard)
	}

	// @Swagger Docs
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))

	return r
}
