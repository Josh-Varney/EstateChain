package batchget;

import (
    "database/sql"
    "fmt"
    "github.com/gin-gonic/gin"
    "net/http"
)

func GetAllProperties(db *sql.DB, c *gin.Context) {
	// Query to fetch all properties
	query := `
        SELECT 
            * 
        FROM 
            Property p
        LEFT JOIN 
            PropertyAgent a ON p.propertyAgentID = a.agentID
		WHERE pApproved = 1;
    `

	// Execute the query
	rows, err := db.Query(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error fetching properties: %s", err.Error())})
		return
	}
	defer rows.Close()

	// Variable to store the properties
	var properties []map[string]interface{}

	// Iterate through the rows
	for rows.Next() {
		// Get columns dynamically
		columns, err := rows.Columns()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error getting columns: %s", err.Error())})
			return
		}

		// Create a slice of pointers to store each column's value
		columnPointers := make([]interface{}, len(columns))
		for i := range columnPointers {
			var v interface{}
			columnPointers[i] = &v
		}

		// Create a map for this row
		rowData := make(map[string]interface{})
		for i, column := range columns {
			rowData[column] = *(columnPointers[i].(*interface{}))
		}

		// Append the row to the properties slice
		properties = append(properties, rowData)
	}

	// Check if we encountered any errors while iterating through the rows
	if err := rows.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error during row iteration: %s", err.Error())})
		return
	}

	// Return the properties as JSON
	c.JSON(http.StatusOK, gin.H{"properties": properties})
}










// func FetchUnreviewedProperty(db *sql.DB, c *gin.Context) {
//     // Define the struct for each property in the response
//     type Property struct {
//         PropertyID                int             `json:"propertyID"`
//         PropertyName              string          `json:"propertyName"`
//         PropertyAddress           string          `json:"propertyAddress"`
//         PropertyGeoLat            string          `json:"propertyGeoLat"`
//         PropertyGeoLong           string          `json:"propertyGeoLong"`
//         PropertyDescription       string          `json:"propertyDescription"`
//         PropertyAddedBy           string          `json:"propertyAddedBy"`
//         PropertyKeywords          string          `json:"propertyKeywords"`
//         PropertyPrice             sql.NullFloat64 `json:"propertyPrice"`
//         PropertyLocationLatitude  sql.NullFloat64 `json:"propertyLocationLatitude"`
//         PropertyLocationLongitude sql.NullFloat64 `json:"propertyLocationLongitude"`
//         PropertySize              string          `json:"propertySize"`
//         PropertyBedrooms          int             `json:"propertyBedrooms"`
//         PropertyBathrooms         int             `json:"propertyBathrooms"`
//         PropertyTokenPrice        sql.NullFloat64 `json:"propertyTokenPrice"`
//         PropertyTokensLeft        int             `json:"propertyTokensLeft"`
//         PropertyType              string          `json:"propertyType"`
//         PropertyPostcode          string          `json:"propertyPostcode"`
//         PropertyImage             string          `json:"propertyImage"`
//         PropertyFeatured          bool            `json:"propertyFeatured"`
//         PropertyRental            bool            `json:"propertyRental"`
//         PropertySettlement        string          `json:"propertySettlement"`
//         PropertyCountry           string          `json:"propertyCountry"`
//         PropertyCity              string          `json:"propertyCity"`
//         PropertyPostalCode        string          `json:"propertyPostalCode"`
//         PropertyStreet            string          `json:"propertyStreet"`
//         PropertyStreetNum         string          `json:"propertyStreetNum"`
//         PropertyAgentID           int             `json:"propertyAgentID"`
//         PropertyTenure            string          `json:"propertyTenure"`
//         PropertyGarden            bool            `json:"propertyGarden"`
//         PropertyAcessibility      bool            `json:"propertyAcessibility"`
//         PropertyKeyFeatures       string          `json:"propertyKeyFeatures"`
//         AgentName                 string          `json:"agentName"`
//         AgentContactNumber        string          `json:"agentContactNumber"`
//         AgentEmail                string          `json:"agentEmail"`
//         AgentIcon                 string          `json:"agentIcon"`
//         AgentAddress              string          `json:"agentAddress"`
//         AgentWhyDescription       string          `json:"agentWhyDescription"`
//         AgentSoldRecentlyDescription string       `json:"agentSoldRecentlyDescription"`

