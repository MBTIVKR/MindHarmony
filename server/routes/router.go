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
		//TODO fix AuthMiddleware:
		/* //! Routes to fix middleware
		* api.GET("/users/:id", u.GetUser)
		* api.PUT("/users/update/:id", u.UpdateUser)
		* api.GET("/users", u.GetAllUsers)
		 */
		api.GET("/users", u.GetAllUsers)
		api.GET("/users/:id", u.GetUser)
		api.DELETE("/users/:id", u.DeleteUser)
		api.PUT("/users/update/:id", u.UpdateUser)
		api.PUT("/users/update-role/:id", u.UpdateUserRole)
		//? Auth
		api.GET("/user/auth", handlers.CheckHandler)
		api.POST("/forgot-password", u.ForgotPassword)
		api.POST("/reset-password", u.ResetPassword)
		api.POST("/signup", a.Register)
		api.POST("/login", a.Login)
		api.GET("/logout", a.Logout)
		//? Tests
		// Роут для получения данных MBTI по пользователю
		api.GET("/api/mbti/:id", u.GetMBTIData)
		api.POST("/update-mbti-result/:id", u.UpdateMBTIResult)
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
