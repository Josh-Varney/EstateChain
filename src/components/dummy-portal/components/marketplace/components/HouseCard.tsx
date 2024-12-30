import React from "react";
import { FaCamera, FaPhoneAlt, FaUserTie } from "react-icons/fa"; // Import some icons
import HouseCarousel from "./HouseCarousel";

const HouseCard = ({ house }) => {
    const placeholderImages = [
        "https://via.placeholder.com/300x200?text=Image+1",
        "https://via.placeholder.com/300x200?text=Image+2",
        "https://via.placeholder.com/300x200?text=Image+3",
    ];

    // Use either house.image or placeholders
    const images = house.image ? [house.image] : placeholderImages;

    return (
        <div className="flex flex-col border border-gray-300 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Featured Badge */}
            {house.featured && (
                <div className="flex flex-row items-center bg-yellow-400 text-center space-x-2 p-1 shadow-md">
                    <FaCamera className="text-xs text-white" />
                    <span className="text-white text-xs font-bold">
                        #{house.imageNumber || 1}
                    </span>
                    <span className="text-white text-xs font-bold uppercase">
                        Featured
                    </span>
                </div>
            )}

            {/* Card Content */}
            <div className="flex flex-col sm:flex-row">
                {/* Left Section: Carousel and Price */}
                <div className="sm:w-1/3 flex flex-col">
                    {/* Image Carousel */}
                    <div className="bg-gray-300 flex items-center justify-center h-48">
                        <HouseCarousel />
                    </div>

                    {/* Pricing */}
                    <div className="p-3 bg-gray-100 text-center">
                        <p className="text-lg font-semibold text-green-600">
                            {house.price ? `$${house.price} / month` : "Price not available"}
                        </p>
                    </div>
                </div>

                {/* Right Section: Details */}
                <div className="sm:w-2/3 p-4 flex flex-col justify-between bg-white">
                    {/* Property Name */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        {house.name || "Unnamed Property"}
                    </h3>

                    {/* Property Details */}
                    <p className="text-sm text-gray-600 mb-2">
                        {house.details || "Property details not available."}
                    </p>

                    {/* Agent Information */}
                    <div className="text-sm text-gray-700 flex items-start space-x-3">
                        {house.agent ? (
                            <>
                                <FaUserTie className="text-gray-500" />
                                <div>
                                    <strong>{house.agent.name}</strong> <br />
                                    <span className="flex items-center gap-1">
                                        <FaPhoneAlt className="text-gray-500" /> {house.agent.contact}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <p>Agent details not available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HouseCard;
