package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"estatechain/server/agent" // Import your agent package

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

	// Build connection string for Azure SQL Database
	connString := fmt.Sprintf("sqlserver://%s:%s@%s:%s?database=%s",
		user, password, server, port, database)

	// Create connection pool
	db, err = sql.Open("sqlserver", connString)
	if err != nil {
		log.Fatal("Error creating connection pool: ", err.Error())
	}
	defer db.Close()

	// Check DB connection
	err = db.Ping()
	if err != nil {
		log.Fatal("Error pinging database: ", err.Error())
	}
	fmt.Println("Connected to the database successfully!")

	// Create Gin router
	router := gin.Default()

	// Define routes for agent functions
	router.POST("/addAgent", agent.AddAgent)
	router.GET("/getAgent/:agentID", agent.GetAgent)
	router.DELETE("/removeAgent/:agentID", agent.RemoveAgent)

	// Start server
	router.Run(":8080")
}
