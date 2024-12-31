import React from "react";
import { FaBath, FaBed, FaCamera, FaHeart, FaMailBulk, FaPhoneAlt } from "react-icons/fa";
import HouseCarousel from "./HouseCarousel";

const HouseCard = ({ house }: { house: any }) => {
    const placeholderImages = [
        "https://via.placeholder.com/500x300?text=House+Image+1",
        "https://via.placeholder.com/500x300?text=House+Image+2",
        "https://via.placeholder.com/500x300?text=House+Image+3",
    ];

    const images = house.image ? [house.image] : placeholderImages;

    return (
        <div className="w-full flex flex-col border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Featured Badge */}
            {house.featured && (
                <div className="flex items-center bg-yellow-500 text-white px-3 py-1 text-xs font-bold uppercase">
                    <FaCamera className="mr-2" />
                    <span>Featured</span>
                </div>
            )}

            {/* Card Content */}
            <div className="flex flex-col md:flex-row">
                {/* Left Section: Carousel and Price */}
                <div className="md:w-1/3 w-full flex flex-col">
                    {/* Image Carousel */}
                    <div className="relative bg-gray-300 w-full h-36 sm:h-40 md:h-48">
                        <HouseCarousel />
                    </div>

                    {/* Pricing */}
                    <div className="p-2 bg-gray-100 text-center">
                        <p className="text-lg font-semibold text-green-600">
                            {house.price ? `£${house.price.toLocaleString()}` : "Price not available"}
                        </p>
                    </div>
                </div>

                {/* Right Section: Details */}
                <div className="md:w-2/3 w-full p-3 flex flex-col justify-between bg-white">
                    {/* Property Information */}
                    <div>
                        <h1 className="text-base font-semibold text-gray-800">
                            {house.propertyAddress || "Undefined Address"}
                        </h1>
                        <div className="flex flex-col md:flex-row md:space-x-3 items-start md:items-center mt-2">
                            <p className="text-gray-600 text-sm">
                                {house.propertySettlement || "Undefined Settlement"}
                            </p>
                            {/* Property Details */}
                            <div className="flex space-x-4 text-gray-700 mt-2 md:mt-0">
                                <div className="flex items-center space-x-1">
                                    <FaBed className="text-sm" />
                                    <span className="text-sm">{house.bedrooms || "N/A"}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <FaBath className="text-sm" />
                                    <span className="text-sm">{house.bathrooms || "N/A"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {house.propertyDescription || "Description not available"}
                    </p>

                    {/* Additional Information */}
                    <div className="text-xs text-gray-500 mt-3">
                        <p>
                            {house.propertyAdded && house.propertyAddedBy
                                ? `Added on ${house.propertyAdded} by ${house.propertyAddedBy}`
                                : "Property details missing"}
                        </p>
                    </div>

                    {/* Contact and Actions */}
                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2 text-gray-700">
                            <FaPhoneAlt className="text-sm" />
                            <span className="text-sm">{house.propertyAgent?.agentName || "Agent contact not available"}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-500">
                            <FaHeart className="hover:text-red-500 cursor-pointer text-lg" />
                            <FaMailBulk className="hover:text-blue-500 cursor-pointer text-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HouseCard;
