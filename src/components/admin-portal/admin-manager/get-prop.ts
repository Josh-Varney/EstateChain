import axios from "axios";

export const fetchProperties = async () => {
    try {
        const response = await axios.get("http://localhost:8080/fetch-properties-reviewals");
        return response.data.properties;
    } catch (error){
        console.log("Error fetching properties", error);
        return [];
    }
};

