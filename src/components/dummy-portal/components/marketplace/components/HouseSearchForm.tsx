import React, { useState } from "react";
import HouseList from "./HouseList";
import FilterBar from "./FilterBar";
import AlertSaveSearchBar from "./AltertSaveSearchBar";
import ResultsBar from "./ResultsFoundBar";
import KeywordDropdown from "./KeywordDropdown";


type Filters = {
    propertyMinPrice: string;
    propertyMaxPrice: string;
    propertyLocation: string;
    propertySettlement: string;
    propertyMinBedrooms: string;
    propertyMinBathrooms: string;
    propertyMinTokensLeft: string;
    propertyMaxTokenPrice: string;
    propertyAdded: string;
    propertyType: string;
    propertyRental: string;
};

const HouseDisplay = ({ darkMode }) => {
    const houses = [
        { 
            id: 1, 
            propertyAddress: "West Hill, East Grinstead", 
            propertySettlement: "Detatched",
            propertyDescription: "Experience the pinnacle of city living in this sleek, 2-bedroom, 2-bathroom luxury apartment in the heart of downtown. Boasting floor-to-ceiling windows with panoramic skyline views, a state-of-the-art kitchen with quartz countertops, and access to exclusive amenities including a rooftop pool, fitness center, and concierge services.",
            propertyAdded: "07/05/2024",
            propertyAddedBy: "Jackson-Stops",
            propertyAgent: {
                agentName: "Jackson-Stops",
                agentIcon: "",
                agentNumber: "07469751962",
                agentEmail: "jrv123756@gmail.com",
            },
            propertyWords: ["pool"],
            propertyPrice: 500000, 
            propertyLocation: "California", 
            propertySize: "3000 sqft", 
            propertyBedrooms: 4, 
            propertyBathrooms: 3, 
            propertyTokenPrice: 50, 
            propertyTokensLeft: 100, 
            propertyType: "Villa", 
            propertyRental: false, 
            propertyImage: "https://via.placeholder.com/300x200?text=Modern+Villa", 
            propertyFeatured: true 
        },
        { 
            id: 2, 
            propertyAddress: "Vowels Lane, East Grinstead, West Sussex, RH19", 
            propertySettlement: "Semi-Detatched",
            propertyDescription: "Escape to tranquility with this enchanting 4-bedroom, 3-bathroom country home situated on 10 sprawling acres. Featuring a cozy stone fireplace, hardwood floors throughout, and a wraparound porch with breathtaking views of rolling hills",
            propertyAdded: "07/05/2024",
            propertyAddedBy: "Jackson-Stops",
            propertyAgent: {
                agentName: "Jackson-Stops",
                agentIcon: "",
                agentNumber: "07469751962",
                agentEmail: "jrv123756@gmail.com",
            },
            propertyPrice: 150000, 
            propertyLocation: "Maine", 
            propertySize: "1200 sqft", 
            propertyBedrooms: 2, 
            propertyBathrooms: 1, 
            propertyTokenPrice: 15, 
            propertyTokensLeft: 200, 
            propertyType: "Cottage", 
            propertyRental: true, 
            propertyImage: "https://via.placeholder.com/300x200?text=Cozy+Cottage", 
            propertyFeatured: true 
        },
        { 
            id: 3, 
            propertyAddress: "Legsheath Lane, Forest Row, RH19", 
            propertySettlement: "Detatched",
            propertyDescription: "Wake up to the sound of waves in this delightful 2-bedroom, 1-bathroom beachfront bungalow. With its bright and airy design, this home features a fully equipped kitchen, a sun-soaked living room, and a private deck overlooking the ocean.",
            propertyAdded: "07/05/2024",
            propertyAddedBy: "Jackson-Stops",
            propertyAgent: {
                agentName: "Jackson-Stops",
                agentIcon: "",
                agentNumber: "07469751962",
                agentEmail: "jrv123756@gmail.com",
            },
            propertyPrice: 300000, 
            propertyLocation: "New York", 
            propertySize: "900 sqft", 
            propertyBedrooms: 1, 
            propertyBathrooms: 1, 
            propertyTokenPrice: 30, 
            propertyTokensLeft: 150, 
            propertyType: "Apartment", 
            propertyRental: true, 
            propertyImage: "https://via.placeholder.com/300x200?text=Urban+Apartment", 
            propertyFeatured: false 
        },
        { 
            id: 4, 
            propertyAddress: "Country House", 
            propertySettlement: "Terrace",
            propertyDescription: "Discover the perfect blend of style and convenience in this 3-bedroom, 2.5-bathroom modern townhouse.",
            propertyAddedBy: "Jackson-Stops",
            propertyAgent: {
                agentName: "Jackson-Stops",
                agentIcon: "",
                agentNumber: "07469751962",
                agentEmail: "jrv123756@gmail.com",
            },
            propertyPrice: 250000, 
            propertyLocation: "Texas", 
            propertySize: "2000 sqft", 
            propertyBedrooms: 3, 
            propertyBathrooms: 2, 
            propertyTokenPrice: 25, 
            propertyTokensLeft: 180, 
            propertyType: "House", 
            propertyRental: false, 
            propertyImage: "https://via.placeholder.com/300x200?text=Country+House", 
            propertyFeatured: false 
        },
        { 
            id: 5, 
            propertyAddress: "Dormans Park", 
            propertySettlement: "Detatched",
            propertyDescription: "Discover the perfect blend of style and convenience in this 3-bedroom, 2.5-bathroom modern townhouse.",
            propertyAdded: "07/05/2024",
            propertyAddedBy: "Jackson-Stops",
            propertyAgent: {
                agentName: "Jackson-Stops",
                agentIcon: "",
                agentNumber: "07469751962",
                agentEmail: "jrv123756@gmail.com",
            },
            propertyPrice: 1000000, 
            propertyLocation: "Florida", 
            propertySize: "5000 sqft", 
            propertyBedrooms: 6, 
            propertyBathrooms: 5, 
            propertyTokenPrice: 100, 
            propertyTokensLeft: 50, 
            propertyType: "Estate", 
            propertyRental: false, 
            propertyImage: "https://via.placeholder.com/300x200?text=Luxury+Estate", 
            propertyFeatured: false 
        },
    ];
    

    const [filters, setFilters] = useState<Filters>({
        propertyMinPrice: "",
        propertyMaxPrice: "",
        propertyLocation: "",
        propertySettlement: "",
        propertyAdded: "",
        propertyMinBedrooms: "",
        propertyMinBathrooms: "",
        propertyMinTokensLeft: "",
        propertyMaxTokenPrice: "",
        propertyType: "",
        propertyRental: "",
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
                const meetsMinPrice = filters.propertyMinPrice ? house.propertyPrice >= parseInt(filters.propertyMinPrice, 10) : true;
                const meetsMaxPrice = filters.propertyMaxPrice ? house.propertyPrice <= parseInt(filters.propertyMaxPrice, 10) : true;
                const meetsLocation = filters.propertyLocation ? house.propertyLocation.toLowerCase().includes(filters.propertyLocation.toLowerCase()) : true;
                const meetsBedrooms = filters.propertyMinBedrooms ? house.propertyBedrooms >= parseInt(filters.propertyMinBedrooms, 10) : true;
                const meetsBathrooms = filters.propertyMinBathrooms ? house.propertyBathrooms >= parseInt(filters.propertyMinBathrooms, 10) : true;
                const meetsTokensLeft = filters.propertyMinTokensLeft ? house.propertyTokensLeft >= parseInt(filters.propertyMinTokensLeft, 10) : true;
                const meetsTokenPrice = filters.propertyMaxTokenPrice ? house.propertyTokenPrice <= parseInt(filters.propertyMaxTokenPrice, 10) : true;
                const meetsType = filters.propertyType ? house.propertyType.toLowerCase() === filters.propertyType.toLowerCase() : true;
                const meetsSettlement = filters.propertySettlement ? house.propertySettlement.toLowerCase() === filters.propertySettlement.toLowerCase() : true;
                const meetsRental = filters.propertyRental ? house.propertyRental === (filters.propertyRental === "true") : true;
    
                const meetsPropertyAdded = filters.propertyAdded
                    ? new Date(house.propertyAdded || "") >= new Date(filters.propertyAdded)
                    : true;
    
                return (
                    meetsMinPrice &&
                    meetsMaxPrice &&
                    meetsLocation &&
                    meetsBedrooms &&
                    meetsBathrooms &&
                    meetsTokensLeft &&
                    meetsTokenPrice &&
                    meetsType &&
                    meetsSettlement &&
                    meetsRental &&
                    meetsPropertyAdded
                );
            })
        );
        setIsFilterVisible(false);
    };
    

    const handleQuickFilter = (filterType) => {
        let newFilters = { ...filters };
        if (filterType === "rental") newFilters.propertyRental = "true";
        if (filterType === "sale") newFilters.propertyRental = "false";
        if (filterType === "luxury") newFilters.propertyMinPrice = "500000";
        if (filterType === "apartments") newFilters.propertyType = "Apartment";
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
            <FilterBar
                darkMode={darkMode}
                filters={filters}
                setFilters={setFilters}
            />
            
            <div className="bg-gray-800 shadow-lg">
                <AlertSaveSearchBar />
                <hr className="border-gray-600 w-[98%] mx-auto my-1" />
                {/* Results bar */}
                <ResultsBar count={houses.length} />
            </div>

            <div className="bg-gradient-to-t from-gray-800 to-gray-900">
                <div className="p-4">
                    <KeywordDropdown />
                </div>
                <div className="px-10">
                    <HouseList houses={houses} />
                </div>
            </div>

        </div>
    );
};

export default HouseDisplay;