import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { Tooltip } from "react-tooltip";

const AddPropertyButton: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Track current step
  const [images, setImages] = useState<FileList | null>(null);

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
    propertyImage: '',
    propertyFeatured: false,
    propertyTenure: '',
    propertyGarden: false,
    propertyAccessibility: false,
    propertyKeywords: '',
    propertyKeyFeatures: '',
  });

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Property:', propertyData);
    console.log('Submitted Agent')
    
    setPropertyAgent({
        agentID: '',
        isAgent: false,
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
      propertyImage: '',
      propertyFeatured: false,
      propertyTenure: '',
      propertyGarden: false,
      propertyAccessibility: false,
      propertyKeywords: '',
      propertyKeyFeatures: '',
    });
    setImages(null);
    setCurrentStep(1); // Reset to the first step
    closePopup();
  };

  const handleNextStep = () => setCurrentStep(currentStep + 1);
  const handlePrevStep = () => setCurrentStep(currentStep - 1);

    // Function to convert postcode to latitude & longitude
    const handleNextStepWithGeocoding = async () => {
        const postcode = propertyData.propertyPostcode;
        if (!postcode) {
        alert("Please enter a postcode.");
        return;
        }

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
              className="text-2xl absolute top-3 right-3 hover:text-gray-600"
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
                        
                        <label htmlFor="propertyName" className="text-sm font-medium text-gray-700 flex items-center">
                            Property Name:
                            <Info
                            size={16}
                            className="ml-2 text-red-500 cursor-pointer"
                            data-tooltip-id="propertyNameTooltip"
                            />
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
                    <label htmlFor="propertyAddress" className="text-sm font-medium text-gray-700 flex items-center">
                        Property Address:
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
                      <label htmlFor="propertyTenure" className="text-sm font-medium text-gray-700 flex items-center">
                        Property Tenure:
                        <Info
                          size={16}
                          className="ml-2 text-red-500 cursor-pointer"
                          data-tooltip-id="propertyTenureTooltip"
                          />
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
                    <label htmlFor="propertyPrice" className="text-sm font-medium text-gray-700 flex items-center">
                      Property Valuation:
                      <Info
                        size={16}
                        className="ml-2 text-red-500 cursor-pointer"
                        data-tooltip-id="propertyPriceTooltip"
                        />
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
                    <label htmlFor="propertyTokens" className="text-sm font-medium text-gray-700 flex items-center">
                      Property Tokens:
                      <Info
                        size={16}
                        className="ml-2 text-red-500 cursor-pointer"
                        data-tooltip-id="propertyTokensTooltip"
                        />
                    </label>
                    <input
                      type="number"
                      id="propertyTokens"
                      name="propertyTokens"
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
                    <label htmlFor="propertyType" className="text-sm font-medium text-gray-700 flex items-center">
                      Property Type:
                      <Info
                        size={16}
                        className="ml-2 text-red-500 cursor-pointer"
                        data-tooltip-id="propertyTypeTooltip"
                        />
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
                    {/* Property Tokenization Type */}
                    <div className="mb-4">
                    <label htmlFor="propertyRental" className="text-sm font-medium text-gray-700 flex items-center">
                        Tokenization Type:
                        <Info
                        size={16}
                        className="ml-2 text-red-500 cursor-pointer"
                        data-tooltip-id="propertyRentalTypeTooltip"
                        />
                    </label>
                    <select
                        id="propertyRental"
                        name="propertyRental"
                        value={propertyData.propertyRental ? "Rental" : "Non-Rental"} // Correcting the value here
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border text-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="Rental">Rental</option>
                        <option value="Non-Rental">Non-Rental</option>
                    </select>
                </div>

                <Tooltip id="propertyRentalTypeTooltip" place="right">
                    Enter the property rental.
                </Tooltip>

                {/* Property Settlement */}
                <div className="mb-4">
                    <label htmlFor="propertySettlement" className="text-sm font-medium text-gray-700 flex items-center">
                      Property Type:
                      <Info
                        size={16}
                        className="ml-2 text-red-500 cursor-pointer"
                        data-tooltip-id="propertySettlementTooltip"
                        />
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
                    <label htmlFor="postcode" className="text-sm font-medium text-gray-700 flex items-center">
                    Postcode:
                    </label>
                    <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    value={propertyData.propertyPostcode}
                    onChange={(e) =>
                        setPropertyData({
                        ...propertyData,
                        propertyPostcode: e.target.value,
                        })
                    }
                    placeholder="e.g., CV7 7LA"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 text-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Country */}
                <div className="mb-4">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 items-center">
                    Country:
                    </label>
                    <input
                    type="text"
                    id="country"
                    name="country"
                    value={propertyData.propertyCountry}
                    placeholder="e.g., United Kingdom"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 text-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* City */}
                <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City:
                    </label>
                    <input
                    type="text"
                    id="city"
                    name="city"
                    value={propertyData.propertyCity}
                    placeholder="e.g., London"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 text-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Street */}
                <div className="mb-4">
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                    Street:
                    </label>
                    <input
                    type="text"
                    id="street"
                    name="street"
                    value={propertyData.propertyStreet}
                    placeholder="e.g., First Street"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 text-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Street Number */}
                <div className="mb-4">
                    <label htmlFor="streetNum" className="block text-sm font-medium text-gray-700">
                    Street Number:
                    </label>
                    <input
                    type="text"
                    id="streetNum"
                    name="streetNum"
                    value={propertyData.propertyStreetNum}
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
                    <label htmlFor="propertySize" className="block text-sm font-medium text-gray-700">
                    Property Size (sq ft / sq m):
                    </label>
                    <input
                    type="text"
                    id="propertySize"
                    name="propertySize"
                    value={propertyData.propertySize}
                    onChange={(e) =>
                        setPropertyData({
                        ...propertyData,
                        propertySize: e.target.value,
                        })
                    }
                    placeholder="e.g., 1200 sq ft"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Property Bedrooms */}
                <div className="mb-4">
                    <label htmlFor="propertyBedrooms" className="text-sm font-medium text-gray-700 flex items-center">
                      Property Bedrooms:
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
                    <label htmlFor="propertyBathrooms" className="text-sm font-medium text-gray-700 flex items-center">
                      Property Bathrooms:
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
                    <label htmlFor="propertyDescription" className="flex flex-row text-sm font-medium text-gray-700">
                    Property Description:
                    <Info
                        size={16}
                        className="ml-2 text-red-500 cursor-pointer"
                        data-tooltip-id="propertyDescriptionTooltip"
                    />
                    </label>
                    <textarea
                    id="propertyDescription"
                    name="propertyDescription"
                    value={propertyData.propertyDescription}
                    onChange={(e) =>
                        setPropertyData({
                        ...propertyData,
                        propertyDescription: e.target.value,
                        })
                    }
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
                    <label htmlFor="propertyKeywords" className="flex flex-row text-sm font-medium text-gray-700">
                    Keywords (comma-separated): 
                    <Info
                        size={16}
                        className="ml-2 text-red-500 cursor-pointer"
                        data-tooltip-id="propertyKeywordsTooltip"
                    />
                    </label>
                    <input
                    type="text"
                    id="propertyKeywords"
                    name="propertyKeywords"
                    value={propertyData.propertyKeywords}
                    onChange={(e) =>
                        setPropertyData({
                        ...propertyData,
                        propertyKeywords: e.target.value,
                        })
                    }
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

            {/* Step 4: Upload Images */}
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
                              value={propertyData.rentalDistributionExpectancy || ""}
                              onChange={handleInputChange} // Ensure this is always present
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
                            <label htmlFor="agentName" className="block text-sm font-medium text-gray-700">
                                Agent Name:
                            </label>
                            <input
                                type="text"
                                id="agentName"
                                name="agentName"
                                value={propertyAgent.agentName || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="agentEmail" className="flex flex-row text-sm font-medium text-gray-700">
                                Agent ID:
                                <Info
                                    size={16}
                                    className="ml-2 text-red-500 cursor-pointer"
                                    data-tooltip-id="propertyAgentTooltip"
                                />
                            </label>
                            <input
                                type="email"
                                id="agentEmail"
                                name="agentEmail"
                                value={propertyAgent.agentEmail || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                            <label htmlFor="agentName" className="block text-sm font-medium text-gray-700">
                                Your Name:
                            </label>
                            <input
                                type="text"
                                id="agentName"
                                name="agentName"
                                value={propertyAgent.agentName || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="agentContactNumber" className="block text-sm font-medium text-gray-700">
                                Your Contact Number:
                            </label>
                            <input
                                type="text"
                                id="agentContactNumber"
                                name="agentContactNumber"
                                value={propertyAgent.agentContactNumber || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="agentEmail" className="block text-sm font-medium text-gray-700">
                                Your Email:
                            </label>
                            <input
                                type="email"
                                id="agentEmail"
                                name="agentEmail"
                                value={propertyAgent.agentEmail || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="agentAddress" className="block text-sm font-medium text-gray-700">
                                Your Address:
                            </label>
                            <input
                                type="text"
                                id="agentAddress"
                                name="agentAddress"
                                value={propertyAgent.agentAddress || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="agentWhyDescription" className="flex flex-row text-sm font-medium text-gray-700">
                                Why do you want to be the agent?
                                <Info
                                    size={16}
                                    className="ml-2 text-red-500 cursor-pointer"
                                    data-tooltip-id="agentWhyTooltip"
                                />
                            </label>
                            <textarea
                                id="agentWhyDescription"
                                name="agentWhyDescription"
                                value={propertyAgent.agentWhyDescription || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <Tooltip id="agentWhyTooltip" place="right">
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
                    onChange={handleImageChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
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

            {/* Final Step: Submit (Step 5) */}
            {currentStep === 6 && (
            <div>
                <h3 className="text-xl font-semibold mb-4">Final Step: Submit</h3>
                <h3 className='bg-red-700'>Property Preview</h3>
                <div className='flex flex-row justify-between'>
                <form onSubmit={handleSubmit} className="w-full">
                    <button
                    type="submit"
                    className="w-32 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                    Submit Property
                    </button>
                </form>

                <button
                    type="button"
                    onClick={handlePrevStep}
                    className="w-32 bg-gray-300 text-white py-2 rounded-md hover:bg-gray-400 transition"
                >
                    Previous
                </button>
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
