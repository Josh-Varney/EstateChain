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

func GetAllTransactions(db *sql.DB, c *gin.Context) {
    // Query to select all transactions
    query := `
        SELECT block_hash, hash, block_number, gas_price, sender_address, receiver_address, property_address, token_amount, uuid 
        FROM Transactions
    `

    // Execute the query
    rows, err := db.Query(query)
    if err != nil {
        c.JSON(500, gin.H{"error": "Failed to fetch transactions", "details": err.Error()})
        return
    }
    defer rows.Close()

    // Slice to store transactions
    var transactions []Transaction

    // Iterate over the result set
    for rows.Next() {
        var transaction Transaction
        if err := rows.Scan(
            &transaction.BlockHash, &transaction.Hash, &transaction.BlockNumber, &transaction.GasPrice,
            &transaction.From, &transaction.To, &transaction.PropertyAddress, &transaction.TokenAmount, &transaction.Uuid,
        ); err != nil {
            c.JSON(500, gin.H{"error": "Error scanning row", "details": err.Error()})
            return
        }
        transactions = append(transactions, transaction)
    }

    // Check for any errors encountered during iteration
    if err := rows.Err(); err != nil {
        c.JSON(500, gin.H{"error": "Error iterating over transactions", "details": err.Error()})
        return
    }

    // Return the transactions as JSON
    c.JSON(200, transactions)
}

func GetTransactionsUUID(db *sql.DB, c *gin.Context) {
    // Get UUID from the request parameters
    userUUID := c.Param("uuid")

    // Query to select transactions for the specific UUID
    query := `
        SELECT block_hash, hash, block_number, gas_price, sender_address, receiver_address, property_address, token_amount, uuid 
        FROM Transactions
        WHERE uuid = @uuid
    `

    // Execute the query
    rows, err := db.Query(query, sql.Named("uuid", userUUID))
    if err != nil {
        c.JSON(500, gin.H{"error": "Failed to fetch transactions", "details": err.Error()})
        return
    }
    defer rows.Close()

    // Slice to store transactions
    var transactions []Transaction

    // Iterate over the result set
    for rows.Next() {
        var transaction Transaction
        if err := rows.Scan(
            &transaction.BlockHash, &transaction.Hash, &transaction.BlockNumber, &transaction.GasPrice,
            &transaction.From, &transaction.To, &transaction.PropertyAddress, &transaction.TokenAmount, &transaction.Uuid,
        ); err != nil {
            c.JSON(500, gin.H{"error": "Error scanning row", "details": err.Error()})
            return
        }
        transactions = append(transactions, transaction)
    }

    // Check for any errors encountered during iteration
    if err := rows.Err(); err != nil {
        c.JSON(500, gin.H{"error": "Error iterating over transactions", "details": err.Error()})
        return
    }

    // Return the transactions as JSON
    c.JSON(200, transactions)
}