package house

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddProperty(db *sql.DB, c *gin.Context) {
	var request struct {
		PropertyName              string  `json:"propertyName"`
		PropertyAddress           string  `json:"propertyAddress"`
		PropertyGeoLat            string `json:"propertyGeoLat"`
		PropertyGeoLong           string `json:"propertyGeoLong"`
		PropertyLocationLatitude  float64 `json:"propertyLocationLatitude"`
		propertyLocationLongitude float64 `json:"propertyLocationLongitude"`
		PropertyKeyFeatures		  string  `json:"propertyKeyFeatures"`
		PropertyDescription       string  `json:"propertyDescription"`
		PropertyAddedBy           string  `json:"propertyAddedBy"`
		PropertyKeywords          string  `json:"propertyKeywords"`
		PropertyPrice             float64 `json:"propertyPrice"`
		PropertySize              float64 `json:"propertySize"`
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
		PropertyGarden            bool    `json:"propertyGarden"`
		PropertyAccessibility     bool    `json:"propertyAccessibility"`
		PropertyTenure            string  `json:"propertyTenure"`
		PropertyAgentID           int     `json:"propertyAgentID"`
	}

	// Bind incoming JSON request
	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Check if required fields are missing or empty
	missingFields := []string{}

	if request.PropertyName == "" {
		missingFields = append(missingFields, "propertyName")
	}
	if request.PropertyAddress == "" {
		missingFields = append(missingFields, "propertyAddress")
	}
	if request.PropertyGeoLat == "" {
		missingFields = append(missingFields, "propertyGeoLat")
	}
	if request.PropertyGeoLong == "" {
		missingFields = append(missingFields, "propertyGeoLong")
	}
	if request.PropertyDescription == "" {
		missingFields = append(missingFields, "propertyDescription")
	}
	if request.PropertyAddedBy == "" {
		missingFields = append(missingFields, "propertyAddedBy")
	}
	if request.PropertyKeywords == "" {
		missingFields = append(missingFields, "propertyKeywords")
	}
	if request.PropertyPrice == 0 {
		missingFields = append(missingFields, "propertyPrice")
	}
	if request.PropertySize == 0 {
		missingFields = append(missingFields, "propertySize")
	}
	if request.PropertyBedrooms == 0 {
		missingFields = append(missingFields, "propertyBedrooms")
	}
	if request.PropertyBathrooms == 0 {
		missingFields = append(missingFields, "propertyBathrooms")
	}
	if request.PropertyTokenPrice == 0 {
		missingFields = append(missingFields, "propertyTokenPrice")
	}
	if request.PropertyTokensLeft == 0 {
		missingFields = append(missingFields, "propertyTokensLeft")
	}
	if request.PropertyType == "" {
		missingFields = append(missingFields, "propertyType")
	}
	if request.PropertyPostcode == "" {
		missingFields = append(missingFields, "propertyPostcode")
	}
	if request.PropertyImage == "" {
		missingFields = append(missingFields, "propertyImage")
	}
	if request.PropertySettlement == "" {
		missingFields = append(missingFields, "propertySettlement")
	}
	if request.PropertyCountry == "" {
		missingFields = append(missingFields, "propertyCountry")
	}
	if request.PropertyCity == "" {
		missingFields = append(missingFields, "propertyCity")
	}
	if request.PropertyPostalCode == "" {
		missingFields = append(missingFields, "propertyPostalCode")
	}
	if request.PropertyStreet == "" {
		missingFields = append(missingFields, "propertyStreet")
	}
	if request.PropertyStreetNum == "" {
		missingFields = append(missingFields, "propertyStreetNum")
	}
	if request.PropertyTenure == "" {
		missingFields = append(missingFields, "propertyTenure")
	}

	// If there are missing fields, return them
	if len(missingFields) > 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing fields", "fields": missingFields})
		return
	}

	// SQL query to insert the property into the database
	query := `
        INSERT INTO Property (
            propertyName, propertyAddress, propertyGeoLat, propertyGeoLong, propertyLocationLatitude, propertyLocationLongitude, propertyDescription, propertyKeyFeatures,
            propertyAddedBy, propertyKeywords, propertyPrice, propertySize, propertyBedrooms, propertyBathrooms, 
            propertyTokenPrice, propertyTokensLeft, propertyType, propertyPostcode, propertyImage, 
            propertyFeatured, propertyRental, propertySettlement, propertyCountry, propertyCity, 
            propertyPostalCode, propertyStreet, propertyStreetNum, propertyGarden, 
            propertyAccessibility, propertyTenure, propertyAgentID
        ) VALUES (
            @PropertyName, @PropertyAddress, @PropertyGeoLat, @PropertyGeoLong, @PropertyLocationLatitude, @propertyLocationLongitude, @PropertyDescription, @PropertyKeyFeatures,
            @PropertyAddedBy, @PropertyKeywords, @PropertyPrice, @PropertySize, @PropertyBedrooms, @PropertyBathrooms, 
            @PropertyTokenPrice, @PropertyTokensLeft, @PropertyType, @PropertyPostcode, @PropertyImage, 
            @PropertyFeatured, @PropertyRental, @PropertySettlement, @PropertyCountry, @PropertyCity, 
            @PropertyPostalCode, @PropertyStreet, @PropertyStreetNum, @PropertyGarden, 
            @PropertyAccessibility, @PropertyTenure, @PropertyAgentID
        ); 
        SELECT SCOPE_IDENTITY();`

	var propertyID int
	err := db.QueryRow(query,
		sql.Named("PropertyName", request.PropertyName),
		sql.Named("PropertyAddress", request.PropertyAddress),
		sql.Named("PropertyGeoLat", request.PropertyGeoLat),
		sql.Named("PropertyGeoLong", request.PropertyGeoLong),
		sql.Named("PropertyLocationLatitude", request.PropertyLocationLatitude),
		sql.Named("propertyLocationLongitude", request.propertyLocationLongitude),
		sql.Named("PropertyKeyFeatures", request.PropertyKeyFeatures),
		sql.Named("PropertyDescription", request.PropertyDescription),
		sql.Named("PropertyAddedBy", request.PropertyAddedBy),
		sql.Named("PropertyKeywords", request.PropertyKeywords),
		sql.Named("PropertyPrice", request.PropertyPrice),
		sql.Named("PropertySize", request.PropertySize),
		sql.Named("PropertyBedrooms", request.PropertyBedrooms),
		sql.Named("PropertyBathrooms", request.PropertyBathrooms),
		sql.Named("PropertyTokenPrice", request.PropertyTokenPrice),
		sql.Named("PropertyTokensLeft", request.PropertyTokensLeft),
		sql.Named("PropertyType", request.PropertyType),
		sql.Named("PropertyPostcode", request.PropertyPostcode),
		sql.Named("PropertyImage", request.PropertyImage),
		sql.Named("PropertyFeatured", request.PropertyFeatured),
		sql.Named("PropertyRental", request.PropertyRental),
		sql.Named("PropertySettlement", request.PropertySettlement),
		sql.Named("PropertyCountry", request.PropertyCountry),
		sql.Named("PropertyCity", request.PropertyCity),
		sql.Named("PropertyPostalCode", request.PropertyPostalCode),
		sql.Named("PropertyStreet", request.PropertyStreet),
		sql.Named("PropertyStreetNum", request.PropertyStreetNum),
		sql.Named("PropertyGarden", request.PropertyGarden),
		sql.Named("PropertyAccessibility", request.PropertyAccessibility),
		sql.Named("PropertyTenure", request.PropertyTenure),
		sql.Named("PropertyAgentID", request.PropertyAgentID),
	).Scan(&propertyID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error inserting property: %s", err.Error())})
		return
	}

	// Success response
	c.JSON(http.StatusOK, gin.H{"message": "Property added successfully", "propertyID": propertyID})
}


