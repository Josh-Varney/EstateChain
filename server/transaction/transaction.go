package transaction

import (
	"database/sql"


	"github.com/gin-gonic/gin"
)

type Transaction struct {
    BlockHash      string `json:"block_hash"`
    Hash           string `json:"hash"`
    BlockNumber    int    `json:"block_number"`
    GasPrice       string `json:"gas_price"`
    From           string `json:"sender_address"`
    To             string `json:"receiver_address"`
    PropertyAddress string `json:"property_address"`
    TokenAmount    int    `json:"token_amount"`
    Uuid           string `json:"uuid"` // Add uuid to the struct
}

func PostTransaction(db *sql.DB, c *gin.Context) {
    // Declare the transaction struct to hold incoming JSON data
    var transaction Transaction

    // Bind the incoming JSON to the struct
    if err := c.ShouldBindJSON(&transaction); err != nil {
        // If binding fails, return an error response
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }

    // Prepare the SQL query to insert the data into the transactions table
    query := `
        INSERT INTO Transactions (block_hash, hash, block_number, gas_price, sender_address, receiver_address, property_address, token_amount, uuid)
        VALUES (@blockHash, @hash, @blockNumber, @gasPrice, @from, @to, @propertyAddress, @tokenAmount, @uuid)
    `

    // Execute the query with the values from the transaction struct
    _, err := db.Exec(query, 
        sql.Named("blockHash", transaction.BlockHash),
        sql.Named("hash", transaction.Hash),
        sql.Named("blockNumber", transaction.BlockNumber),
        sql.Named("gasPrice", transaction.GasPrice),
        sql.Named("from", transaction.From),
        sql.Named("to", transaction.To),
        sql.Named("propertyAddress", transaction.PropertyAddress),
        sql.Named("tokenAmount", transaction.TokenAmount),
        sql.Named("uuid", transaction.Uuid), // Include the uuid here
    )

    if err != nil {
        // If there is an error during insertion, return a server error
        c.JSON(500, gin.H{"error": "Failed to insert data into database", "details": err.Error()})
        return
    }

    // If everything is successful, return a success response
    c.JSON(200, gin.H{"message": "Transaction inserted successfully"})
}


