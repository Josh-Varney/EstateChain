import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { Tooltip } from "react-tooltip";

const AddPropertyButton: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Track current step
  const [images, setImages] = useState<FileList | null>(null);

  // Define states for each property field
  const [propertyData, setPropertyData] = useState({
    propertyAddress: '',
    propertySettlement: '',
    propertyDescription: '',
    propertyPrice: 0,
    propertyLocation: {
      latitude: 0,
      longitude: 0,
    },
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
    const { name, checked } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Property:', propertyData);
    
    // Reset the form state after submission
    setPropertyData({
      propertyAddress: '',
      propertySettlement: '',
      propertyDescription: '',
      propertyPrice: 0,
      propertyLocation: {
        latitude: 0,
        longitude: 0,
      },
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
                <h3 className="text-xl font-semibold mb-2">Step 1: Basic Property Information</h3>
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
                        Enter the property name if applicable.
                    </Tooltip>

                    <input
                        type="text"
                        id="propertyName"
                        name="propertyName"
                        value={propertyData.propertyAddress}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 text-blue-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    </div>
                  {/* Property Address */}
                  <div className="mb-4">
                    <label htmlFor="propertyAddress" className="text-sm font-medium text-gray-700 flex items-center">
                        Property Address:
                        <Info
                        size={16}
                        className="ml-2 text-red-500 cursor-pointer"
                        data-tooltip-id="propertyAddressTooltip"
                        />
                    </label>

                    <Tooltip id="propertyAddressTooltip" place="right">
                        Enter the full address of the property.
                    </Tooltip>

                    <input
                        type="text"
                        id="propertyAddress"
                        name="propertyAddress"
                        value={propertyData.propertyAddress}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-blue-400 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    </div>

                  {/* Property Price */}
                  <div className="mb-4">
                    <label htmlFor="propertyPrice" className="text-sm font-medium text-gray-700 flex items-center">
                      Property Price:
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
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                    <Tooltip id="propertyPriceTooltip" place="right">
                        Enter the valuation of the property.
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
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-blue-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Type</option>
                      <option value="House">House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Condo">Condo</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>

                    <Tooltip id="propertyTypeTooltip" place="right">
                        Enter the type of property.
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
                <h3 className="text-xl font-semibold mb-4">Step 2: Location Information</h3>
                <form>
                {/* Postcode */}
                <div className="mb-4">
                    <label htmlFor="postcode" className="text-sm font-medium text-gray-700 flex items-center">
                    Postcode:
                    <Info
                        size={16}
                        className="ml-2 text-red-500 cursor-pointer"
                        data-tooltip-id="propertyTypeTooltip"
                    />
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
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Country */}
                <div className="mb-4">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country:
                    </label>
                    <input
                    type="text"
                    id="country"
                    name="country"
                    value={propertyData.propertyCountry}
                    readOnly
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
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
                    readOnly
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
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
                    readOnly
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
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
                    readOnly
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
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
                <h3 className="text-xl font-semibold mb-4">Step 3: Property Features</h3>
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

                {/* Property Description */}
                <div className="mb-4">
                    <label htmlFor="propertyDescription" className="block text-sm font-medium text-gray-700">
                    Property Description:
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
                    rows="4"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
                
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

                    {/* Parking */}
                    <div className="mb-4 flex items-center">
                        <input
                        type="checkbox"
                        id="propertyParking"
                        name="propertyParking"
                        checked={propertyData.propertyParking}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                        />
                        <label htmlFor="propertyParking" className="text-sm font-medium text-gray-700">
                        Parking
                        </label>
                    </div>

                    {/* Swimming Pool */}
                    <div className="mb-4 flex items-center">
                        <input
                        type="checkbox"
                        id="propertySwimmingPool"
                        name="propertySwimmingPool"
                        checked={propertyData.propertySwimmingPool}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                        />
                        <label htmlFor="propertySwimmingPool" className="text-sm font-medium text-gray-700">
                        Swimming Pool
                        </label>
                    </div>
                </div>
                
                <div>
                     {/* Furnished */}
                    <div className="mb-4 flex items-center">
                        <input
                        type="checkbox"
                        id="propertyFurnished"
                        name="propertyFurnished"
                        checked={propertyData.propertyFurnished}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                        />
                        <label htmlFor="propertyFurnished" className="text-sm font-medium text-gray-700">
                        Furnished
                        </label>
                    </div>

                    {/* Balcony */}
                    <div className="mb-4 flex items-center">
                        <input
                        type="checkbox"
                        id="propertyBalcony"
                        name="propertyBalcony"
                        checked={propertyData.propertyBalcony}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                        />
                        <label htmlFor="propertyBalcony" className="text-sm font-medium text-gray-700">
                        Balcony
                        </label>
                    </div>

                    {/* Pets Allowed */}
                    <div className="mb-4 flex items-center">
                        <input
                        type="checkbox"
                        id="propertyPetsAllowed"
                        name="propertyPetsAllowed"
                        checked={propertyData.propertyPetsAllowed}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                        />
                        <label htmlFor="propertyPetsAllowed" className="text-sm font-medium text-gray-700">
                        Pets Allowed
                        </label>
                    </div>
                    </div>
                </div>

                {/* Keywords */}
                <div className="mb-4">
                    <label htmlFor="propertyKeywords" className="block text-sm font-medium text-gray-700">
                    Keywords (comma-separated):
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
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                <h3 className="text-xl font-semibold mb-4">Step 4: Upload Images</h3>
                <form>
                  {/* Property Image */}
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

            {/* Final Step: Submit  (Will get a preview aswell) */}
            {currentStep === 5 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Final Step: Submit</h3>
                <h3 className='bg-red-700'>Property Preview</h3>
                <div className='flex flex-row justify-between'>
                <form onSubmit={handleSubmit}>
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
