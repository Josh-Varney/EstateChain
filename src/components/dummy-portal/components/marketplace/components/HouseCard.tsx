import React from "react";

const HouseCard = ({ house }) => {
    return (
        <div className="flex border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Image Section */}
            <div className="w-1/3 bg-gray-300 flex items-center justify-center">
                {house.image ? (
                    <img
                        src={house.image}
                        alt={house.name}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <span className="text-gray-500 text-lg font-medium">Image Placeholder</span>
                )}
            </div>
            
            {/* Info Section */}
            <div className="w-2/3 p-4">
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{house.name || "Unnamed Property"}</h3>
                
                {/* Details */}
                <div className="space-y-2 text-gray-600">
                    <p>
                        <span className="font-medium text-gray-700">Price:</span> ${house.price ? house.price.toLocaleString() : "N/A"}
                    </p>
                    <p>
                        <span className="font-medium text-gray-700">Location:</span> {house.location || "Unknown"}
                    </p>
                    <p>
                        <span className="font-medium text-gray-700">Size:</span> {house.size || "N/A"}
                    </p>
                    <p>
                        <span className="font-medium text-gray-700">Bathrooms:</span> {house.bathrooms || "N/A"}
                    </p>
                    <p>
                        <span className="font-medium text-gray-700">Token Price:</span> ${house.tokenPrice || "N/A"}
                    </p>
                    <p>
                        <span className="font-medium text-gray-700">Tokens Left:</span> {house.tokensLeft || "N/A"}
                    </p>
                    <p>
                        <span className="font-medium text-gray-700">Type:</span> {house.type || "N/A"}
                    </p>
                    <p>
                        <span className="font-medium text-gray-700">Rental:</span> {house.rental ? "Yes" : "No"}
                    </p>
                </div>
                
                {/* Action Button */}
                <div className="mt-4">
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HouseCard;
