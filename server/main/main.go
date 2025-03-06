package main

import (
	"database/sql"
	"estatechain/server/agent"
	"estatechain/server/house"
	"estatechain/server/user_package"
	"estatechain/server/tokenize"
	"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
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

	fmt.Println("DB object before Exec:", db)

	// Check DB connection
	err = db.Ping()
	if err != nil {
		log.Fatal("Error pinging database: ", err.Error())
	}
	fmt.Println("Connected to the database successfully!")

	// Create Gin router
	router := gin.Default()

	router.Use(cors.Default())

	// router.GET("/find-agent/:agentName/:agentEmail/:agentContactNumber", func(c *gin.Context) {
	// 	agent.FindAgent(db, c) 
	// })	
	
	// Define route and pass the db instance to the handler
	router.POST("/add-agent", func(c *gin.Context) {
		agent.AddAgent(db, c) 
	})

	// Define route to get agent by ID
	router.GET("/get-agent/:agentID", func(c *gin.Context) {
		agent.GetAgent(db, c) 
	})

	// DELETE route for removing an agent by ID
	router.DELETE("/remove-agent/:agentID", func(c *gin.Context) {
		agent.RemoveAgent(db, c) 
	})

	// Define route and pass db instance 
    router.POST("/add-property", func(c *gin.Context) {
        house.AddProperty(db, c)
    })

	router.GET("/get-properties", func(c *gin.Context) {
		house.GetAllProperties(db, c)
	})

	router.POST("/add-tokenize", func(c *gin.Context) {
		tokenize.TokenizeRecord(db, c)
	})

	router.POST("/add-user", func(c *gin.Context){
		user_package.StoreUser(db, c)
	})

	router.GET("/get-user/:uuid", func(c *gin.Context){
		user_package.GetUser(db, c)
	})

	router.GET("/check-user", func (c *gin.Context) {
		user_package.CheckUserExists(db, c)
	})

	router.GET("/check-admin", func(c *gin.Context) {
		user_package.CheckUserType(db, c)
	})

	// Start server
	router.Run(":8080")
}
