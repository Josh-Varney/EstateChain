package house

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Function to get all properties
func GetAllProperties(db *sql.DB, c *gin.Context) {
	// Define the struct for each property in the response
	type Property struct {
		PropertyID                int     `json:"propertyID"`
		PropertyName              string  `json:"propertyName"`
		PropertyAddress           string  `json:"propertyAddress"`
		PropertyGeoLat            string  `json:"propertyGeoLat"`
		PropertyGeoLong           string  `json:"propertyGeoLong"`
		PropertyDescription       string  `json:"propertyDescription"`
		PropertyAddedBy           string  `json:"propertyAddedBy"`
		PropertyKeywords          string  `json:"propertyKeywords"`
		PropertyPrice             float64 `json:"propertyPrice"`
		PropertyLocationLatitude  float64 `json:"propertyLocationLatitude"`
		PropertyLocationLongitude float64 `json:"propertyLocationLongitude"`
		PropertySize              string  `json:"propertySize"`
		PropertyBedrooms          int     `json:"propertyBedrooms"`
		PropertyBathrooms         int     `json:"propertyBathrooms"`
		PropertyTokenPrice        float64 `json:"propertyTokenPrice"`
		PropertyTokensLeft        int     `json:"propertyTokensLeft"`
		PropertyType              string  `json:"propertyType"`
		PropertyPostcode          string  `json:"propertyPostcode"`
		PropertyImage             string  `json:"propertyImage"`
		PropertyFeatured          bool    `json:"propertyFeatured"`
		PropertyRental            bool    `json:"propertyRental"`
		PropertySettlement        string  `json:"propertySettlement"`
		PropertyCountry           string  `json:"propertyCountry"`
		PropertyCity              string  `json:"propertyCity"`
		PropertyPostalCode        string  `json:"propertyPostalCode"`
		PropertyStreet            string  `json:"propertyStreet"`
		PropertyStreetNum         string  `json:"propertyStreetNum"`
		PropertyAgentID           int     `json:"propertyAgentID"`
		PropertyTenure            string  `json:"propertyTenure"`
		PropertyGarden            bool    `json:"propertyGarden"`
		PropertyAcessibility      bool    `json:"propertyAcessibility"`
		PropertyKeyFeatures       string  `json:"propertyKeyFeatures"`
		AgentName                 string  `json:"agentName"`
		AgentContactNumber        string  `json:"agentContactNumber"`
		AgentEmail                string  `json:"agentEmail"`
		AgentIcon                 string  `json:"agentIcon"`
		AgentAddress              string  `json:"agentAddress"`
		AgentWhyDescription       string  `json:"agentWhyDescription"`
		AgentSoldRecentlyDescription string `json:"agentSoldRecentlyDescription"`
		PValuation 					int 	`json:"pValuation"`
		PTotalTokens				int 	`json:"pTotalTokens"`
		PSmartAddress				string	`json:"pSmartAddress"`
		RentalDistributionExpectancy 	string `json:"rentalDistributionExpectancy"`
		BType						string `json:"bType"`
		BCurrency					string `json:"bCurrency"`
		PContractName				string 	`json:"contractName"`	
		PTokenRemaining				string `json:"pTokenRemaining"`
	}

	var properties []Property

	// SQL query to fetch all properties and their agent details
	query := `
        SELECT 
            p.propertyID, p.propertyName, p.propertyAddress, p.propertyGeoLat, p.propertyGeoLong,
            p.propertyDescription, p.propertyAddedBy, p.propertyKeywords, p.propertyPrice,
            p.propertyLocationLatitude, p.propertyLocationLongitude, p.propertySize,
            p.propertyBedrooms, p.propertyBathrooms, p.propertyTokenPrice, p.propertyTokensLeft,
            p.propertyType, p.propertyPostcode, p.propertyImage, p.propertyFeatured,
            p.propertyRental, p.propertySettlement, p.propertyCountry, p.propertyCity,
            p.propertyPostalCode, p.propertyStreet, p.propertyStreetNum, p.propertyAgentID,
            p.propertyTenure, p.propertyGarden, p.propertyAccessibility, p.propertyKeyFeatures,
            a.agentName, a.agentContactNumber, a.agentEmail, a.agentIcon, a.agentAddress, a.agentWhyDescription,
			a.agentSoldRecentlyDescription, pt.pValuation, pt.pTotalTokens, pt.pSmartAddress, pt.rentalDistributionExpectancy,
			pt.bType, pt.bCurrency, pt.contractName, pt.pTokenRemaining
        FROM 
            Property p
        LEFT JOIN 
            PropertyAgent a ON p.propertyAgentID = a.agentID
		LEFT JOIN 
			PropertyTokenised pt ON p.propertyID = pt.pId
		WHERE pApproved = 1
			  AND pt.pSmartAddress IS NOT NULL
			  AND pt.contractName IS NOT NULL;
			  
    `
	// Execute the query
	rows, err := db.Query(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error fetching properties: %s", err.Error())})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var property Property

		// Default values before scanning
		property.PropertyName = "N/A"
		property.PropertyAddress = "N/A"
		property.PropertyGeoLat = "0.0"
		property.PropertyGeoLong = "0.0"
		property.PropertyDescription = "N/A"
		property.PropertyAddedBy = "N/A"
		property.PropertyKeywords = "N/A"
		property.PropertyPrice = 0.0
		property.PropertyLocationLatitude = 0.0
		property.PropertyLocationLongitude = 0.0
		property.PropertySize = "N/A"
		property.PropertyBedrooms = 0
		property.PropertyBathrooms = 0
		property.PropertyTokenPrice = 0.0
		property.PropertyTokensLeft = 0
		property.PropertyType = "N/A"
		property.PropertyPostcode = "N/A"
		property.PropertyImage = "N/A"
		property.PropertyFeatured = false
		property.PropertyRental = false
		property.PropertySettlement = "N/A"
		property.PropertyCountry = "N/A"
		property.PropertyCity = "N/A"
		property.PropertyPostalCode = "N/A"
		property.PropertyStreet = "N/A"
		property.PropertyStreetNum = "N/A"
		property.PropertyAgentID = 0
		property.AgentName = "N/A"
		property.AgentContactNumber = "N/A"
		property.AgentEmail = "N/A"
		property.AgentIcon = "N/A"
		property.AgentSoldRecentlyDescription = "N/A"
		property.AgentWhyDescription = "N/A"
		property.AgentAddress = "N/A"
		property.PValuation = 0
		property.PTotalTokens = 0
		property.PSmartAddress = "0x0"
		property.RentalDistributionExpectancy = "N/A"
		property.BType = "N/A"
		property.BCurrency = "N/A"
		property.PContractName = "N/A"
		property.PTokenRemaining = "0"

		// Scan values into the property struct
		if err := rows.Scan(
			&property.PropertyID, 
			&property.PropertyName, 
			&property.PropertyAddress,
			&property.PropertyGeoLat, 
			&property.PropertyGeoLong, 
			&property.PropertyDescription,
			&property.PropertyAddedBy, 
			&property.PropertyKeywords, 
			&property.PropertyPrice,
			&property.PropertyLocationLatitude, 
			&property.PropertyLocationLongitude,
			&property.PropertySize, 
			&property.PropertyBedrooms, 
			&property.PropertyBathrooms,
			&property.PropertyTokenPrice, 
			&property.PropertyTokensLeft, 
			&property.PropertyType,
			&property.PropertyPostcode, 
			&property.PropertyImage, 
			&property.PropertyFeatured,
			&property.PropertyRental, 
			&property.PropertySettlement, 
			&property.PropertyCountry,
			&property.PropertyCity, 
			&property.PropertyPostalCode, 
			&property.PropertyStreet,
			&property.PropertyStreetNum, 
			&property.PropertyAgentID,
			&property.PropertyTenure, 
			&property.PropertyGarden, 
			&property.PropertyAcessibility,
			&property.PropertyKeyFeatures, 
			&property.AgentName, 
			&property.AgentContactNumber, 
			&property.AgentEmail, 
			&property.AgentIcon, 
			&property.AgentAddress, 
			&property.AgentWhyDescription,
			&property.AgentSoldRecentlyDescription,
			&property.PValuation,
			&property.PTotalTokens,			
			&property.PSmartAddress,			
			&property.RentalDistributionExpectancy,
			&property.BType,		
			&property.BCurrency,
			&property.PContractName,
			&property.PTokenRemaining,
		); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error scanning properties: %s", err.Error())})
			return
		}
		

		// Append the property to the properties slice
		properties = append(properties, property)
	}

	// Check if we encountered any errors while iterating through the rows
	if err := rows.Err(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error during row iteration: %s", err.Error())})
		return
	}

	// Return the properties as JSON
	c.JSON(http.StatusOK, gin.H{"properties": properties})
}

