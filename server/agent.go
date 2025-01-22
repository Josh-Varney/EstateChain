package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	_ "github.com/microsoft/go-mssqldb"
)

// Function to handle the POST request to add a property
func addAgent(c *gin.Context) {
    // Define the request struct
    var request struct {
        AgentName          string `json:"agentName"`
        AgentIcon          string `json:"agentIcon"`
        AgentContactNumber string `json:"agentContactNumber"`
        AgentEmail         string `json:"agentEmail"`
    }

    // Bind the request JSON to the struct
    if err := c.BindJSON(&request); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    // Validate field lengths
    if len(request.AgentName) > 100 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Agent name exceeds maximum length of 100 characters"})
        return
    }
    if len(request.AgentContactNumber) > 20 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Contact number exceeds maximum length of 20 characters"})
        return
    }
    if len(request.AgentEmail) > 255 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Email exceeds maximum length of 255 characters"})
        return
    }

    // Prepare the SQL query to insert the agent into the database
    query := `
        INSERT INTO PropertyAgent (agentName, agentIcon, agentContactNumber, agentEmail)
        VALUES (?, ?, ?, ?)
    `
    _, err := db.Exec(query, request.AgentName, request.AgentIcon, request.AgentContactNumber, request.AgentEmail)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error inserting data: %s", err.Error())})
        return
    }

    // Respond with success
    c.JSON(http.StatusOK, gin.H{"message": "Agent added successfully"})
}

func removeAgent(c *gin.Context) {
    // Extract the agentID from the request parameters
    agentID := c.Param("agentID")

    // Validate the agentID parameter
    if agentID == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Agent ID is required"})
        return
    }

    // Ensure the agentID is a valid integer
    id, err := strconv.Atoi(agentID)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Agent ID. It must be a number"})
        return
    }

    // Prepare the SQL query to delete the agent
    query := "DELETE FROM PropertyAgent WHERE agentID = ?"
    result, err := db.Exec(query, id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error deleting agent: %s", err.Error())})
        return
    }

    // Check if any row was affected
    rowsAffected, _ := result.RowsAffected()
    if rowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Agent not found"})
        return
    }

    // Respond with success
    c.JSON(http.StatusOK, gin.H{"message": "Agent removed successfully"})
}

