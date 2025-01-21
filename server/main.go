package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, Go Server!")
}

func main() {
	http.HandleFunc("/", handler) // Handle requests to "/"
	fmt.Println("Server starting on port 8080...")
	http.ListenAndServe(":8080", nil) // Start the server on port 8080
}