import React from "react";
import { FaBath, FaBed, FaCamera, FaHeart, FaMailBulk, FaPhoneAlt } from "react-icons/fa";
import HouseCarousel from "./HouseCarousel";

const HouseCard = ({ house }) => {
    const placeholderImages = [
        "https://via.placeholder.com/500x300?text=House+Image+1",
        "https://via.placeholder.com/500x300?text=House+Image+2",
        "https://via.placeholder.com/500x300?text=House+Image+3",
    ];

    // Use either house.image or placeholders
    const images = house.image ? [house.image] : placeholderImages;

    return (
        <div className="w-full flex flex-col border border-gray-300 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            {/* Featured Badge */}
            {house.featured && (
                <div className="flex items-center bg-yellow-500 text-white px-4 py-2 text-sm font-bold uppercase shadow-md">
                    <FaCamera className="mr-2" />
                    <span>Featured</span>
                </div>
            )}

            {/* Card Content */}
            <div className="flex flex-col sm:flex-row">
                {/* Left Section: Carousel and Price */}
                <div className="sm:w-1/3 flex flex-col">
                    {/* Image Carousel */}
                    <div className="bg-gray-300 flex items-center justify-center h-64 w-full">
                        <HouseCarousel />
                    </div>

                    {/* Pricing */}
                    <div className="p-4 bg-gray-100 text-center">
                        <p className="text-2xl font-semibold text-green-600">
                            {house.price ? `$${house.price} / month` : "Price not available"}
                        </p>
                    </div>
                </div>

                {/* Right Section: Details */}
                <div className="sm:w-2/3 p-6 flex flex-col justify-between bg-white">
                    {/* Location */}
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            {house.propertyAddress ? house.propertyAddress : "Undefined Address"}
                        </h1>
                        <div className="flex flex-row space-x-3 items-center">
                            <p className="text-gray-600 mt-1">
                                {house.propertySettlement ? house.propertySettlement : "Undefined Settlement"}
                            </p>
                            {/* Property Details */}
                            <div className="flex items-center space-x-4 text-gray-700">
                                <div className="flex items-center space-x-2">
                                    <FaBed className="text-lg" />
                                    <span className="text-lg">{house.bedrooms ? house.bedrooms : "N/A"}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <FaBath className="text-lg" />
                                    <span className="text-lg">{house.bathrooms ? house.bathrooms : "N/A"}</span>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Description */}
                    <p className="text-gray-600 text-sm">
                        {house.propertyDescription ? house.propertyDescription : "Description not available"}
                    </p>

                    {/* Added Date and Agent Info */}
                    <div className="text-sm text-gray-500 mt-4">
                        <p>
                            {house.propertyAdded && house.propertyAddedBy
                                ? `Added on ${house.propertyAdded} by ${house.propertyAddedBy}`
                                : "Property details missing"}
                        </p>
                    </div>

                    {/* Agent Information */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-gray-700">
                            <div>
                                <FaPhoneAlt className="text-lg" />
                            </div>
                            <div>
                                <span>{house.propertyAgent?.agentName || "Agent contact not available"}</span>
                            </div>
                            
                        </div>
                        <div className="flex items-center space-x-4 text-gray-500">
                            <FaHeart className="hover:text-red-500 cursor-pointer text-xl" />
                            <FaMailBulk className="hover:text-blue-500 cursor-pointer text-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HouseCard;
