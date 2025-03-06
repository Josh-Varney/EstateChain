package admin

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllPropertiesNotApproved(db *sql.DB, c *gin.Context) {
	// Create a map to store properties by propertyID
	properties := make(map[string]map[string]interface{})

	// SQL query to fetch all properties with pApproved = 0
	query := `
		SELECT * 
		FROM Property p
		LEFT JOIN PropertyAgent a ON p.propertyAgentID = a.agentID
		INNER JOIN PropertyTokenised pt ON p.propertyID = pt.pId
		WHERE p.pApproved = 0;
	`

	// Execute the query
	rows, err := db.Query(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error fetching properties: %s", err.Error())})
		return
	}
	defer rows.Close()

	// Get column names to dynamically map the result
	columns, err := rows.Columns()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error getting columns: %s", err.Error())})
		return
	}

	// Iterate over the rows
	for rows.Next() {
		// Create a map to store the property data for the current row
		property := make(map[string]interface{})

		// Create a slice to hold pointers to the column data
		columnPointers := make([]interface{}, len(columns))
		for i := range columnPointers {
			columnPointers[i] = new(interface{})
		}

		// Scan the row into the columnPointers
		if err := rows.Scan(columnPointers...); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error scanning property: %s", err.Error())})
			return
		}

		// Map the scanned data into the property map
		for i, colName := range columns {
			value := *(columnPointers[i].(*interface{}))
			property[colName] = value
		}

		// Get the propertyID (assuming it's a valid field)
		propertyID := fmt.Sprintf("%v", property["propertyID"])

		// Insert the property into the map using propertyID as the key
		properties[propertyID] = property
	}

	// Check if we encountered any errors while iterating through the rows
	if err := rows.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error during row iteration: %s", err.Error())})
		return
	}

	// Return the properties as JSON with the structure { propertyID: { ... } }
	c.JSON(http.StatusOK, properties)
}