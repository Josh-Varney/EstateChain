package compliance

import (
	"database/sql"
	"github.com/gin-gonic/gin"

	"net/http"
)

type Compliance struct {
	CID        int    `json:"cID"`
	FileURL    string `json:"fireURL"`
	RegionCode string `json:"regionCode"`
	GovBody    string `json:"govBody"`
	LawCode    string `json:"lawCode"`
	Category   string `json:"category"`
}


func GetAllCompliance(db *sql.DB, c *gin.Context) {
	// Query to select all compliance data
	query := `
		SELECT cID, fileURL, regionCode, govBody, lawCode, category 
		FROM compliance
	`

	// Execute the query
	rows, err := db.Query(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch compliance data", "details": err.Error()})
		return
	}
	defer rows.Close()

	// Slice to store compliance records
	var complianceRecords []Compliance

	// Iterate over the result set
	for rows.Next() {
		var compliance Compliance
		if err := rows.Scan(
			&compliance.CID, &compliance.FileURL, &compliance.RegionCode, &compliance.GovBody,
			&compliance.LawCode, &compliance.Category,
		); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error scanning row", "details": err.Error()})
			return
		}
		complianceRecords = append(complianceRecords, compliance)
	}

	// Check for any errors encountered during iteration
	if err := rows.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error iterating over compliance data", "details": err.Error()})
		return
	}

	// Return the compliance data as JSON
	c.JSON(http.StatusOK, complianceRecords)
}
