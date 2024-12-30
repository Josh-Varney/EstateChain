import React, { useState } from "react";
import FilterControls from "./FilterControl";
import HouseList from "./HouseList";
import FilterBar from "./FilterBar";
import AlertSaveSearchBar from "./AltertSaveSearchBar";
import ResultsBar from "./ResultsFoundBar";
import KeywordDropdown from "./KeywordDropdown";

const HouseDisplay = ({ darkMode }) => {
    const houses = [
        { 
            id: 1, 
            name: "Modern Villa", 
            price: 500000, 
            location: "California", 
            size: "3000 sqft", 
            bedrooms: 4, 
            bathrooms: 3, 
            tokenPrice: 50, 
            tokensLeft: 100, 
            type: "Villa", 
            rental: false, 
            image: "https://via.placeholder.com/300x200?text=Modern+Villa", 
            featured: true 
        },
        { 
            id: 2, 
            name: "Cozy Cottage", 
            price: 150000, 
            location: "Maine", 
            size: "1200 sqft", 
            bedrooms: 2, 
            bathrooms: 1, 
            tokenPrice: 15, 
            tokensLeft: 200, 
            type: "Cottage", 
            rental: true, 
            image: "https://via.placeholder.com/300x200?text=Cozy+Cottage", 
            featured: true 
        },
        { 
            id: 3, 
            name: "Urban Apartment", 
            price: 300000, 
            location: "New York", 
            size: "900 sqft", 
            bedrooms: 1, 
            bathrooms: 1, 
            tokenPrice: 30, 
            tokensLeft: 150, 
            type: "Apartment", 
            rental: true, 
            image: "https://via.placeholder.com/300x200?text=Urban+Apartment", 
            featured: false 
        },
        { 
            id: 4, 
            name: "Country House", 
            price: 250000, 
            location: "Texas", 
            size: "2000 sqft", 
            bedrooms: 3, 
            bathrooms: 2, 
            tokenPrice: 25, 
            tokensLeft: 180, 
            type: "House", 
            rental: false, 
            image: "https://via.placeholder.com/300x200?text=Country+House", 
            featured: false 
        },
        { 
            id: 5, 
            name: "Luxury Estate", 
            price: 1000000, 
            location: "Florida", 
            size: "5000 sqft", 
            bedrooms: 6, 
            bathrooms: 5, 
            tokenPrice: 100, 
            tokensLeft: 50, 
            type: "Estate", 
            rental: false, 
            image: "https://via.placeholder.com/300x200?text=Luxury+Estate", 
            featured: false 
        },
    ];
    

    const [filters, setFilters] = useState({
        minPrice: "",
        maxPrice: "",
        location: "",
        minBedrooms: "",
        minBathrooms: "",
        minTokensLeft: "",
        maxTokenPrice: "",
        type: "",
        rental: "",
    });

    const [filteredHouses, setFilteredHouses] = useState(houses);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [activeQuickFilter, setActiveQuickFilter] = useState(null);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const applyFilters = () => {
        setFilteredHouses(
            houses.filter((house) => {
                const meetsMinPrice = filters.minPrice ? house.price >= parseInt(filters.minPrice, 10) : true;
                const meetsMaxPrice = filters.maxPrice ? house.price <= parseInt(filters.maxPrice, 10) : true;
                const meetsLocation = filters.location ? house.location.toLowerCase().includes(filters.location.toLowerCase()) : true;
                const meetsBedrooms = filters.minBedrooms ? house.bedrooms >= parseInt(filters.minBedrooms, 10) : true;
                const meetsBathrooms = filters.minBathrooms ? house.bathrooms >= parseInt(filters.minBathrooms, 10) : true;
                const meetsTokensLeft = filters.minTokensLeft ? house.tokensLeft >= parseInt(filters.minTokensLeft, 10) : true;
                const meetsTokenPrice = filters.maxTokenPrice ? house.tokenPrice <= parseInt(filters.maxTokenPrice, 10) : true;
                const meetsType = filters.type ? house.type.toLowerCase() === filters.type.toLowerCase() : true;
                const meetsRental = filters.rental ? house.rental === (filters.rental === "true") : true;

                return (
                    meetsMinPrice &&
                    meetsMaxPrice &&
                    meetsLocation &&
                    meetsBedrooms &&
                    meetsBathrooms &&
                    meetsTokensLeft &&
                    meetsTokenPrice &&
                    meetsType &&
                    meetsRental
                );
            })
        );
        setIsFilterVisible(false);
    };

    const handleQuickFilter = (filterType) => {
        let newFilters = { ...filters };
        if (filterType === "rental") newFilters.rental = "true";
        if (filterType === "sale") newFilters.rental = "false";
        if (filterType === "luxury") newFilters.minPrice = "500000";
        if (filterType === "apartments") newFilters.type = "Apartment";
        setFilters(newFilters);
        setActiveQuickFilter(filterType);
        applyFilters();
    };

    return (
        <div
            className={`
                min-h-screen
                w-full
                transition-colors
                duration-300
                overflow-y-auto
                ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}
            `}
        >
            <FilterBar />
            
            <div className="bg-gray-800 shadow-lg">
                <AlertSaveSearchBar />
                <hr className="border-gray-600 w-[98%] mx-auto my-1" />
                {/* Results bar */}
                <ResultsBar count={filteredHouses.length} />
            </div>

            <div className="bg-gradient-to-t from-gray-800 to-gray-900">
                <div className="p-4">
                    <KeywordDropdown />
                </div>
                <div className="px-10">
                    <HouseList houses={filteredHouses} />
                </div>
            </div>

        </div>
    );
};

export default HouseDisplay;
