package vars

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	_ = godotenv.Load()
	//@ APP
	PORT          = os.Getenv("PORT")
	APP_MODE      = os.Getenv("APP_MODE")
	DAILY_LOGGING = os.Getenv("DAILY_LOGGING")
	SERVER_URL    = os.Getenv("SERVER_URL")
	//@ DB
	DB         = os.Getenv("DB")
	DB_NAME    = os.Getenv("DB_NAME")
	DB_USER    = os.Getenv("DB_USER")
	DB_PASS    = os.Getenv("DB_PASS")
	DB_HOST    = os.Getenv("DB_HOST")
	DB_PORT    = os.Getenv("DB_PORT")
	BACKUP_DIR = os.Getenv("BACKUP_DIR")
	PG_VERSION = os.Getenv("PG_VERSION")
	// SMTP
	POST_NAME       = os.Getenv("POST_NAME")
	POST_PASS       = os.Getenv("POST_PASS")
	BACKUP_INTERVAL = os.Getenv("BACKUP_INTERVAL")

	POST_SERVER = os.Getenv("POST_SERVER")
	POST_PORT   = os.Getenv("POST_PORT")
	//@ Admin
	ADMIN_EMAIL = os.Getenv("ADMIN_EMAIL")
	ADMIN_PASS  = os.Getenv("ADMIN_PASS")
	//@ JWT
	JWT_SECRET = os.Getenv("JWT_SECRET")
	//@ SSL/TLS certs path
	Cert = "/var/www/certs/domain-example.ru.pub"
	Key  = "/var/www/private/domain-example.ru.key"
)

func init() {
	// @ Load .env configuration
	// LoadEnv()
}

func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}
