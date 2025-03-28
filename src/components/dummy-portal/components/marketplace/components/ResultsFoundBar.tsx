import React, { useState } from "react";
import { FaMap, FaRegAddressCard } from "react-icons/fa";
import Overlay from "./HouseMapOverlay";

interface FilterType {
    propertyMinPrice: string;
    propertyMaxPrice: string;
    propertyLocation: string;
    propertySettlement: string;
    propertyKeywords: string[];
    dontShowKeywords: string[];
    propertyMinBedrooms: string;
    propertyMaxBedrooms: string;
    propertyMinBathrooms: string;
    propertyMaxBathrooms: string;
    propertyMinTokensLeft: string;
    propertyMaxTokensLeft: string;
    propertyMinTokenPrice: string;
    propertyMaxTokenPrice: string;
    propertyAdded: string;
    propertyType: string;
    propertyRental: string;
    searchLocation: {
        latitude: number;
        longitude: number;
        metric: "miles" | "km";
        distance: number | "Within Country" | "All Locations";
        country_from_search: string;
    } | null;
}

type House = {
    id: number;
    propertyAddress: string;
    propertySettlement: string;
    propertyDescription: string;
    propertyAdded: string; // ISO string format
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

type SearchLocation = {
    latitude: number;
    longitude: number;
    metric: "miles" | "km";
    distance: number | "Within Country" | "All Locations";
    country_from_search: string;
};

interface ResultsBarProps {
    count: number;
    onSortChange?: (value: string) => void;
    darkMode: boolean; // Optional prop
    filters: FilterType;
    onFilterChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        optionalParam?: string
    ) => void;
    filteredHouses: House[];
    searchLocation: SearchLocation | null;
}

const ResultsBar: React.FC<ResultsBarProps> = ({ count, onSortChange, darkMode, filters, onFilterChange, filteredHouses, searchLocation }) => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const openOverlay = () => setIsOverlayOpen(true);
    const closeOverlay = () => setIsOverlayOpen(false);

    return (
        <div>
            {/* Main ResultsBar */}
            <div className="flex items-center justify-between text-gray-300 px-4 py-1 text-center shadow">
                {/* Left side: Properties found */}
                <div className="flex flex-row items-center space-x-2">
                    <span className="text-2xl font-medium" aria-label="Count">
                        {count}
                    </span>
                    <span className="text-base" aria-label="Results Text">
                        results
                    </span>
                </div>

                {/* Right side: Sort and Map Button */}
                <div className="flex items-center">
                    {/* Sort Dropdown */}
                    <div className="flex items-center space-x-2 border-gray-400 border-r pr-4">
                        <label htmlFor="sortOptions" className="text-white text-sm">
                            Sort:
                        </label>
                        <select
                            id="sortOptions"
                            className="text-sm bg-transparent text-white"
                            onChange={(e) => onSortChange?.(e.target.value)}
                        >
                            <option value="tokenPriceAsc">Token Price (Low to High)</option>
                            <option value="tokenPriceDesc">Token Price (High to Low)</option>
                            <option value="priceAsc">House Price (Low to High)</option>
                            <option value="priceDesc">House Price (High to Low)</option>
                            <option value="tokensLeftAsc">Tokens Left (Fewest First)</option>
                            <option value="tokensLeftDesc">Tokens Left (Most First)</option>
                            <option value="bedroomsAsc">Bedrooms (Low to High)</option>
                            <option value="bedroomsDesc">Bedrooms (High to Low)</option>
                            <option value="dateAddedAsc">Date Added (Oldest First)</option>
                            <option value="dateAddedDesc">Date Added (Newest First)</option>
                        </select>
                    </div>

                    {/* Map Buttons */}
                    <div className="flex items-center space-x-2">
                        <button
                            className="flex items-center space-x-2 border-gray-400 border-r text-gray-600 hover:text-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 px-2"
                            aria-label="Toggle Map View with Card"
                        >
                            <FaRegAddressCard className="text-xl h-5 w-5" />
                            <span className="sr-only">Open Map View</span>
                        </button>

                        <button
                            className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2"
                            onClick={openOverlay}
                            aria-label="Toggle Map View"
                        >
                            <FaMap className="text-xl h-5 w-5" />
                            <span className="sr-only">Open Map View</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            <Overlay isOpen={isOverlayOpen} closeOverlay={closeOverlay} darkMode={darkMode} filters={filters} onFilterChange={onFilterChange} filteredHouses={filteredHouses} searchLocation={searchLocation}/>
        </div>
    );
};

export default ResultsBar;