// Function to get properties by agent ID
func GetPropertiesByAgent(db *sql.DB, c *gin.Context) {
	agentID := c.Param("id")

	query := `
        SELECT propertyID, propertyName, propertyAddress, propertyPrice, propertyLocationLatitude, 
               propertyLocationLongitude, propertySize, propertyBedrooms, propertyBathrooms, 
               propertyType, propertyPostcode, propertyImage, propertyFeatured
        FROM Property
        WHERE propertyAgentID = @AgentID
    `
	rows, err := db.Query(query, sql.Named("AgentID", agentID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error fetching properties: %s", err.Error())})
		return
	}
	defer rows.Close()

	var properties []map[string]interface{}

	for rows.Next() {
		var property struct {
			PropertyID                int     `json:"propertyID"`
			PropertyName              string  `json:"propertyName"`
			PropertyAddress           string  `json:"propertyAddress"`
			PropertyPrice             float64 `json:"propertyPrice"`
			PropertyLocationLatitude  float64 `json:"propertyLocationLatitude"`
			PropertyLocationLongitude float64 `json:"propertyLocationLongitude"`
			PropertySize              string  `json:"propertySize"`
			PropertyBedrooms          int     `json:"propertyBedrooms"`
			PropertyBathrooms         int     `json:"propertyBathrooms"`
			PropertyType              string  `json:"propertyType"`
			PropertyPostcode          string  `json:"propertyPostcode"`
			PropertyImage             string  `json:"propertyImage"`
			PropertyFeatured          bool    `json:"propertyFeatured"`
		}

		err := rows.Scan(&property.PropertyID, &property.PropertyName, &property.PropertyAddress, &property.PropertyPrice,
			&property.PropertyLocationLatitude, &property.PropertyLocationLongitude, &property.PropertySize,
			&property.PropertyBedrooms, &property.PropertyBathrooms, &property.PropertyType,
			&property.PropertyPostcode, &property.PropertyImage, &property.PropertyFeatured)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error reading property: %s", err.Error())})
			return
		}

		properties = append(properties, map[string]interface{}{
			"propertyID":                property.PropertyID,
			"propertyName":              property.PropertyName,
			"propertyAddress":           property.PropertyAddress,
			"propertyPrice":             property.PropertyPrice,
			"propertyLocationLatitude":  property.PropertyLocationLatitude,
			"propertyLocationLongitude": property.PropertyLocationLongitude,
			"propertySize":              property.PropertySize,
			"propertyBedrooms":          property.PropertyBedrooms,
			"propertyBathrooms":         property.PropertyBathrooms,
			"propertyType":              property.PropertyType,
			"propertyPostcode":          property.PropertyPostcode,
			"propertyImage":             property.PropertyImage,
			"propertyFeatured":          property.PropertyFeatured,
		})
	}

	c.JSON(http.StatusOK, gin.H{"properties": properties})
}
