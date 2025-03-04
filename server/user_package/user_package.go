package user_package

import (
	"database/sql"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type User struct {
    UUID        string    `json:"uuid"`
    Email       string `json:"email"`
    DisplayName string `json:"displayName"`
    PhotoURL    string `json:"photoURL"`
    ProviderID  string `json:"providerID"`
    PhoneNumber string `json:"phone_number"`
    LastLoggedIn time.Time `json:"last_logged_in"`
}

// Function to handle the DELETE request to remove a property by ID
func StoreUser(db *sql.DB, c *gin.Context) {
    var requestData struct {
        UserData User `json:"userData"` // Bind userData field in request to the User struct
    }

    // Bind the incoming JSON to the requestData struct
    if err := c.ShouldBindJSON(&requestData); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Access the User struct from requestData
    user := requestData.UserData

    // Print the user struct to verify its content
    fmt.Printf("Received User: %+v\n", user)

	// Prepare the SQL query to insert user details, including the provided UUID
	query := `
        INSERT INTO Users (uuid, email, displayName, photoURL, providerID, phone_number)
        VALUES (@UUID, @Email, @DisplayName, @PhotoURL, @ProviderID, @PhoneNumber);
    `

	// Execute the query with the provided UUID and other user details
	_, err := db.Exec(query,
		sql.Named("UUID", user.UUID),
		sql.Named("Email", user.Email),
		sql.Named("DisplayName", user.DisplayName),
		sql.Named("PhotoURL", user.PhotoURL),
		sql.Named("ProviderID", user.ProviderID),
		sql.Named("PhoneNumber", user.PhoneNumber),
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the inserted user with the provided UUID
	c.JSON(http.StatusOK, gin.H{
		"message":    "User created successfully",
		"user_uuid":  user.UUID,
		"user_email": user.Email,
	})
}

func CheckUserExists(db *sql.DB, c *gin.Context) {
    // Get the UUID from the URL query parameter
    uuid := c.DefaultQuery("uuid", "")
    if uuid == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "UUID is required"})
        return
    }
    println("Received UUID:", uuid)  // For debugging

    // Prepare the SQL query to check if the UUID exists in the Users table
    query := `
        SELECT COUNT(1)
        FROM Users
        WHERE uuid = @uuid` // Using @paramName for MSSQL (you might need to adapt this if you're using another DB)

    // Execute the query
    var count int
    err := db.QueryRow(query, sql.Named("uuid", uuid)).Scan(&count)

    if err != nil {
        // If there is a database error, return an internal server error
        println("Database error:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    // Check if UUID exists in the database
    if count > 0 {
        c.JSON(http.StatusOK, gin.H{"exists": true})
    } else {
        c.JSON(http.StatusOK, gin.H{"exists": false})
    }
}

func CheckUserType(db *sql.DB, c *gin.Context){
    uuid := c.DefaultQuery("uuid", "")
    if uuid == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "UUID is required"})
        return
    }
    println("Received UUID:", uuid)  // For debugging

    // SQL query to check if the UUID exists in the Admin table
    query := `SELECT CASE 
                WHEN EXISTS (SELECT 1 FROM Admin WHERE uuid = @uuid) THEN 1 
                ELSE 0 
              END AS ExistsFlag`

    var exists int
    err := db.QueryRow(query, sql.Named("uuid", uuid)).Scan(&exists)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
        return
    }

    // Return response based on the result
    c.JSON(http.StatusOK, gin.H{"exists": exists == 1})
}


// Function to fetch a user by UUID
func GetUser(db *sql.DB, c *gin.Context) {
    // Get the UUID from the URL parameters
    uuid := c.Param("uuid")  // Assuming the UUID is passed in the URL like /user/:uuid

    // Prepare the SQL query to select the user by UUID
    query := `
        SELECT uuid, email, displayName, photoURL, providerID, phone_number, last_logged_in
        FROM Users
        WHERE uuid = ?`
    
    // Execute the query
    var user User
    err := db.QueryRow(query, uuid).Scan(&user.UUID, &user.Email, &user.DisplayName, &user.PhotoURL, &user.ProviderID, &user.PhoneNumber, &user.LastLoggedIn)
    
    if err != nil {
        if err == sql.ErrNoRows {
            // User not found
            c.JSON(http.StatusNotFound, gin.H{"message": "User not found"})
        } else {
            // Other database error
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        }
        return
    }

    // Return the fetched user data
    c.JSON(http.StatusOK, gin.H{
        "uuid":          user.UUID,
        "email":         user.Email,
        "displayName":   user.DisplayName,
        "photoURL":      user.PhotoURL,
        "providerID":    user.ProviderID,
        "phone_number":  user.PhoneNumber,
        "last_logged_in": user.LastLoggedIn.Format(time.RFC3339),  // Format time as RFC3339 string
    })
}

// func deleteUser(db *sql.DB, c *gin.Context)
// {

// }

// func fetchAccounts(db *sql.DB, c *gin.Context)
// {

// }

// func deleteAccount(db *sql.DB, c *gin.Context)
// {

// }