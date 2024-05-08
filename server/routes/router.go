package routes

import (
	"MyndHarmony/handlers"
	"MyndHarmony/handlers/auth"
	"MyndHarmony/middlewares"
	_ "MyndHarmony/pkg/vars"

	docs "MyndHarmony/docs"

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
		//? Отделы
		api.POST("/sections", u.CreateSection)
		api.GET("/sections", u.GetSections)
		api.PUT("/users/update-section/:id", u.UpdateUserSection)
		api.DELETE("/sections/:id", u.DeleteSection)
		//? Tests
		//! Роут для получения статуса прохождения тестов
		api.GET("/user/:id/test-status", u.GetTestStatus)
		//! Роут для получения данных MBTI по пользователю
		api.GET("/mbti/:id", u.GetMBTIData)
		api.POST("/update-mbti-result/:id", u.UpdateMBTIResult)
		//! Роуты для теста Струпа
		api.POST("/stroop-results:userID", u.SaveStroopResult)
		api.GET("/stroop-results/:id", u.GetStroopResults)
		//! Роуты для теста Бека
		api.POST("/beck-results/:userID", u.SaveBeckTestResult)
		api.GET("/beck-results/:id", u.GetBeckTestResults)
		api.GET("/beck-results/latest/:id", u.GetLatestBeckTestResult)
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
