package user_package

import (
	"database/sql"
	"net/http"
	"time"
	"github.com/gin-gonic/gin"
)

type User struct {
    UUID        int    `json:"uuid"`
    Email       string `json:"email"`
    DisplayName string `json:"displayName"`
    PhotoURL    string `json:"photoURL"`
    ProviderID  string `json:"providerID"`
    PhoneNumber string `json:"phone_number"`
    LastLoggedIn time.Time `json:"last_logged_in"`
}

// Function to handle the DELETE request to remove a property by ID
func StoreUser(db *sql.DB, c *gin.Context) {
	var user User
	// Bind the incoming JSON to the user struct
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

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