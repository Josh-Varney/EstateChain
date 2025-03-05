import axios from "axios"

// Define the function to call the FindAgent endpoint
export async function findAgent(agentName, agentEmail, agentContactNumber) {
    try {
        // Make the GET request to the Go server
        const response = await axios.get(`http://localhost:8080/find-agent/${agentName}/${agentEmail}/${agentContactNumber}`);
        
        // Handle the response
        console.log("Agent ID:", response.data.agentID);
        return response.data.agentID;
    } catch (error) {
        // Handle error
        if (error.response) {
            // The request was made and the server responded with a status other than 200
            console.error("Error:", error.response.data.error);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response from server:", error.request);
        } else {
            // Something happened while setting up the request
            console.error("Error during request setup:", error.message);
        }
    }
}

export const submitAgentData = (url, data) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json()) // Parse JSON response
      .then(responseData => {
        console.log('Response from submitAgent:', responseData);
  
        // Check if agentID exists in the response
        if (responseData.agentID) {
          const agentID = responseData.agentID;  // Store the agentID
          return agentID;
        } else {
          console.error('No agentID found in response.');
          return null;  // If no agentID found, return null
        }
      })
      .catch(error => {
        console.error(`Error submitting to ${url}:`, error);
        return null;  // Return null in case of an error
      });
  };

// Submit Property Data (after agentID is retrieved)
export const submitPropertyData = (url, data) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json()) // Parse JSON response
      .then(responseData => {
        console.log('Response from submitProperty:', responseData);
  
        if (responseData.propertyID) {
          console.log('Property submitted successfully with ID:', responseData.propertyID);
        } else {
          console.log('Property submission failed.');
        }
      })
      .catch(error => {
        console.error(`Error submitting property to ${url}:`, error);
      });
  };