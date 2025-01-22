package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
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
	router.POST("/addProperty", addPropertyHandler)

	// Start the server
	router.Run(":8080")
}

// Function to handle the POST request to add a property
func addPropertyHandler(c *gin.Context) {
	var request struct {
		Name  string `json:"name"`
		Value string `json:"value"`
	}

	// Bind the request JSON to the struct
	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Prepare the SQL query to insert the property into the database
	query := "INSERT INTO properties (name, value) VALUES (@p1, @p2)"
	_, err := db.Exec(query, request.Name, request.Value)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error inserting data: %s", err.Error())})
		return
	}

	// Respond with success
	c.JSON(http.StatusOK, gin.H{"message": "Property added successfully"})
}