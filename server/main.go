package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/microsoft/go-mssqldb"
)

var db *sql.DB
var server string
var port string
var user string
var password string
var database string

func main() {
	// Release Mode for Engine
	gin.SetMode(gin.ReleaseMode)

	// Trusted Proxies
	r := gin.Default()
	r.SetTrustedProxies([]string{"127.0.0.1", "192.168.1.2", "10.0.0.0/8"})
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Get values from environment variables
	server = os.Getenv("DB_SERVER")
	port = os.Getenv("DB_PORT")
	user = os.Getenv("DB_USER")
	password = os.Getenv("DB_PASSWORD_AZURE")
	database = os.Getenv("DB_DATABASE")

	// Build connection string
	connString := fmt.Sprintf("server=%s;user id=%s;password=%s;port=%s;database=%s;",
		server, user, password, port, database)

	// Create connection pool
	db, err = sql.Open("sqlserver", connString)
	if err != nil {
		log.Fatal("Error creating connection pool: ", err.Error())
	}
	defer db.Close()

	// Check the DB connection
	ctx := context.Background()
	err = db.PingContext(ctx)
	if err != nil {
		log.Fatal("Error pinging database: ", err.Error())
	}
	fmt.Println("Connected to the database successfully!")

	// Create a Gin router
	router := gin.Default()

	// Define the POST route for adding a property
	router.POST("/addProperty", addAgent)

	// Start the server
	router.Run(":8080")
}
