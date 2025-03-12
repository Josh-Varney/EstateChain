package tokenize

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func TokenizeRecord(db *sql.DB, c *gin.Context) {

	var request struct {
		PropertyValuation         float64 `json:"propertyValuation"`
		PropertyTokens            int     `json:"propertyTokens"`
		PropertyTokensRemaining   int     `json:"propertyTokensLeft"`
		PropertyTokenValue        float64 `json:"propertyTokenValue"`
		PropertyID                int     `json:"propertyID"`
		PropertyRental            bool    `json:"propertyRental"`              
        RentalDistributionExpectancy float64 `json:"rentalDistributionExpectancy"`
	}

	// Bind incoming JSON request
	if err := c.BindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Prepare SQL query with named parameters
	query := `
		INSERT INTO PropertyTokenised (
			pValuation, pTotalTokens, pTokenRemaining, pTokenValue, pId, propertyRental, rentalDistributionExpectancy
		) VALUES (
			@PropertyValuation, @PropertyTokens, @PropertyTokensRemaining, @PropertyTokenValue, @PropertyID, @PropertyRental, @RentalDistributionExpectancy
		);
	`

	// Execute the query with named parameters
	_, err := db.Exec(query,
		sql.Named("PropertyValuation", request.PropertyValuation),
		sql.Named("PropertyTokens", request.PropertyTokens),
		sql.Named("PropertyTokensRemaining", request.PropertyTokensRemaining),
		sql.Named("PropertyTokenValue", request.PropertyTokenValue),
		sql.Named("PropertyID", request.PropertyID),
		sql.Named("PropertyRental", request.PropertyRental),
        sql.Named("RentalDistributionExpectancy", request.RentalDistributionExpectancy),
	)
	if err != nil {
		// If an error occurred, return an error response
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to insert record"})
		return
	}

	// If successful, return a success message
	c.JSON(http.StatusOK, gin.H{"message": "Record tokenized successfully"})
}

func UpdateTokensLeft(db *sql.DB, c *gin.Context){

	var request struct {
		PropertyID int `json:"pId" binding:"required"`
		TokensLeft int `json:"tokensLeft" binding:"required"`
	}

	// Parse the request body (or query parameter)
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// 2. Construct your SQL update query to update tokensLeft for a specific user and property
	query := `UPDATE PropertyTokenised SET pTokenRemaining = @tokensLeft WHERE pId = @pId`


	_, err := db.Exec(query, 
		sql.Named("tokensLeft", request.TokensLeft),
		sql.Named("pId", request.PropertyID),
	)
	if err != nil {
		// If an error occurs, send a failure response
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to update tokens left: %s", err.Error())})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Tokens left updated successfully",
	})
}
