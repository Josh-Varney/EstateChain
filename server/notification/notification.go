package notification

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Notification struct to bind the incoming request
type Notification struct {
	NID           int    `json:"nid"`
    UUID          string `json:"uuid" binding:"required"`
    Message       string `json:"message" binding:"required"`
    Type          string `json:"type" binding:"required"`
    RelatedTable  string `json:"related_table"`
    RelatedID     int    `json:"relatedID"`
    WasRead       bool   `json:"wasRead"`
}

func SendNotification(db *sql.DB, c *gin.Context) {
    var notification Notification

    // Parse the JSON body into the struct
    if err := c.ShouldBindJSON(&notification); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Prepare the SQL query with named parameters using @ syntax
    query := `
        INSERT INTO notifications (uuid, message, type, related_table, relatedID, wasRead)
        VALUES (@uuid, @message, @type, @related_table, @relatedID, @wasRead)
    `
    
    // Execute the query with sql.Named for named parameters
    _, err := db.Exec(query,
        sql.Named("uuid", notification.UUID),
        sql.Named("message", notification.Message),
        sql.Named("type", notification.Type),
        sql.Named("related_table", notification.RelatedTable),
        sql.Named("relatedID", notification.RelatedID),
        sql.Named("wasRead", notification.WasRead),
    )
    
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error executing query: %s", err.Error())})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Notification sent successfully"})
}



// Get notifications by UUID
func GetNotificationsByUUID(db *sql.DB, c *gin.Context) {
    uuid := c.Param("uuid") // Get the uuid from the URL parameter

    // SQL query to fetch notifications by uuid
    query := `
        SELECT nid, uuid, message, type, related_table, relatedID, wasRead
        FROM notifications
        WHERE uuid = @uuid;
    `

    // Prepare the SQL statement
    stmt, err := db.Prepare(query)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error preparing query: %s", err.Error())})
        return
    }
    defer stmt.Close()

    // Execute the query
    rows, err := stmt.Query(sql.Named("uuid", uuid))
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error executing query: %s", err.Error())})
        return
    }
    defer rows.Close()

    // Slice to hold the notifications
    var notifications []Notification

    // Iterate through rows and scan them into the Notification struct
    for rows.Next() {
        var notification Notification
        if err := rows.Scan(&notification.NID, &notification.UUID, &notification.Message,
            &notification.Type, &notification.RelatedTable, &notification.RelatedID, &notification.WasRead); err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error scanning row: %s", err.Error())})
            return
        }
        notifications = append(notifications, notification)
    }

    // Check if we encountered any errors during row iteration
    if err := rows.Err(); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error during row iteration: %s", err.Error())})
        return
    }

    // If no notifications are found
    if len(notifications) == 0 {
        c.JSON(http.StatusNotFound, gin.H{"message": "No notifications found for the given UUID"})
        return
    }

    // Respond with the list of notifications
    c.JSON(http.StatusOK, gin.H{"notifications": notifications})
}