//         PTokenValue               float64 		  `json:"pTokenValue"`
//         PTotalTokens             int              `json:"pTotalTokens"`
//         RentalDistributionExpectancy float64      `json:"rentalDistributionExpectancy"`
//     }

//     var properties []Property

//     // SQL query to fetch all properties and their agent details
//     query := `
//         SELECT 
//             p.propertyID, p.propertyName, p.propertyAddress, p.propertyGeoLat, p.propertyGeoLong,
//             p.propertyDescription, p.propertyAddedBy, p.propertyKeywords, p.propertyPrice,
//             p.propertyLocationLatitude, p.propertyLocationLongitude, p.propertySize,
//             p.propertyBedrooms, p.propertyBathrooms, p.propertyTokenPrice, p.propertyTokensLeft,
//             p.propertyType, p.propertyPostcode, p.propertyImage, p.propertyFeatured,
//             p.propertyRental, p.propertySettlement, p.propertyCountry, p.propertyCity,
//             p.propertyPostalCode, p.propertyStreet, p.propertyStreetNum, p.propertyAgentID,
//             p.propertyTenure, p.propertyGarden, p.propertyAccessibility, p.propertyKeyFeatures,
//             a.agentName, a.agentContactNumber, a.agentEmail, a.agentIcon, a.agentAddress, a.agentWhyDescription,
//             a.agentSoldRecentlyDescription, pt.pTokenValue, pt.pTotalTokens, pt.rentalDistributionExpectancy
//         FROM 
//             Property p
//         LEFT JOIN 
//             PropertyAgent a ON p.propertyAgentID = a.agentID
//         INNER JOIN
//             PropertyTokenised pt ON p.propertyID = pt.pID
//         WHERE p.pApproved = 0;
//     `
//     // Execute the query
//     rows, err := db.Query(query)
//     if err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error fetching properties: %s", err.Error())})
//         return
//     }
//     defer rows.Close()

//     for rows.Next() {
//         var property Property

//         if err := rows.Scan(
// 			&property.PropertyID, 
// 			&property.PropertyName, 
// 			&property.PropertyAddress,
// 			&property.PropertyGeoLat, 
// 			&property.PropertyGeoLong, 
// 			&property.PropertyDescription,
// 			&property.PropertyAddedBy, 
// 			&property.PropertyKeywords, 
// 			&property.PropertyPrice,
// 			&property.PropertyLocationLatitude, 
// 			&property.PropertyLocationLongitude,
// 			&property.PropertySize, 
// 			&property.PropertyBedrooms, 
// 			&property.PropertyBathrooms,
// 			&property.PropertyTokenPrice, 
// 			&property.PropertyTokensLeft, 
// 			&property.PropertyType,
// 			&property.PropertyPostcode, 
// 			&property.PropertyImage, 
// 			&property.PropertyFeatured,
// 			&property.PropertyRental, 
// 			&property.PropertySettlement, 
// 			&property.PropertyCountry,
// 			&property.PropertyCity, 
// 			&property.PropertyPostalCode, 
// 			&property.PropertyStreet,
// 			&property.PropertyStreetNum, 
// 			&property.PropertyAgentID,
// 			&property.PropertyTenure, 
// 			&property.PropertyGarden, 
// 			&property.PropertyAcessibility,
// 			&property.PropertyKeyFeatures, 
// 			&property.AgentName, 
// 			&property.AgentContactNumber, 
// 			&property.AgentEmail, 
// 			&property.AgentIcon, 
// 			&property.AgentAddress, 
// 			&property.AgentWhyDescription,
// 			&property.AgentSoldRecentlyDescription,
// 			&property.PTokenValue,
// 			&property.PTotalTokens,
// 			&property.RentalDistributionExpectancy,
// 		); err != nil {
// 			fmt.Printf("Error scanning property with ID: %d\n", property.PropertyID)
// 			fmt.Printf("Error: %v\n", err)
// 			fmt.Printf("Property Data: %+v\n", property)
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error scanning properties: %s", err.Error())})
// 			return
// 		}		

//         // Append the property to the properties slice
//         properties = append(properties, property)
//     }

//     // Check if we encountered any errors while iterating through the rows
//     if err := rows.Err(); err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error during row iteration: %s", err.Error())})
//         return
//     }

//     // Return the properties as JSON
//     c.JSON(http.StatusOK, gin.H{"properties": properties})
// }

