import axios from "axios";

export const fetchProperties = async () => {
    try {
        const response = await axios.get("http://localhost:8080/get-all-unapproved");

        // Check for successful status code (200-299)
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            console.log("Error fetching from API", response.statusText);
            throw new Error("Error fetching data from API");
        }

    } catch (error) {
        console.log("Error fetching properties", error);
        return [];
    }
};

// rejectAndSubmitFeedback function to reject a property and submit feedback
export const rejectAndSubmitFeedback = async (propertyID: Number, propertyAddedBy: string, propertyFeedback: string) => {
    try {
        // Call the API endpoint to reject the property
        const response = await axios.put(`http://localhost:8080/property-status/${propertyID}`, {});

        // Check for successful status code (200-299)
        if (response.status >= 200 && response.status < 300) {
            // Send a notification regarding the rejection
            const notificationResponse = await axios.post("http://localhost:8080/send-notification", {
                uuid: propertyAddedBy, // You should generate a unique UUID here
                message: `Property with ID ${propertyID} has been rejected. Feedback: ${propertyFeedback}`,
                type: "rejection",
                related_table: "Property",
                relatedID: propertyID,
                wasRead: false
            });

            if (notificationResponse.status >= 200 && notificationResponse.status < 300) {
                console.log("Property rejected and notification sent successfully");
                return true;
            } else {
                console.log("Error sending notification", notificationResponse.statusText);
            }
        } else {
            console.log("Error rejecting property", response.statusText);
            throw new Error("Error rejecting property");
        }
    } catch (error) {
        console.log("Error in rejectAndSubmitFeedback:", error);
        return false;
    }
}

// API call to approve the property and send notification
export const approvePropertyAndSendNotification = async (propertyID: number, propertyAddedBy: string) => {
    try {
        // Make the PUT request to approve the property
        const response = await axios.put(`http://localhost:8080/add-approval/${propertyID}`);

        // Check if the response was successful
        if (response.status >= 200 && response.status < 300) {
            console.log('Property approved successfully');

            // Now send a notification regarding the approval
            const notificationResponse = await axios.post("http://localhost:8080/send-notification", {
                uuid: propertyAddedBy,  // Assuming propertyAddedBy is a valid UUID here
                message: `Property with ID ${propertyID} has been approved.`,
                type: "info",
                related_table: "Property",
                relatedID: propertyID,
                wasRead: false
            });

            if (notificationResponse.status >= 200 && notificationResponse.status < 300) {
                console.log("Approval notification sent successfully");
                return true;  // Success
            } else {
                console.log("Error sending approval notification", notificationResponse.statusText);
                return false;  // Failure in notification
            }
        } else {
            console.log("Error approving property", response.statusText);
            return false;  // Failure in approval
        }
    } catch (error) {
        // Handle any error that occurred during the API request
        console.error('Error occurred while approving property and sending notification:', error);
        return false;  // Failure
    }
};