// Function to get a property by ID
func GetProperty(db *sql.DB, c *gin.Context) {
	// Get the propertyID from URL parameter
	propertyID := c.Param("propertyID")

	if propertyID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Property ID is required"})
		return
	}

	// Convert propertyID from string to integer
	id, err := strconv.Atoi(propertyID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Property ID. It must be a number"})
		return
	}

	// Define the struct for the property response
	var property struct {
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
	}

	// SQL query to fetch the property by ID
	query := `
        SELECT propertyID, propertyName, propertyAddress, propertyGeoLat, propertyGeoLong,
               propertyDescription, propertyAddedBy, propertyKeywords, propertyPrice,
               propertyLocationLatitude, propertyLocationLongitude, propertySize,
               propertyBedrooms, propertyBathrooms, propertyTokenPrice, propertyTokensLeft,
               propertyType, propertyPostcode, propertyImage, propertyFeatured,
               propertyRental, propertySettlement, propertyCountry, propertyCity,
               propertyPostalCode, propertyStreet, propertyStreetNum, propertyAgentID
        FROM Property
        WHERE propertyID = ?
    `

	// Execute the query and scan the result into the 'property' struct
	row := db.QueryRow(query, id)
	err = row.Scan(
		&property.PropertyID, &property.PropertyName, &property.PropertyAddress,
		&property.PropertyGeoLat, &property.PropertyGeoLong, &property.PropertyDescription,
		&property.PropertyAddedBy, &property.PropertyKeywords, &property.PropertyPrice,
		&property.PropertyLocationLatitude, &property.PropertyLocationLongitude,
		&property.PropertySize, &property.PropertyBedrooms, &property.PropertyBathrooms,
		&property.PropertyTokenPrice, &property.PropertyTokensLeft, &property.PropertyType,
		&property.PropertyPostcode, &property.PropertyImage, &property.PropertyFeatured,
		&property.PropertyRental, &property.PropertySettlement, &property.PropertyCountry,
		&property.PropertyCity, &property.PropertyPostalCode, &property.PropertyStreet,
		&property.PropertyStreetNum, &property.PropertyAgentID,
	)

	// Check if an error occurred
	if err != nil {
		if err == sql.ErrNoRows {
			// Property not found
			c.JSON(http.StatusNotFound, gin.H{"error": "Property not found"})
		} else {
			// Other error
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error fetching property: %s", err.Error())})
		}
		return
	}

	// Return the property as JSON
	c.JSON(http.StatusOK, gin.H{"property": property})
}

// Function to handle the DELETE request to remove a property by ID
func RemoveProperty(db *sql.DB, c *gin.Context) {
	// Get the propertyID from the URL parameter
	propertyID := c.Param("id")

	// Prepare the SQL query to delete the property by its ID
	query := `DELETE FROM Property WHERE propertyID = @PropertyID`

	// Execute the query
	_, err := db.Exec(query, sql.Named("PropertyID", propertyID))
	if err != nil {
		// If an error occurs, return a 500 internal server error
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error deleting property: %s", err.Error())})
		return
	}

	// If successful, return a success message
	c.JSON(http.StatusOK, gin.H{"message": "Property removed successfully"})
}
