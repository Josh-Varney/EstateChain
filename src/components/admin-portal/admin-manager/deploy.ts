export async function updateProperty(
    propertyID: number,
    pSmartAddress: string,
    bType: string,
    bCurrency: string 
  ): Promise<void> {
    try {
      console.log("Updating Smart Address");

      const bType = "Holesky";
      const bCurrency = "ETH"

      // **Validate Inputs Before Making the API Call**
      if (!propertyID || typeof propertyID !== "number") {
        throw new Error("Invalid propertyID: It must be a non-empty number.");
      }
      if (!pSmartAddress || typeof pSmartAddress !== "string") {
        throw new Error("Invalid pSmartAddress: It must be a non-empty string.");
      }
      if (!bType || typeof bType !== "string") {
        throw new Error("Invalid bType: It must be a non-empty string.");
      }
      if (!bCurrency || typeof bCurrency !== "string") {
        throw new Error("Invalid bCurrency: It must be a non-empty string.");
      }
      
      console.log(pSmartAddress);
      
      const url = `http://localhost:8080/property/${propertyID}/${pSmartAddress}/${bType}/${bCurrency}`;
  
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Smart Address Updated?");
  
      // Handle HTTP errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP Error ${response.status}: ${errorData.error || "Unknown error"}`);
      }
  
      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Failed to update property:", error);
    }
}
  