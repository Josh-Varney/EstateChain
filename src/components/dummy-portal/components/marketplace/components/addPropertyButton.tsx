import React, { useState } from 'react';

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
                <h3 className="text-xl font-semibold mb-4">Step 1: Basic Property Information</h3>
                <form>
                  {/* Property Address */}
                  <div className="mb-4">
                    <label htmlFor="propertyAddress" className="block text-sm font-medium text-gray-700">
                      Property Address:
                    </label>
                    <input
                      type="text"
                      id="propertyAddress"
                      name="propertyAddress"
                      value={propertyData.propertyAddress}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Property Price */}
                  <div className="mb-4">
                    <label htmlFor="propertyPrice" className="block text-sm font-medium text-gray-700">
                      Property Price:
                    </label>
                    <input
                      type="number"
                      id="propertyPrice"
                      name="propertyPrice"
                      value={propertyData.propertyPrice}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Property Type */}
                  <div className="mb-4">
                    <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
                      Property Type:
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
                  {/* Latitude */}
                  <div className="mb-4">
                    <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                      Latitude:
                    </label>
                    <input
                      type="number"
                      id="latitude"
                      name="latitude"
                      value={propertyData.propertyLocation.latitude}
                      onChange={(e) =>
                        setPropertyData({
                          ...propertyData,
                          propertyLocation: {
                            ...propertyData.propertyLocation,
                            latitude: +e.target.value,
                          },
                        })
                      }
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Longitude */}
                  <div className="mb-4">
                    <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                      Longitude:
                    </label>
                    <input
                      type="number"
                      id="longitude"
                      name="longitude"
                      value={propertyData.propertyLocation.longitude}
                      onChange={(e) =>
                        setPropertyData({
                          ...propertyData,
                          propertyLocation: {
                            ...propertyData.propertyLocation,
                            longitude: +e.target.value,
                          },
                        })
                      }
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

            {/* Step 3: Property Features */}
            {currentStep === 3 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Step 3: Property Features</h3>
                <form>
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

            {/* Final Step: Submit */}
            {currentStep === 5 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Final Step: Submit</h3>
                <form onSubmit={handleSubmit}>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Submit Property
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPropertyButton;
