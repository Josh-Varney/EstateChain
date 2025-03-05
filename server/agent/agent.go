package agent

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddAgent(db *sql.DB, c *gin.Context) {
    var request struct {
        AgentName           string `json:"agentName"`
        AgentIcon           string `json:"agentIcon"`
        AgentContactNumber  string `json:"agentContactNumber"`
        AgentEmail          string `json:"agentEmail"`
        AgentAddress        string `json:"agentAddress"`
        AgentWhyDescription string `json:"agentWhyDescription"`
        AgentSoldDescription string `json:"agentSoldDescription"`
    }

    // Bind the JSON request body to the request struct
    if err := c.BindJSON(&request); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    // Validate field lengths (to avoid any SQL issues)
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

    fmt.Println("DB STATE IN AGENT", db)

    // Define the query with named parameters for inserting agent data
    query := `
        INSERT INTO PropertyAgent (agentName, agentIcon, agentContactNumber, agentEmail, agentAddress, agentWhyDescription, agentSoldRecentlyDescription)
        VALUES (@AgentName, @AgentIcon, @AgentContactNumber, @AgentEmail, @AgentAddress, @AgentWhyDescription, @AgentSoldDescription);
        SELECT SCOPE_IDENTITY();` // Added SELECT SCOPE_IDENTITY()

    // Execute the query and get the last inserted agentID using SCOPE_IDENTITY
    var agentID int
    err := db.QueryRow(query,
        sql.Named("AgentName", request.AgentName),
        sql.Named("AgentIcon", request.AgentIcon),
        sql.Named("AgentContactNumber", request.AgentContactNumber),
        sql.Named("AgentEmail", request.AgentEmail),
        sql.Named("AgentAddress", request.AgentAddress),
        sql.Named("AgentWhyDescription", request.AgentWhyDescription),
        sql.Named("AgentSoldDescription", request.AgentSoldDescription),
    ).Scan(&agentID)

    // Handle any errors that occurred during the insertion or retrieval of the ID
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error inserting data: %s", err.Error())})
        return
    }

    // Return the success message and the inserted agentID
    c.JSON(http.StatusOK, gin.H{"message": "Agent added successfully", "agentID": agentID})
}


// Function to get an agent by ID
func GetAgent(db *sql.DB, c *gin.Context) {
    agentID := c.Param("agentID")

    // Ensure the agentID is not empty
    if agentID == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Agent ID is required"})
        return
    }

    // Convert the agentID to an integer
    id, err := strconv.Atoi(agentID)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Agent ID. It must be a number"})
        return
    }

    // Define the agent struct for storing data from the query
    var agent struct {
        AgentID            int    `json:"agentID"`
        AgentName          string `json:"agentName"`
        AgentIcon          string `json:"agentIcon"`
        AgentContactNumber string `json:"agentContactNumber"`
        AgentEmail         string `json:"agentEmail"`
    }

    // Use a parameterized query to prevent SQL injection
    query := `
        SELECT agentID, agentName, agentIcon, agentContactNumber, agentEmail,
        FROM PropertyAgent
        WHERE agentID = @AgentID
    `

    // Execute the query, passing the agentID as a parameter for SQL Server
    row := db.QueryRow(query, sql.Named("AgentID", id))

    // Scan the result into the agent struct
    err = row.Scan(&agent.AgentID, &agent.AgentName, &agent.AgentIcon, &agent.AgentContactNumber, &agent.AgentEmail)
    if err != nil {
        // Handle case where no agent is found or other errors
        if err == sql.ErrNoRows {
            c.JSON(http.StatusNotFound, gin.H{"error": "Agent not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error fetching agent: %s", err.Error())})
        }
        return
    }

    // Return the agent data in JSON format
    c.JSON(http.StatusOK, gin.H{"agent": agent})
}

func FindAgent(db *sql.DB, c *gin.Context) {
    agentName := c.Param("agentName")       // Retrieve agentName
    agentEmail := c.Param("agentEmail")     // Retrieve agentEmail
    agentContactNumber := c.Param("agentContactNumber") // Retrieve agentContactNumber

    // Ensure the agentName, agentEmail, and agentContactNumber are not empty
    if agentName == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Agent Name is required"})
        return
    }
    if agentEmail == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Agent Email is required"})
        return
    }
    if agentContactNumber == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Agent Contact Number is required"})
        return
    }

    // Define a variable to hold the AgentID
    var agentID int

    // Query to find the AgentID by name, email, and contact number
    query := `
        SELECT agentID
        FROM PropertyAgent
        WHERE agentName = @AgentName
          AND agentEmail = @AgentEmail
          AND agentContactNumber = @AgentContactNumber
    `

    // Execute the query with parameters
    row := db.QueryRow(query,
        sql.Named("AgentName", agentName),
        sql.Named("AgentEmail", agentEmail),
        sql.Named("AgentContactNumber", agentContactNumber),
    )

    // Scan the result into the agentID variable
    err := row.Scan(&agentID)
    if err != nil {
        if err == sql.ErrNoRows {
            c.JSON(http.StatusNotFound, gin.H{"error": "Agent not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error retrieving agent: %s", err.Error())})
        }
        return
    }

    // Return the found AgentID
    c.JSON(http.StatusOK, gin.H{"agentID": agentID})
}



// Function to remove an agent by ID
func RemoveAgent(db *sql.DB, c *gin.Context) {
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
