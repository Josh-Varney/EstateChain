
export const validatePropertyName = (value: string, setErrors: Function) => {
    let errorMessage = "";

    // Check if the property name is empty
    if (!value) {
        errorMessage = "Property name is required.";
    } else if (value.length < 3) {
        errorMessage = "Property name must be at least 3 characters long.";
    }

    // Update the errors state
    setErrors((prevErrors) => ({
        ...prevErrors,
        propertyName: errorMessage,
    }));
};

export const validatePropertyAddress = (value: string, setErrors: Function) => {
    let errorMessage = "";
  
    if (!value) {
      errorMessage = "Property address is required.";
    } else if (value.length < 10) {
      errorMessage = "Property address must be at least 10 characters long.";
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      propertyAddress: errorMessage,
    }));
  };
  
export  const validatePropertyTenure = (value: string, setErrors: Function) => {
    let errorMessage = "";
  
    if (!value) {
      errorMessage = "Please select the property tenure.";
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      propertyTenure: errorMessage,
    }));
  };

export const validatePropertyPrice = (value: string, setErrors: Function) => {
    let errorMessage = "";

    // Check if the value is empty or invalid
    if (!value) {
        errorMessage = "Property valuation is required.";
    } else if (isNaN(Number(value)) || Number(value) <= 0) {
        errorMessage = "Please enter a valid property price greater than 0.";
    }

    setErrors((prevErrors) => ({
        ...prevErrors,
        propertyPrice: errorMessage,
    }));
};

export const validatePropertyTokensLeft = (value: string, setErrors: Function) => {
    let errorMessage = "";
  
    // Check if the value is empty
    if (!value) {
      errorMessage = "Property tokens left is required.";
    } else if (isNaN(Number(value)) || Number(value) <= 0) {
      errorMessage = "Please enter a valid number greater than 0 for property tokens.";
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      propertyTokensLeft: errorMessage,
    }));
  };
  
export const validatePropertyType = (value: string, setErrors: Function) => {
    let errorMessage = "";

    if (!value) {
        errorMessage = "Please select a property type.";
    }

    setErrors((prevErrors) => ({
        ...prevErrors,
        propertyType: errorMessage,
    }));
};

export const validatePropertyRental = (value: string, setErrors: Function) => {
    let errorMessage = "";
  
    if (!value) {
      errorMessage = "Please select a tokenization type.";
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      propertyRental: errorMessage,
    }));
  };

export const validatePropertySettlement = (value: string, setErrors: Function) => {
    let errorMessage = "";
  
    if (!value) {
      errorMessage = "Please select a property situation.";
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      propertySettlement: errorMessage,
    }));
  };
  
export const validatePropertyPostcode = (value: string, setErrors: Function) => {
    let errorMessage = "";
  
    // UK postcode regex (simple version)
    const postcodeRegex = /^[A-Z]{1,2}\d[A-Z0-9]? \d[A-Z]{2}$/i;
  
    if (!value) {
      errorMessage = "Postcode is required.";
    } else if (!postcodeRegex.test(value)) {
      errorMessage = "Please enter a valid postcode (e.g., CV7 7LA).";
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      propertyPostcode: errorMessage,
    }));
  };
  
export const validatePropertyCountry = (value: string, setErrors: Function) => {
    let errorMessage = "";
  
    if (!value) {
      errorMessage = "Country is required.";
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      propertyCountry: errorMessage,
    }));
  };
  
export const validatePropertyCity = (value: string, setErrors: Function) => {
    let errorMessage = "";
  
    if (!value) {
      errorMessage = "City is required.";
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      propertyCity: errorMessage,
    }));
  };
  
export const validatePropertyStreet = (value: string, setErrors: Function) => {
    let errorMessage = "";
  
    if (!value) {
      errorMessage = "Street is required.";
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      propertyStreet: errorMessage,
    }));
  };
  
export const validatePropertyStreetNum = (value: string, setErrors: Function) => {
    let errorMessage = "";
  
    if (!value) {
      errorMessage = "Street Number is required.";
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      propertyStreetNum: errorMessage,
    }));
  };
  
export const validatePropertySize = (value: string, setErrors: Function) => {
    let errorMessage = "";

    // Check for a valid number followed by 'sq ft' or 'sq m'
    const regex = /^[0-9]+(\s*(sq ft|sq m))?$/i;
    if (!value || !regex.test(value.trim())) {
        errorMessage = "Property size must be a valid number followed by 'sq ft' or 'sq m'.";
    }

    setErrors((prevErrors: any) => ({
        ...prevErrors,
        propertySize: errorMessage,
    }));
};
  
