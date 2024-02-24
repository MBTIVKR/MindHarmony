package server

import (
	"log"
	"lps/cemetery/handlers"
	"lps/cemetery/handlers/auth"
	"lps/cemetery/pkg/database"
	"lps/cemetery/pkg/vars"
	"lps/cemetery/routes"
)

// @ Start server function
// ? This function is detect APP_MODE parameter to start server with SSL or simple http
func StartServer() {
	//@ Создание администраторы
	auth.CreateAdmin(database.DB)
	//@ APP_MODE have 4 variants: "debug" or "dev" and "release" or "production"
	switch vars.APP_MODE {
	case "debug", "dev":
		HTTPServer()
	case "release", "production":
		SSLServer()
	default:
		HTTPServer()
	}
}

// @ Start HTTP server
func HTTPServer() {
	authHandler := auth.AuthHandler{DB: database.DB}
	userHandler := handlers.UserHandler{DB: database.DB}

	// @ Setup routes
	r := routes.SetupRouter(&authHandler, &userHandler)

	// @ Start the server
	log.Fatal(r.Run(vars.PORT))
}

// @ Start HTTPs server
func SSLServer() {
	authHandler := auth.AuthHandler{DB: database.DB}
	userHandler := handlers.UserHandler{DB: database.DB}

	// @ Setup routes
	r := routes.SetupRouter(&authHandler, &userHandler)

	// @ Start the SSL server
	log.Fatal(r.RunTLS(vars.PORT, vars.Cert, vars.Key))
}
