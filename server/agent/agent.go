package agent

import (
    "database/sql"
    "fmt"
    "net/http"
    "strconv"
    "github.com/gin-gonic/gin"
)

// Define a global variable for the DB (you can initialize it elsewhere if needed)
var db *sql.DB

// Function to handle the POST request to add an agent
func AddAgent(c *gin.Context) {
    var request struct {
        AgentName          string `json:"agentName"`
        AgentIcon          string `json:"agentIcon"`
        AgentContactNumber string `json:"agentContactNumber"`
        AgentEmail         string `json:"agentEmail"`
    }

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

    query := `
        INSERT INTO PropertyAgent (agentName, agentIcon, agentContactNumber, agentEmail)
        VALUES (?, ?, ?, ?)
    `
    _, err := db.Exec(query, request.AgentName, request.AgentIcon, request.AgentContactNumber, request.AgentEmail)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error inserting data: %s", err.Error())})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Agent added successfully"})
}

// Function to get an agent by ID
func GetAgent(c *gin.Context) {
    agentID := c.Param("agentID")

    if agentID == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Agent ID is required"})
        return
    }

    id, err := strconv.Atoi(agentID)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Agent ID. It must be a number"})
        return
    }

    var agent struct {
        AgentID            int    `json:"agentID"`
        AgentName          string `json:"agentName"`
        AgentIcon          string `json:"agentIcon"`
        AgentContactNumber string `json:"agentContactNumber"`
        AgentEmail         string `json:"agentEmail"`
    }

    query := `
        SELECT agentID, agentName, agentIcon, agentContactNumber, agentEmail
        FROM PropertyAgent
        WHERE agentID = ?
    `
    row := db.QueryRow(query, id)
    err = row.Scan(&agent.AgentID, &agent.AgentName, &agent.AgentIcon, &agent.AgentContactNumber, &agent.AgentEmail)
    if err != nil {
        if err == sql.ErrNoRows {
            c.JSON(http.StatusNotFound, gin.H{"error": "Agent not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error fetching agent: %s", err.Error())})
        }
        return
    }

    c.JSON(http.StatusOK, gin.H{"agent": agent})
}

// Function to remove an agent by ID
func RemoveAgent(c *gin.Context) {
    agentID := c.Param("agentID")

    if agentID == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Agent ID is required"})
        return
    }

    id, err := strconv.Atoi(agentID)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Agent ID. It must be a number"})
        return
    }

    query := "DELETE FROM PropertyAgent WHERE agentID = ?"
    result, err := db.Exec(query, id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error deleting agent: %s", err.Error())})
        return
    }

    rowsAffected, _ := result.RowsAffected()
    if rowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Agent not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Agent removed successfully"})
}