export const validatePropertyBedrooms = (value: string, setErrors: Function) => {
    let errorMessage = "";
  
    const parsedValue = parseInt(value, 10);
    if (parsedValue <= 0 || isNaN(parsedValue)) {
      errorMessage = "Property bedrooms must be a positive number.";
    }
  
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      propertyBedrooms: errorMessage,
    }));
  };

export const validatePropertyBathrooms = (value: string, setErrors: Function) => {
    let errorMessage = "";

    const parsedValue = parseInt(value, 10);
    if (parsedValue <= 0 || isNaN(parsedValue)) {
        errorMessage = "Property bathrooms must be a positive number.";
    }

    setErrors((prevErrors: any) => ({
        ...prevErrors,
        propertyBathrooms: errorMessage,
    }));
};

export const validatePropertyDescription = (value: string, setErrors: Function) => {
    let errorMessage = "";
  
    // Ensure description is not empty and meets minimum length requirement
    if (!value || value.trim().length < 10) {
      errorMessage = "Property description must be at least 10 characters.";
    }
  
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      propertyDescription: errorMessage,
    }));
  };

export const validatePropertyKeywords = (value: string, setErrors: Function) => {
    let errorMessage = "";

    // Check if the input is empty
    if (!value || value.trim().length === 0) {
        errorMessage = "Keywords are required.";
    } else {
        // Split by commas, and check if there is at least one non-empty keyword
        const keywords = value.split(",").map((keyword) => keyword.trim());
        if (keywords.length === 0 || keywords.some((keyword) => keyword === "")) {
        errorMessage = "Please enter at least one valid keyword, separated by commas.";
        }
    }

    setErrors((prevErrors: any) => ({
        ...prevErrors,
        propertyKeywords: errorMessage,
    }));
    };

export const validateRentalDistribution = (value: string, setErrors: React.Dispatch<React.SetStateAction<any>>) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = "Rental income expectancy is required.";
    } else if (isNaN(Number(value)) || Number(value) <= 0) {
      errorMessage = "Please enter a valid positive number for rental income expectancy.";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      rentalDistributionExpectancy: errorMessage,
    }));
};   

export const validateAgentName = (value: string, setErrors: React.Dispatch<React.SetStateAction<any>>) => {
    let errorMessage = '';
    if (!value) {
      errorMessage = 'Agent Name is required.';
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      agentName: errorMessage,
    }));
  };
  
export const validateAgentEmail = (value: string, setErrors: React.Dispatch<React.SetStateAction<any>>) => {
    let errorMessage = '';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Basic email regex
    if (!value) {
      errorMessage = 'Agent Email is required.';
    } else if (!emailRegex.test(value)) {
      errorMessage = 'Please enter a valid email address.';
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      agentEmail: errorMessage,
    }));
  };

export const validateAgentContactNumber = (value: string, setErrors: React.Dispatch<React.SetStateAction<any>>) => {
    let errorMessage = '';
    const phoneRegex = /^[+]?([0-9]{1,4})?[-\s]?([0-9]{1,4})[-\s]?([0-9]{1,4})[-\s]?([0-9]{1,4})$/; // Simple phone number regex
  
    if (!value) {
      errorMessage = 'Agent Contact Number is required.';
    } else if (!phoneRegex.test(value)) {
      errorMessage = 'Please enter a valid contact number.';
    }
    
    setErrors((prevErrors) => ({
      ...prevErrors,
      agentContactNumber: errorMessage,
    }));
  };

export const validateAgentAddress = (value: string, setErrors: React.Dispatch<React.SetStateAction<any>>) => {
    let errorMessage = '';
    if (!value) {
      errorMessage = 'Agent Address is required.';
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      agentAddress: errorMessage,
    }));
  };
  
export const validateAgentWhyDescription = (value: string, setErrors: React.Dispatch<React.SetStateAction<any>>) => {
    let errorMessage = '';
    if (!value) {
      errorMessage = 'Please explain why you want to be the agent.';
    } else if (value.length < 10) {
      errorMessage = 'Description must be at least 10 characters long.';
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      agentWhyDescription: errorMessage,
    }));
  };
  
export const validateAgentSoldDescription = (value: string, setErrors: React.Dispatch<React.SetStateAction<any>>) => {
    let errorMessage = '';
    if (!value) {
      errorMessage = 'Please explain if you have sold any properties before.';
    } else if (value.length < 10) {
      errorMessage = 'Description must be at least 10 characters long.';
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      agentSoldDescription: errorMessage,
    }));
  };
  