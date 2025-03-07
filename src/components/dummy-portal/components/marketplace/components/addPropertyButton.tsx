import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { Tooltip } from "react-tooltip";
import { validateAgentAddress, validateAgentContactNumber, validateAgentEmail, validateAgentName, validateAgentSoldDescription, validateAgentWhyDescription, validatePropertyAddress, validatePropertyBathrooms, validatePropertyBedrooms, validatePropertyCity, validatePropertyCountry, validatePropertyDescription, validatePropertyKeywords, validatePropertyName, validatePropertyPostcode, validatePropertyPrice, validatePropertyRental, validatePropertySettlement, validatePropertySize, validatePropertyStreet, validatePropertyStreetNum, validatePropertyTenure, validatePropertyTokensLeft, validatePropertyType, validateRentalDistribution } from '../../../../../managers/dummy-portal/propertyManager';
import { findAgent, submitAgentData, submitPropertyData } from '../../../../../managers/dummy-portal/propertyManager2';
import axios from 'axios';

const AddPropertyButton: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Track current step
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    propertyName: "",
    propertyAddress: "",
    propertyTenure: "",
    propertyPrice: "",
    propertyTokensLeft: "",
    propertyType: "",
    propertyRental: "",
    propertySettlement: "",
    propertyPostcode: "",
    propertyCountry: "",
    propertyCity: "",
    propertyStreet: "",
    propertyStreetNum: "",
    propertySize: "",
    propertyBedrooms: "",
    propertyBathrooms: "",
    propertyDescription: "",
    propertyKeywords: "",
    rentalDistributionExpectancy: "",
    agentID: "",
    agentName: "",
    agentEmail: "",
    agentContactNumber: "",
    agentAddress: "",
    agentWhyDescription: "",
    agentSoldDescription: "",
  })

  const totalSteps = 6; // Update if you have more steps
  const progressPercentage = (currentStep / totalSteps) * 100;

  const [propertyAgent, setPropertyAgent] = useState({
    isAgent: false,
    agentID: '',
    agentName: '',
    agentContactNumber: '',
    agentEmail: '',
    agentAddress: '',
    agentWhyDescription: '',
    agentSoldDescription: '',
  })

  // Define states for each property field
  const [propertyData, setPropertyData] = useState({
    propertyName: '', //
    propertyAddress: '', //
    propertySettlement: '',
    propertyDescription: '',
    propertyPrice: 0, //
    propertyLocation: {
      latitude: 0,
      longitude: 0,
    },
    rentalDistributionExpectancy: 0,
    propertyStreetNum: '',
    propertyStreet: '',
    propertyCity: '',
    propertyCountry: '',
    propertySize: '',
    propertyBedrooms: 0,
    propertyBathrooms: 0,
    propertyTokenPrice: 0,
    propertyTokensLeft: 0,
    propertyType: '',
    propertyPostcode: '',
    propertyRental: false,
    propertyFeatured: false,
    propertyTenure: '',
    propertyGarden: false,
    propertyAccessibility: false,
    propertyKeywords: '',
  });

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      
      // Allowed file types
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

      // Filter valid files and set error for invalid ones
      const validFiles = fileArray.filter(file => allowedTypes.includes(file.type));
      const invalidFiles = fileArray.filter(file => !allowedTypes.includes(file.type));

      if (invalidFiles.length > 0) {
        setError("Some files were rejected. Only JPG, PNG, GIF, and WEBP are allowed.");
      } else {
        setError(null);
      }

      setImages((prevImages) => [...prevImages, ...validFiles]);
    }
  };


  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
    // Validate the input based on the field name
    if (name === "propertyName") {
      validatePropertyName(value, setErrors);
    } else if (name === "propertyAddress") {
      validatePropertyAddress(value, setErrors);
    } else if (name === "propertyTenure") {
      validatePropertyTenure(value, setErrors);
    } else if (name === "propertyPrice") {
      validatePropertyPrice(value, setErrors);
    } else if (name === "propertyTokensLeft") {
      validatePropertyTokensLeft(value, setErrors);
    } else if (name === "propertyType") {
      validatePropertyType(value, setErrors);
    } else if (name === "propertyRental") {
      validatePropertyRental(value, setErrors);
    } else if (name === "propertySettlement") {
      validatePropertySettlement(value, setErrors);
    } else if (name === "propertyCountry") {
      validatePropertyCountry(value, setErrors);
    } else if (name === "propertyCity") {
      validatePropertyCity(value, setErrors);
    } else if (name === "propertyStreet") {
      validatePropertyStreet(value, setErrors);
    } else if (name === "propertyStreetNum") {
      validatePropertyStreetNum(value, setErrors);
    } else if (name === "propertyPostcode") {
      validatePropertyPostcode(value, setErrors);
    } else if (name === "propertySize") {
      validatePropertySize(value, setErrors);
    } else if (name === "propertyBedrooms") {
      validatePropertyBedrooms(value, setErrors);
    } else if (name === "propertyBathrooms") {
      validatePropertyBathrooms(value, setErrors);
    } else if (name === "propertyDescription") {
      validatePropertyDescription(value, setErrors);
    } else if (name === "propertyKeywords") {
      validatePropertyKeywords(value, setErrors);
    } else if (name === "rentalDistributionExpectancy") {
      validateRentalDistribution(value, setErrors);
    } 
}

  

  const handleInputChangeAgent = (e:any) => {
    const { name, value } = e.target;
    setPropertyAgent((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "agentName") {
      validateAgentName(value, setErrors); // Validate agent name
    } else if (name === "agentEmail") {
      validateAgentEmail(value, setErrors); // Validate agent email
    } else if (name === "agentContactNumber") {
      validateAgentContactNumber(value, setErrors); // Validate agent contact number
    } else if (name === "agentAddress") {
      validateAgentAddress(value, setErrors);
    } else if (name === "agentWhyDescription") {
      validateAgentWhyDescription(value, setErrors);
    } else if (name === "agentSoldDescription") {
      validateAgentSoldDescription(value, setErrors);
    } else if (name === "agentID"){
      console.log("Needs Implementation");
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, // Handle checkboxes properly
    }));
  };
  
  const handleCheckboxChangeAgent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setPropertyAgent((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, // Handle checkboxes properly
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Example usage:
    if (!propertyAgent.isAgent) {

      // Submit property agent data and handle the returned agentID
      submitAgentData('http://localhost:3001/api/submitAgent', propertyAgent)
        .then(async response => {
          console.log('Response from server:', response);
          
          if (response) {
            console.log('Received agentID:', response);

            // Calculate the token value
            const propertyTokenValue = propertyData.propertyPrice / propertyData.propertyTokensLeft;
            propertyData.propertyTokenPrice = propertyTokenValue;

            const notify = await axios.post("http://localhost:8080/send-notification", {
              uuid: localStorage.getItem("uuid"),  // Assuming propertyAddedBy is a valid UUID here
              message: `Your application to become an agent will be reviewed`,
              type: "info",
              related_table: "Property",
              wasRead: false
            });

            if (notify.status >= 200 && notify.status < 300) {
                console.log("Approval notification sent successfully");
            } else {
                console.log("Error sending approval notification", notify.statusText);
            }

            
            const preprocessedData = {
              agentID: response,
              uuid: localStorage.getItem("uuid"),
              ...propertyData
            }

            submitPropertyData('http://localhost:3001/api/submitProperty', preprocessedData);

            const notificationResponse = await axios.post("http://localhost:8080/send-notification", {
              uuid: localStorage.getItem("uuid"),  // Assuming propertyAddedBy is a valid UUID here
              message: `Your property listing was sent. Please wait for confirmation`,
              type: "info",
              related_table: "Property",
              wasRead: false
            });

            if (notificationResponse.status >= 200 && notificationResponse.status < 300) {
                console.log("Approval notification sent successfully");
            } else {
                console.log("Error sending approval notification", notificationResponse.statusText);
            }

          } else {
            console.log(propertyAgent);
            console.log(propertyData);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {

      // Calculate the token value
      const propertyTokenValue = propertyData.propertyPrice / propertyData.propertyTokensLeft;
      propertyData.propertyTokenPrice = propertyTokenValue;
      
      // NEEDS VALIDATION PLEASE
      const preprocessedData = {
        agentID: propertyAgent.agentID,
        uuid: localStorage.getItem("uuid"),
        ...propertyData
      }

      submitPropertyData('http://localhost:3001/api/submitProperty', preprocessedData);


      const notificationResponse = await axios.post("http://localhost:8080/send-notification", {
        uuid: localStorage.getItem("uuid"),  // Assuming propertyAddedBy is a valid UUID here
        message: `Your property listing was sent. Please wait for confirmation`,
        type: "info",
        related_table: "Property",
        wasRead: false
      });

      if (notificationResponse.status >= 200 && notificationResponse.status < 300) {
        console.log("Approval notification sent successfully");
      } else {
          console.log("Error sending approval notification", notificationResponse.statusText);
      }
    }
    

    setPropertyAgent({
        isAgent: false,
        agentID: '',
        agentName: '',
        agentAddress: '',
        agentContactNumber: '',
        agentEmail: '',
        agentSoldDescription: '',
        agentWhyDescription: ''
    });
    // Reset the form state after submission
    setPropertyData({
      propertyName: '', //
      propertyAddress: '', //
      propertySettlement: '',
      propertyDescription: '',
      propertyPrice: 0, //
      propertyLocation: {
        latitude: 0,
        longitude: 0,
      },
      rentalDistributionExpectancy: 0,
      propertyStreetNum: '',
      propertyStreet: '',
      propertyCity: '',
      propertyCountry: '',
      propertySize: '',
      propertyBedrooms: 0,
      propertyBathrooms: 0,
      propertyTokenPrice: 0,
      propertyTokensLeft: 0,
      propertyType: '',
      propertyPostcode: '',
      propertyRental: false,
      propertyFeatured: false,
      propertyTenure: '',
      propertyGarden: false,
      propertyAccessibility: false,
      propertyKeywords: '',
    });
    setImages([]);
    setCurrentStep(1);
    closePopup();
  };

    const handleNextStep = () => {
      // Check if there are any errors
      const errors: any = {};

      console.log(currentStep);

      if (currentStep === 1) {
        const requiredFields = {
            propertyName: "Property Name is required",
            propertyAddress: "Property Address is required",
            propertyTenure: "Property Tenure is required",
            propertyPrice: "Property Price is required",
            propertyTokensLeft: "Property Tokens are required",
            propertyType: "Property Type is required"
        };
    
        Object.keys(requiredFields).forEach(field => {
            if (!propertyData[field] || (typeof propertyData[field] === "string" && !propertyData[field].trim())) {
                errors[field] = requiredFields[field];
            }
        });
    
        setErrors(errors);
      }    
      else if (currentStep == 3) {
        const requiredFields = {
            propertySize: "Property Size is required",
            propertyBedrooms: "Number of Bedrooms is required",
            propertyBathrooms: "Number of Bathrooms is required",
            propertyDescription: "Property Description is required",
            propertyKeywords: "Keywords are required"
        };
    
        Object.keys(requiredFields).forEach(field => {
            if (!propertyData[field] || (typeof propertyData[field] === "string" && !propertyData[field].trim())) {
                errors[field] = requiredFields[field];
            }
        });
    
        setErrors(errors);
      }    
      else if (currentStep == 4) {
        if (propertyData.propertyRental && !propertyData.rentalDistributionExpectancy) {
            errors.rentalDistributionExpectancy = "Rental Distribution Expectancy is required";
        }
    
        const requiredFields = ["agentName"];
        
        if (!propertyAgent.isAgent) {
            requiredFields.push("agentContactNumber", "agentAddress", "agentWhyDescription", "agentSoldDescription");
        }
    
        requiredFields.forEach(field => {
            if (!propertyAgent[field]) {
                errors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`.toLowerCase();
            }
        });
    
        setErrors(errors);
    }


      const hasErrors = Object.values(errors).some((error) => error !== "");

      if (hasErrors) {
        console.log("Errors: ", errors);
        console.log("There are errors, cannot proceed.");
        return; // Prevent proceeding to the next step
      }
    
      // Move to the next step
      setCurrentStep(currentStep + 1);
  };

    const handlePrevStep = () => {
      setCurrentStep(currentStep - 1);
    };
  

    // Function to convert postcode to latitude & longitude
    const handleNextStepWithGeocoding = async () => {
        const errors: any = {};
        
        const requiredFields = {
          propertySettlement: "Property Situation is required",
          propertyPostcode: "Postcode is required",
          propertyCountry: "Country is required",
          propertyCity: "City is required",
          propertyStreet: "Street is required",
          propertyStreetNum: "Street Number is required"
        };
      
        Object.keys(requiredFields).forEach(field => {
            if (!propertyData[field]?.trim()) {
                errors[field] = requiredFields[field];
            }
        });
      
      setErrors(errors);

        const hasErrors = Object.values(errors).some((error) => error !== "");

        if (hasErrors) {
          console.log("Errors: ", errors)
          console.log("There are errors, cannot proceed.");
          return; // Prevent proceeding to the next step
        }

        const postcode = propertyData.propertyPostcode;

        try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(postcode)}`
        );
        const data = await response.json();

        if (data.length > 0) {
            const { lat, lon } = data[0];
            setPropertyData((prevData) => ({
            ...prevData,
            propertyLocation: {
                latitude: parseFloat(lat),
                longitude: parseFloat(lon),
            },
            }));
            handleNextStep(); // Proceed to next step after fetching coordinates
        } else {
            alert("Invalid postcode. Please try again.");
        }
        } catch (error) {
        console.error("Error fetching geolocation:", error);
        alert("Failed to fetch location. Please check your internet connection.");
        }
    };

  return (
    <div className="relative">
      {/* Blue circular button */}
      <button
        onClick={openPopup}
        className="bg-red-500 text-white rounded-full w-14 h-14 text-2xl flex items-center justify-center fixed bottom-5 right-5 shadow-lg hover:bg-red-600 transition"
      >
        +
      </button>

      {/* Pop-up form */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg relative shadow-xl overflow-hidden">
            <button
              onClick={closePopup}
              className="text-3xl text-red-400 absolute top-3 right-3 hover:text-gray-600"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Add Property</h2>

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                  ></div>
              </div>

                <form>
                     {/* Property Name */}
                    <div className="mb-4">
                        
                        <label htmlFor="propertyName" className="text-sm font-medium text-gray-700 flex items-center space-x-3 whitespace-nowrap">
                            Property Name:
                            <Info
                            size={16}
                            className="ml-2 text-blue-500 cursor-pointer"
                            data-tooltip-id="propertyNameTooltip"
                            />
                            {errors.propertyName && (
                                <p className="text-sm text-red-500">{errors.propertyName}</p>
                            )}

                        </label>

                        <Tooltip id="propertyNameTooltip" place="right">
                            Enter the property name, this will be the header of your property listing.
                        </Tooltip>

                        <input
                            type="text"
                            id="propertyName"
                            name="propertyName"
                            value={propertyData.propertyName}
                            onChange={handleInputChange}
                            placeholder="e.g., Quince House"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 text-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                        
                  {/* Property Address */}
                  <div className="mb-4">
                    <label htmlFor="propertyAddress" className="text-sm font-medium text-gray-700 flex items-center space-x-3 whitespace-nowrap">
                          <div className='flex flex-row space-x-3'>
                            <div>
                              Property Address:
                            </div>
                            {errors.propertyAddress && (
                                <p className="text-sm text-red-500">{errors.propertyAddress}</p>
                            )}
                          </div>
                       
                    </label>


                    <input
                        type="text"
                        id="propertyAddress"
                        name="propertyAddress"
                        value={propertyData.propertyAddress}
                        onChange={handleInputChange}
                        placeholder="e.g., The Grange, Main Road, Meriden, CV7 7LA"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 text-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    </div>

                     {/* Property Tenure */}
                    <div className="mb-4">
                      <label htmlFor="propertyTenure" className="text-sm font-medium text-gray-700 flex items-center space-x-3 whitespace-nowrap">
                        Property Tenure:
                        <Info
                          size={16}
                          className="ml-2 text-blue-500 cursor-pointer"
                          data-tooltip-id="propertyTenureTooltip"
                          />
                        {errors.propertyTenure && (
                            <p className="text-sm text-red-500">{errors.propertyTenure}</p>
                        )}
                      </label>
                      <select
                        id="propertyTenure"
                        name="propertyTenure"
                        value={propertyData.propertyTenure}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 text-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Tenure</option>
                        <option value="leasehold">Lease Hold</option>
                        <option value="freehold">Free Hold</option>
                      </select>
                    </div>

                    <Tooltip id="propertyTenureTooltip" place="right">
                        Enter the full tenure of the property. Legal status of the property.
                    </Tooltip>

                  {/* Property Price */}
                  <div className="mb-4">
                    <label htmlFor="propertyPrice" className="text-sm font-medium text-gray-700 flex items-center space-x-3 whitespace-nowrap">
                      <div className='flex flex-row'>
                        Property Valuation:
                        <Info
                          size={16}
                          className="ml-2 text-blue-500 cursor-pointer"
                          data-tooltip-id="propertyPriceTooltip"
                          />
                      </div>
                      <div>
                        {errors.propertyPrice && (
                              <p className="text-sm text-red-500">{errors.propertyPrice}</p>
                          )}
                      </div>
                    </label>
                    <input
                      type="number"
                      id="propertyPrice"
                      name="propertyPrice"
                      value={propertyData.propertyPrice}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                    <Tooltip id="propertyPriceTooltip" place="right">
                        Enter the valuation of the property for token pricing.
                    </Tooltip>

                  {/* Property Tokens */}
                  <div className="mb-4">
                    <label htmlFor="propertyTokensLeft" className="text-sm font-medium text-gray-700 flex items-center space-x-3 whitespace-nowrap">
                      <div className='flex flex-row'>
                        Property Tokens:
                        <Info
                          size={16}
                          className="ml-2 text-blue-500 cursor-pointer"
                          data-tooltip-id="propertyTokensTooltip"
                          />
                      </div>
                      <div>
                        {errors.propertyTokensLeft && (
                              <p className="text-sm text-red-500">{errors.propertyTokensLeft}</p>
                          )}
                      </div>
                    </label>
                    <input
                      type="number"
                      id="propertyTokensLeft"
                      name="propertyTokensLeft"
                      value={propertyData.propertyTokensLeft}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                    <Tooltip id="propertyTokensTooltip" place="right">
                        Enter the number of tokens to represent ownership of the property.
                    </Tooltip>

                  {/* Property Type */}
                  <div className="mb-4">
                    <label htmlFor="propertyType" className="text-sm font-medium text-gray-700 flex items-center space-x-3 whitespace-nowrap">
                      <div className='flex flex-row'> 
                        Property Use:
                        <Info
                          size={16}
                          className="ml-2 text-blue-500 cursor-pointer"
                          data-tooltip-id="propertyTypeTooltip"
                          />
                      </div>
                      <div>
                        {errors.propertyType && (
                              <p className="text-sm text-red-500">{errors.propertyType}</p>
                          )}
                      </div>
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={propertyData.propertyType}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Type</option>
                      <option value="Residential">Residential</option>
                      <option value="Retail">Retail</option>
                      <option value="Leisure">Leisure</option>
                      <option value="Land">Land</option>
                      <option value="Commercial">Commerical</option>
                      <option value="Bulk Warehouse">Bulk Warehouse</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Offices">Offices</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Multifamily">Multifamily</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Special Purpose">Special Purpose</option>
                    </select>
                  </div>

                    <Tooltip id="propertyTypeTooltip" place="right">
                        Enter the type of property type that will be listed.
                    </Tooltip>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Next
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Location Information */}
            {currentStep === 2 && (
            <div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                  ></div>
              </div>
                <form>
                {/* Property Settlement */}
                <div className="mb-4">
                    <label htmlFor="propertySettlement" className="text-sm font-medium text-gray-700 flex items-center space-x-3">
                      <div className='flex flex-row'>
                        Property Situation:
                        <Info
                          size={16}
                          className="ml-2 text-red-500 cursor-pointer"
                          data-tooltip-id="propertySettlementTooltip"
                          />
                      </div>
                      <div>
                        {errors.propertySettlement && (
                              <p className="text-sm text-red-500">{errors.propertySettlement}</p>
                          )}
                      </div>
                      
                    </label>
                    <select
                      id="propertySettlement"
                      name="propertySettlement"
                      value={propertyData.propertySettlement}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Type</option>
                      <option value="Detatched">Detatched</option>
                      <option value="Terrace">Terrace</option>
                      <option value="Flat">Flat</option>
                      <option value="Semi-Detatched">Semi-Detatched</option>
                      <option value="Bungalow">Bungalow</option>
                      <option value="Cottage">Cottage</option>
                      <option value="Maisonette">Maisonette</option>
                      <option value="Mansion">Mansion</option>
                      <option value="Office">Office</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Hotel">Hotel</option>
                    </select>
                  </div>

                    <Tooltip id="propertySettlementTooltip" place="right">
                        Enter the type of real estate.
                    </Tooltip>

                {/* Postcode */}
                <div className="mb-4">
                    <label htmlFor="propertyPostcode" className="text-sm font-medium text-gray-700 flex items-center space-x-3">
                      <div>
                        Postcode:
                      </div>
                      <div>
                        {errors.propertyPostcode && (
                        <p className="text-sm text-red-500">{errors.propertyPostcode}</p>
                      )}
                      </div>
                    </label>
                    <input
                    type="text"
                    id="propertyPostcode"
                    name="propertyPostcode"
                    value={propertyData.propertyPostcode}
                    onChange={handleInputChange}
                    placeholder="e.g., CV7 7LA"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 text-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Country */}
                <div className="mb-4">
                    <label htmlFor="propertyCountry" className="flex flex-row text-sm font-medium text-gray-700 items-center space-x-3">
                      <div>
                        Country:
                      </div>
                      <div>
                        {errors.propertyCountry && <p className="text-sm text-red-500">{errors.propertyCountry}</p>}
                      </div>
                    </label>
                    <input
                    type="text"
                    id="propertyCountry"
                    name="propertyCountry"
                    value={propertyData.propertyCountry}
                    onChange={handleInputChange}
                    placeholder="e.g., United Kingdom"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 text-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* City */}
                <div className="mb-4">
                    <label htmlFor="propertyCity" className="flex flex-row text-sm font-medium text-gray-700 space-x-3">
                      <div>
                      City:
                      </div>
                      <div>
                        {errors.propertyCity && <p className="text-sm text-red-500">{errors.propertyCity}</p>}
                      </div>
            
                    </label>
                    <input
                    type="text"
                    id="propertyCity"
                    name="propertyCity"
                    value={propertyData.propertyCity}
                    onChange={handleInputChange}
                    placeholder="e.g., London"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 text-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Street */}
                <div className="mb-4">
                    <label htmlFor="propertyStreet" className="flex flex-row text-sm font-medium text-gray-700 space-x-3">
                      <div>
                        Street:
                      </div>
                      <div> 
                        {errors.propertyStreet && <p className="text-sm text-red-500">{errors.propertyStreet}</p>}
                      </div>
                    </label>
                    <input
                    type="text"
                    id="propertyStreet"
                    name="propertyStreet"
                    value={propertyData.propertyStreet}
                    onChange={handleInputChange}
                    placeholder="e.g., First Street"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 text-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Street Number */}
                <div className="mb-4">
                    <label htmlFor="propertyStreetNum" className="flex flex-row text-sm font-medium text-gray-700 space-x-3">
                      <div> 
                        Street Number:
                      </div>
                      <div>
                        {errors.propertyStreetNum && <p className="text-sm text-red-500">{errors.propertyStreetNum}</p>}
                      </div>
                    </label>
                    <input
                    type="text"
                    id="propertyStreetNum"
                    name="propertyStreetNum"
                    value={propertyData.propertyStreetNum}
                    onChange={handleInputChange}
                    placeholder="e.g., 11"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 text-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Previous and Next Buttons */}
                <div className="flex justify-between">
                    <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-32 bg-gray-300 text-white py-2 rounded-md hover:bg-gray-400 transition"
                    >
                    Previous
                    </button>
                    <button
                    type="button"
                    onClick={handleNextStepWithGeocoding}
                    className="w-32 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                    Next
                    </button>
                </div>
                </form>
            </div>
            )}


            {/* Step 3: Property Features */}
            {currentStep === 3 && (
            <div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                  ></div>
              </div>
                <form>
                {/* Property Size */}
                <div className="mb-4">
                    <label htmlFor="propertySize" className="flex flex-row text-sm font-medium text-gray-700 space-x-3">
                      <div>
                        Property Size:
                      </div>
                      <div>
                        {errors.propertySize && (
                        <p className="text-sm text-red-500">{errors.propertySize}</p>
                      )}
                      </div>
                    </label>
                    <input
                    type="text"
                    id="propertySize"
                    name="propertySize"
                    value={propertyData.propertySize}
                    onChange={handleInputChange}
                    placeholder="e.g., 1200 sq ft"
                    className="mt-1 block w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Property Bedrooms */}
                <div className="mb-4">
                    <label htmlFor="propertyBedrooms" className="flex flex-row text-sm font-medium text-gray-700 items-center space-x-3">
                      <div>
                        Property Bedrooms:
                      </div>
                      <div>
                        {errors.propertyBedrooms && (
                          <p className="text-sm text-red-500">{errors.propertyBedrooms}</p>
                        )}
                      </div>
                    </label>
                    <input
                      type="number"
                      id="propertyBedrooms"
                      name="propertyBedrooms"
                      value={propertyData.propertyBedrooms}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Property Bedrooms */}
                <div className="mb-4">
                    <label htmlFor="propertyBathrooms" className="text-sm font-medium text-gray-700 flex items-center space-x-3">
                      <div>
                        Property Bathrooms:
                      </div>
                      <div>
                        {errors.propertyBathrooms && (
                          <p className="text-sm text-red-500">{errors.propertyBathrooms}</p>
                        )}
                      </div>
                    </label>
                    <input
                      type="number"
                      id="propertyBathrooms"
                      name="propertyBathrooms"
                      value={propertyData.propertyBathrooms}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                {/* Property Description */}
                <div className="mb-4">
                    <label htmlFor="propertyDescription" className="flex flex-row text-sm font-medium text-gray-700 space-x-3 items-center">
                      <div className='flex flex-row items-center'> 
                       Property Description:
                       <Info
                          size={16}
                          className="ml-2 text-blue-500 cursor-pointer"
                          data-tooltip-id="propertyDescriptionTooltip"
                        />
                      </div>
                      <div> 
                        
                        {errors.propertyDescription && (
                          <p className="text-sm text-red-500">{errors.propertyDescription}</p>
                        )}
                      </div>
                    
                    </label>
                    <textarea
                    id="propertyDescription"
                    name="propertyDescription"
                    value={propertyData.propertyDescription}
                    onChange={handleInputChange}
                    placeholder="Enter details about the property..."
                    rows={4}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 text-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                <Tooltip id="propertyDescriptionTooltip" place="right">
                        This will be a prime factor in drawing attraction to the listing.
                </Tooltip>
                
                <div className='pl-12 pr-12 p-2 flex flex-row justify-between'>
                <div>
                    {/* Garden */}
                    <div className="mb-4 flex items-center">
                        <input
                        type="checkbox"
                        id="propertyGarden"
                        name="propertyGarden"
                        checked={propertyData.propertyGarden}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                        />
                        <label htmlFor="propertyGarden" className="text-sm font-medium text-gray-700">
                        Garden
                        </label>
                    </div>

                    {/* Accessibility */}
                    <div className="mb-4 flex items-center">
                        <input
                        type="checkbox"
                        id="propertyAccessibility"
                        name="propertyAccessibility"
                        checked={propertyData.propertyAccessibility}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                        />
                        <label htmlFor="propertyAccessibility" className="text-sm font-medium text-gray-700">
                        Accessibility
                        </label>
                    </div>
                    </div>
                </div>

                {/* Keywords */}
                <div className="mb-4">
                    <label htmlFor="propertyKeywords" className="flex flex-row text-sm font-medium text-gray-700 space-x-3">
                      <div className='flex flex-row items-center'>
                        Keywords (comma-separated): 
                        <Info
                            size={16}
                            className="ml-2 text-blue-500 cursor-pointer"
                            data-tooltip-id="propertyKeywordsTooltip"
                        />
                      </div>
                      <div>
                        {errors.propertyKeywords && (
                        <p className="text-sm text-red-500">{errors.propertyKeywords}</p>
                        )}
                      </div>
                    
                    </label>
                    <input
                    type="text"
                    id="propertyKeywords"
                    name="propertyKeywords"
                    value={propertyData.propertyKeywords}
                    onChange={handleInputChange}
                    placeholder="e.g., garden, parking, sea view"
                    className="mt-1 block w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <Tooltip id="propertyKeywordsTooltip" place="right">
                        This will gain engagement through seperated keywords.
                </Tooltip>

                {/* Previous and Next Buttons */}
                <div className="flex justify-between">
                    <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-32 bg-gray-300 text-white py-2 rounded-md hover:bg-gray-400 transition"
                    >
                    Previous
                    </button>
                    <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-32 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                    Next
                    </button>
                </div>
                </form>
            </div>
            )}

            {/* Step 4: Agent */}
            {currentStep === 4 && (
            <div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                  ></div>
              </div>

                <form>
                {/* Property Rental Checkbox */}
                <div className="mb-4">
                  <div className="flex flex-row space-x-4 items-center">
                      <label htmlFor="propertyRental" className="block text-sm font-medium text-gray-700">
                          Is the Property Rental?
                      </label>
                      <input
                          type="checkbox"
                          id="propertyRental"
                          name="propertyRental"
                          checked={propertyData.propertyRental}
                          onChange={handleCheckboxChange}
                          className="mt-1"
                      />
                  </div>

                  {propertyData.propertyRental && (
                      <div className="mt-4">
                          <div className="flex flex-row">
                              <label htmlFor="rentalDistributionExpectancy" className="block text-sm font-medium text-gray-700">
                                  Rental Income Expectancy Per Month:
                                  {errors.rentalDistributionExpectancy && (
                                    <p className="text-sm text-red-500">{errors.rentalDistributionExpectancy}</p>
                                  )}
                              </label>
                              <Info
                                  size={16}
                                  className="ml-2 text-red-500 cursor-pointer"
                                  data-tooltip-id="propertyRentalDistributionTooltip"
                              />
                          </div>
                          <input
                              type="text"
                              id="rentalDistributionExpectancy"
                              name="rentalDistributionExpectancy"
                              value={propertyData.rentalDistributionExpectancy}
                              onChange={handleInputChange} 
                              placeholder="e.g., £200 a month"
                              className="mt-1 block w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                      </div>
                  )}
              </div>

                <Tooltip id="propertyRentalDistributionTooltip" place="right">
                    This income will be distributed evenly based on ownership.
                </Tooltip>


                {/* Agent Info Selection */}
                <div className="mb-4">
                    <div className="flex flex-row space-x-4 items-center">
                        <label htmlFor="isAgent" className="block text-sm font-medium text-gray-700">
                            Is this property managed by an agent?
                        </label>
                        <input
                            type="checkbox"
                            id="isAgent"
                            name="isAgent"
                            checked={propertyAgent.isAgent} // Ensure this is a boolean
                            onChange={handleCheckboxChangeAgent}
                            className="mt-1"
                        />
                    </div>
                </div>

                {/* Conditional fields for agent details if the agent is already selected */}
                {propertyAgent.isAgent && (
                    <div>
                        <div className="mb-4">
                            <label htmlFor="agentName" className="flex flex-row text-sm font-medium text-gray-700 space-x-3">
                                <div>
                                  Agent Name:
                                </div>
                                <div>
                                  {errors.agentName && (
                                    <p className="text-sm text-red-500">{errors.agentName}</p>
                                  )}
                                </div>
                            </label>
                            <input
                                type="text"
                                id="agentName"
                                name="agentName"
                                value={propertyAgent.agentName}
                                onChange={handleInputChangeAgent}
                                className="mt-1 block w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="agentID" className="flex flex-row text-sm font-medium text-gray-700 space-x-3">
                                <div className='flex flex-row items-center'>
                                  Agent ID:
                                  <Info
                                    size={16}
                                    className="ml-2 text-blue-500 cursor-pointer"
                                    data-tooltip-id="propertyAgentTooltip"
                                  />
                                </div>
                                <div>
                                  {errors.agentID && (
                                    <p className="text-sm text-red-500">{errors.agentID}</p>
                                  )}
                                </div>
                                
                            </label>
                            <input
                                type="number"
                                id="agentID"
                                name="agentID"
                                value={propertyAgent.agentID}
                                onChange={handleInputChangeAgent}
                                className="mt-1 block w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <Tooltip id="propertyAgentTooltip" place="right">
                          This is the trusted agent that will manage the listing on your behalf.
                        </Tooltip>

                        <div className='flex flex-row justify-between'>
                        {/* Previous and Next Buttons for Step 5 */}
                        <div className="flex justify-between w-full">
                            <button
                            type="button"
                            onClick={handlePrevStep}
                            className="w-32 bg-gray-300 text-white py-2 rounded-md hover:bg-gray-400 transition"
                            >
                            Previous
                            </button>
                            <button
                            type="button"
                            onClick={handleNextStep}
                            className="w-32 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                            >
                            Next
                            </button>
                        </div>
                        </div>
                    </div>
                )}

                {/* Conditional fields for agent application if the user is applying */}
                {!propertyAgent.isAgent && (
                    <div>
                        <div className="mb-4">
                            <label htmlFor="agentName" className="flex flex-row text-sm font-medium text-gray-700 space-x-3">
                                <div>
                                  Your Name:
                                </div>
                                <div>
                                  {errors.agentName && (
                                    <p className="text-sm text-red-500">{errors.agentName}</p>
                                  )}
                                </div>
                            </label>
                            <input
                                type="text"
                                id="agentName"
                                name="agentName"
                                value={propertyAgent.agentName}
                                onChange={handleInputChangeAgent}
                                className="mt-1 block w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="agentContactNumber" className="flex flex-row text-sm font-medium text-gray-700 space-x-3">
                                <div>
                                  Your Contact Number:
                                </div>
                                <div>
                                  {errors.agentContactNumber && (
                                    <p className="text-sm text-red-500">{errors.agentContactNumber}</p>
                                  )}
                                </div>
                            </label>
                            <input
                                type="text"
                                id="agentContactNumber"
                                name="agentContactNumber"
                                value={propertyAgent.agentContactNumber}
                                onChange={handleInputChangeAgent}
                                className="mt-1 block w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="agentEmail" className="flex flex-row text-sm font-medium text-gray-700 space-x-3">
                                <div>
                                  Your Email:
                                </div>
                                <div> 
                                  {errors.agentEmail && (
                                    <p className="text-sm text-red-500">{errors.agentEmail}</p>
                                  )}
                                </div>
                            </label>
                            <input
                                type="email"
                                id="agentEmail"
                                name="agentEmail"
                                value={propertyAgent.agentEmail}
                                onChange={handleInputChangeAgent}
                                className="mt-1 block w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="agentAddress" className="flex flex-row text-sm font-medium text-gray-700 space-x-3">
                                <div>
                                  Your Address:
                                </div>
                                <div>
                                  {errors.agentAddress && (
                                    <p className="text-sm text-red-500">{errors.agentAddress}</p>
                                  )}
                                </div>
                            </label>
                            <input
                                type="text"
                                id="agentAddress"
                                name="agentAddress"
                                value={propertyAgent.agentAddress}
                                onChange={handleInputChangeAgent}
                                className="mt-1 block w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="agentWhyDescription" className="text-sm font-medium text-gray-700">
                                  <div className='whitespace-nowrap flex flex-row items-center'>
                                    Why do you want to be the agent?
                                    <Info
                                        size={16}
                                        className="ml-2 text-blue-500 cursor-pointer"
                                        data-tooltip-id="agentWhyTooltip"
                                    />
                                  </div>
                                  <div>
                                    {errors.agentWhyDescription && (
                                    <p className="text-sm text-red-500">{errors.agentWhyDescription}</p>
                                  )}
                                  </div>
                                
                            </label>
                            <textarea
                                id="agentWhyDescription"
                                name="agentWhyDescription"
                                value={propertyAgent.agentWhyDescription}
                                onChange={handleInputChangeAgent}
                                className="mt-1 block w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <Tooltip id="agentWhyTooltip" place="right">
                          This will help you gain trust with others.
                        </Tooltip>

                        <div className="mb-4">
                            <label htmlFor="agentSoldDescription" className="text-sm font-medium text-gray-700">
                                <div className="whitespace-nowrap flex flex-row items-center">
                                  Have you sold any properties before?
                                  <Info
                                      size={16}
                                      className="ml-2 text-blue-500 cursor-pointer"
                                      data-tooltip-id="agentSoldDescriptionTooltip"
                                  />
                                </div>
                                <div>
                                  {errors.agentSoldDescription && (
                                    <p className="text-sm text-red-500">{errors.agentSoldDescription}</p>
                                  )}
                                </div>
                            </label>
                            <textarea
                                id="agentSoldDescription"
                                name="agentSoldDescription"
                                value={propertyAgent.agentSoldDescription}
                                onChange={handleInputChangeAgent}
                                className="mt-1 block w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <Tooltip id="agentSoldDescriptionTooltip" place="right">
                          This will help you gain trust with others.
                        </Tooltip>

                        <div className='flex flex-row justify-between'>
                        {/* Previous and Next Buttons for Step 5 */}
                        <div className="flex justify-between w-full">
                            <button
                            type="button"
                            onClick={handlePrevStep}
                            className="w-32 bg-gray-300 text-white py-2 rounded-md hover:bg-gray-400 transition"
                            >
                            Previous
                            </button>
                            <button
                            type="button"
                            onClick={handleNextStep}
                            className="w-32 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                            >
                            Next
                            </button>
                        </div>
                        </div>
                    </div>
                    
                )}
                </form>
            </div>
            )}

            {/* Final Step: Submit (Step 5) */}
            {currentStep === 5 && (
            <div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                  ></div>
              </div>

                {/* Image Upload */}
                <div className="mb-4">
                  <label htmlFor="propertyImage" className="block text-sm font-medium text-gray-700">
                    Property Images:
                  </label>
                  <input
                    type="file"
                    id="propertyImage"
                    name="propertyImage"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />

                  {/* Display error message */}
                  {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

                  {/* Display file names with remove button */}
                  {images.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p className="font-semibold">Uploaded Files:</p>
                      <ul className="list-disc pl-5">
                        {images.map((image, index) => (
                          <li key={index} className="flex items-center justify-between">
                            {image.name}
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="ml-2 text-red-500 hover:text-red-700 text-xs font-semibold"
                            >
                              ❌
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex justify-between w-full">
                    <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-32 bg-gray-300 text-white py-2 rounded-md hover:bg-gray-400 transition"
                    >
                    Previous
                    </button>
                    <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-32 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                    Next
                    </button>
                </div>
                </div>
            )}

            {currentStep === 6 && (
              <div className="text-black">
                
                {/* Property Image */}
                <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
                  <img
                    src={"https://via.placeholder.com/600x400?text=No+Image+Available"}
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Property Preview Card */}
                <div className="bg-white p-2 rounded-lg shadow-md border">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{propertyData.propertyName}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {propertyData.propertyAddress}, {propertyData.propertyCity}, {propertyData.propertyCountry}, {propertyData.propertyPostcode}
                  </p>

                  {/* Grid Layout for Property Details */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p><strong>🏡 Type:</strong> {propertyData.propertyType}</p>
                      <p><strong>📍 Settlement:</strong> {propertyData.propertySettlement}</p>
                      <p><strong>🔑 Tenure:</strong> {propertyData.propertyTenure}</p>
                      <p><strong>💰 Price:</strong> £{propertyData.propertyPrice}</p>
                      <p><strong>🎟️ Tokens Left:</strong> {propertyData.propertyTokensLeft}</p>
                      <p><strong>💵 Token Price:</strong> £{propertyData.propertyTokenPrice}</p>
                    </div>

                    <div className="space-y-2">
                      <p><strong>📏 Size:</strong> {propertyData.propertySize} sq ft</p>
                      <p><strong>🛏 Bedrooms:</strong> {propertyData.propertyBedrooms}</p>
                      <p><strong>🛁 Bathrooms:</strong> {propertyData.propertyBathrooms}</p>
                      <p><strong>🌳 Garden:</strong> {propertyData.propertyGarden ? "Yes" : "No"}</p>
                      <p><strong>♿ Accessibility:</strong> {propertyData.propertyAccessibility ? "Yes" : "No"}</p>
                      <p><strong>🏠 Rental:</strong> {propertyData.propertyRental ? `Yes (£${propertyData.rentalDistributionExpectancy}/month)` : "No"}</p>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="mt-4">
                    <h4 className="font-semibold">📄 Description:</h4>
                    <p className="text-gray-700 text-sm">{propertyData.propertyDescription || "No description provided"}</p>
                  </div>

                  {/* Keywords Section */}
                  {propertyData.propertyKeywords && (
                    <div className="mt-4">
                      <h4 className="font-semibold">🔎 Keywords:</h4>
                      <p className="text-gray-700 text-sm">{propertyData.propertyKeywords}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="w-32 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition font-medium"
                    >
                      Previous
                    </button>

                    <form onSubmit={handleSubmit}>
                      <button
                        type="submit"
                        className="w-32 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}




          </div>
        </div>
      )}
    </div>
  );
};

export default AddPropertyButton;
