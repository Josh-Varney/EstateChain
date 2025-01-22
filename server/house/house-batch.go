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
    var properties []struct {
        PropertyID              int     `json:"propertyID"`
        PropertyName            string  `json:"propertyName"`
        PropertyAddress         string  `json:"propertyAddress"`
        PropertyGeoLat          string  `json:"propertyGeoLat"`
        PropertyGeoLong         string  `json:"propertyGeoLong"`
        PropertyDescription     string  `json:"propertyDescription"`
        PropertyAddedBy         string  `json:"propertyAddedBy"`
        PropertyKeywords        string  `json:"propertyKeywords"`
        PropertyPrice           float64 `json:"propertyPrice"`
        PropertyLocationLatitude float64 `json:"propertyLocationLatitude"`
        PropertyLocationLongitude float64 `json:"propertyLocationLongitude"`
        PropertySize            string  `json:"propertySize"`
        PropertyBedrooms        int     `json:"propertyBedrooms"`
        PropertyBathrooms       int     `json:"propertyBathrooms"`
        PropertyTokenPrice      float64 `json:"propertyTokenPrice"`
        PropertyTokensLeft      int     `json:"propertyTokensLeft"`
        PropertyType            string  `json:"propertyType"`
        PropertyPostcode        string  `json:"propertyPostcode"`
        PropertyImage           string  `json:"propertyImage"`
        PropertyFeatured        bool    `json:"propertyFeatured"`
        PropertyRental          bool    `json:"propertyRental"`
        PropertySettlement      string  `json:"propertySettlement"`
        PropertyCountry         string  `json:"propertyCountry"`
        PropertyCity            string  `json:"propertyCity"`
        PropertyPostalCode      string  `json:"propertyPostalCode"`
        PropertyStreet          string  `json:"propertyStreet"`
        PropertyStreetNum       string  `json:"propertyStreetNum"`
        PropertyAgentID         int     `json:"propertyAgentID"`
    }

    // SQL query to fetch all properties
    query := `
        SELECT propertyID, propertyName, propertyAddress, propertyGeoLat, propertyGeoLong,
               propertyDescription, propertyAddedBy, propertyKeywords, propertyPrice,
               propertyLocationLatitude, propertyLocationLongitude, propertySize,
               propertyBedrooms, propertyBathrooms, propertyTokenPrice, propertyTokensLeft,
               propertyType, propertyPostcode, propertyImage, propertyFeatured,
               propertyRental, propertySettlement, propertyCountry, propertyCity,
               propertyPostalCode, propertyStreet, propertyStreetNum, propertyAgentID
        FROM Property
    `

    // Execute the query
    rows, err := db.Query(query)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error fetching properties: %s", err.Error())})
        return
    }
    defer rows.Close()

    // Loop through the rows and scan the values into the 'properties' slice
    for rows.Next() {
        var property struct {
            PropertyID              int     `json:"propertyID"`
            PropertyName            string  `json:"propertyName"`
            PropertyAddress         string  `json:"propertyAddress"`
            PropertyGeoLat          string  `json:"propertyGeoLat"`
            PropertyGeoLong         string  `json:"propertyGeoLong"`
            PropertyDescription     string  `json:"propertyDescription"`
            PropertyAddedBy         string  `json:"propertyAddedBy"`
            PropertyKeywords        string  `json:"propertyKeywords"`
            PropertyPrice           float64 `json:"propertyPrice"`
            PropertyLocationLatitude float64 `json:"propertyLocationLatitude"`
            PropertyLocationLongitude float64 `json:"propertyLocationLongitude"`
            PropertySize            string  `json:"propertySize"`
            PropertyBedrooms        int     `json:"propertyBedrooms"`
            PropertyBathrooms       int     `json:"propertyBathrooms"`
            PropertyTokenPrice      float64 `json:"propertyTokenPrice"`
            PropertyTokensLeft      int     `json:"propertyTokensLeft"`
            PropertyType            string  `json:"propertyType"`
            PropertyPostcode        string  `json:"propertyPostcode"`
            PropertyImage           string  `json:"propertyImage"`
            PropertyFeatured        bool    `json:"propertyFeatured"`
            PropertyRental          bool    `json:"propertyRental"`
            PropertySettlement      string  `json:"propertySettlement"`
            PropertyCountry         string  `json:"propertyCountry"`
            PropertyCity            string  `json:"propertyCity"`
            PropertyPostalCode      string  `json:"propertyPostalCode"`
            PropertyStreet          string  `json:"propertyStreet"`
            PropertyStreetNum       string  `json:"propertyStreetNum"`
            PropertyAgentID         int     `json:"propertyAgentID"`
        }

        // Scan values into the property struct
        if err := rows.Scan(
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

