import React from "react";

interface HouseDetailsProps {
  houses: House[];
  onClose: () => void;
}

type House = {
  id: number;
  propertyAddress: string;
  propertySettlement: string;
  propertyDescription: string;
  propertyAdded: string;
  propertyAddedBy: string;
  propertyAgent: {
    agentName: string;
    agentIcon: string;
    agentNumber: string;
    agentEmail: string;
  };
  propertyKeywords: string[];
  propertyPrice: number;
  propertyLocation: {
    latitude: number;
    longitude: number;
  };
  propertyCountry: string;
  propertySize: string;
  propertyBedrooms: number;
  propertyBathrooms: number;
  propertyTokenPrice: number;
  propertyTokensLeft: number;
  propertyType: string;
  propertyPostcode: string;
  propertyRental: boolean;
  propertyImage: string;
  propertyFeatured: boolean;
};

const HouseDetails: React.FC<HouseDetailsProps> = ({ houses, onClose }) => (
  <div className="fixed top-0 right-0 h-screen w-2/12 bg-gray-800 z-50 shadow-lg">
    {/* Header */}
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h2>Houses Inside Border</h2>
      <button onClick={onClose} className="text-red-500 hover:text-red-700">
        Close
      </button>
    </div>

    {/* Scrollable Cards Container */}
    <div className="p-4 h-[calc(100vh-72px)] overflow-y-auto">
      {houses.length === 0 ? (
        <p>No houses found inside the selected area.</p>
      ) : (
        houses.map((house) => (
          <div
            key={house.id}
            onClick={() => {
              window.location.href = `/simulation/mockmarketplace/display-property?propertyID=${encodeURIComponent(JSON.stringify(house))}`
            }}
            className="bg-gray-700 shadow-md rounded-lg p-4 border border-gray-600 mb-4 hover:bg-gray-600 cursor-pointer transition-all"
          >
            <img
              src={house.propertyImage}
              alt="House"
              className="h-32 w-full object-cover rounded-md mb-4"
            />
            <h3 className="font-bold text-xl text-white">{house.propertyAddress}</h3>
            <p className="text-sm text-gray-300">
              {house.propertyDescription}
            </p>
            <p className="text-sm text-gray-100 font-medium mt-2">
              Price: ${house.propertyPrice.toLocaleString()}
            </p>
            <div className="mt-3">
              <p className="text-xs text-gray-400">
                Bedrooms: {house.propertyBedrooms}
              </p>
              <p className="text-xs text-gray-400">
                Bathrooms: {house.propertyBathrooms}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

export default HouseDetails;
