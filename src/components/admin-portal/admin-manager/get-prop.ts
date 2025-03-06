import axios from "axios";
import { error } from "console";

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



