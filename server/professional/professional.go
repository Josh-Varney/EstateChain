package professional;

import (
	"database/sql"

	"log"
	"github.com/gin-gonic/gin"
)

type Professional struct {
	ID              int    `json:"id"`
	FirstName       string `json:"first_name"`
	LastName        string `json:"last_name"`
	Email           string `json:"email"`
	PhoneNumber     string `json:"phone_number"`
	Specialization  string `json:"specialization"`
	Expertise       string `json:"expertise"`
	ExperienceYears int    `json:"experience_years"`
	Certifications  string `json:"certifications"`
	Company         string `json:"company"`
	Location        string `json:"location"`
	LinkedInProfile string `json:"linkedin_profile"`
	CreatedAt       string `json:"created_at"`
}

// Fetch all professionals from the database
func GetProfessionals(db *sql.DB, c *gin.Context) {
	// Query the database to fetch all professionals
	rows, err := db.Query("SELECT id, first_name, last_name, email, phone_number, specialization, expertise, experience_years, certifications, company, location, linkedin_profile, created_at FROM professionals")
	if err != nil {
		log.Println("Error fetching data:", err)
		c.JSON(500, gin.H{"error": "Failed to fetch data from database"})
		return
	}
	defer rows.Close()

	// Slice to hold the fetched professionals
	var professionals []Professional

	// Iterate through the rows and map to Professional struct
	for rows.Next() {
		var p Professional
		err := rows.Scan(&p.ID, &p.FirstName, &p.LastName, &p.Email, &p.PhoneNumber, &p.Specialization, &p.Expertise, &p.ExperienceYears, &p.Certifications, &p.Company, &p.Location, &p.LinkedInProfile, &p.CreatedAt)
		if err != nil {
			log.Println("Error scanning row:", err)
			c.JSON(500, gin.H{"error": "Error processing row"})
			return
		}
		professionals = append(professionals, p)
	}

	// Check for any row iteration errors
	if err := rows.Err(); err != nil {
		log.Println("Error with rows:", err)
		c.JSON(500, gin.H{"error": "Error iterating rows"})
		return
	}

	// Return the list of professionals as JSON
	c.JSON(200, professionals)
}