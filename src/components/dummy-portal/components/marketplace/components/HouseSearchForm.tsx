import React, { ChangeEvent, useEffect, useState } from "react";
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
    propertyKeywords: string[]; // Must Haves
    dontShowKeywords: string[]; // Don't Show
    propertyMinBedrooms: string;
    propertyMinBathrooms: string;
    propertyMinTokensLeft: string;
    propertyMaxTokenPrice: string;
    propertyAdded: string;
    propertyType: string;
    propertyRental: string;
};

type OnKeyWordChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    optionalParam?: string
) => void;

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
            propertyKeywords: ["pool", "parking", "retirement-home"],
            propertyPrice: 500000, 
            propertyLocation: "California", 
            propertySize: "3000 sqft", 
            propertyBedrooms: 4, 
            propertyBathrooms: 3, 
            propertyTokenPrice: 50, 
            propertyTokensLeft: 100, 
            propertyType: "Villa", 
            propertyRental: true, 
            propertyImage: "https://via.placeholder.com/300x200?text=Modern+Villa", 
            propertyFeatured: true 
        },
        { 
            id: 2, 
            propertyAddress: "Vowels Lane, East Grinstead, West Sussex, RH19", 
            propertySettlement: "Detatched",
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
            propertyWords: ["pool"],
            propertyLocation: "Maine", 
            propertySize: "1200 sqft", 
            propertyBedrooms: 2, 
            propertyBathrooms: 1, 
            propertyTokenPrice: 15, 
            propertyTokensLeft: 200, 
            propertyType: "Cottage", 
            propertyRental: false, 
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
            propertyKeywords: ["retirement-home"],
            propertyLocation: "New York", 
            propertySize: "900 sqft", 
            propertyBedrooms: 1, 
            propertyBathrooms: 1, 
            propertyTokenPrice: 30, 
            propertyTokensLeft: 150, 
            propertyType: "Apartment", 
            propertyRental: false, 
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
            propertyKeywords: ["buying-schemes"],
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
            propertySettlement: "Flat",
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
            propertyKeywords: ["action-property"],
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
        propertyKeywords: [], // Must Haves
        dontShowKeywords: [], // Don't Show
    });

    const [filteredHouses, setFilteredHouses] = useState(houses);

    useEffect(() => {
        window.localStorage.getItem("selectedFilters")
        window.localStorage.getItem("selectedMustHaves")
        window.localStorage.getItem("selectedDontShow")
    })

    useEffect(() => {
        applyFilters(filters);
    }, [filters]);

    // Debug if necessary 
    const handleFilterChange: OnKeyWordChange = (e, optionalParam ) => {
        const { name, value } = e.target;
        
        if (name === "propertyKeywords") {
            if (optionalParam === "saveKeyword") {
                // Save the keyword if it doesn't already exist in the array
                if (!filters.propertyKeywords.includes(value)) {
                    const updatedFilters = {
                        ...filters,
                        propertyKeywords: [...filters.propertyKeywords, value],
                    };
                    setFilters(updatedFilters);
                    applyFilters(updatedFilters);
                }
                console.log(value, "Keyword Saved");
                return;
            } 
            else if (optionalParam === "removeKeyword") {
                // Remove the keyword from the array
                const updatedFilters = {
                    ...filters,
                    propertyKeywords: filters.propertyKeywords.filter(
                        (keyword) => keyword !== value
                    ),
                };
                setFilters(updatedFilters);
                applyFilters(updatedFilters);
                console.log(value, "Keyword Removed");
                return;
            } 
            else {
                // Log the current state of keywords for debugging
            console.log("Current Keywords:", filters.propertyKeywords);

            // Normalize existing keywords to an array of strings
            const existingKeywords = Array.isArray(filters.propertyKeywords)
                ? [...filters.propertyKeywords.map((keyword) => String(keyword).trim())]
                : [];

            // Split and normalize incoming values (CSV or single string)
            const newValues = String(value)
                .split(',')
                .map((item) => item.trim())
                .filter((item) => item !== ""); // Exclude empty strings

                // Define the list of removable keywords
                const removableKeywords = [
                    "garden",
                    "parking",
                    "new-home",
                    "retirement-home",
                    "buying-schemes",
                    "auction-property",
                ];

                // Detect removed items only if they are part of the removableKeywords list
                const removedItems = existingKeywords.filter(
                    (keyword) => !newValues.includes(keyword) && removableKeywords.includes(keyword)
                );

                // Update the array by adding new values and removing deselected items
                let updatedKeywords = [...existingKeywords];

                // Add only new unique values
                newValues.forEach((newValue) => {
                    if (newValue && !updatedKeywords.includes(newValue)) {
                        updatedKeywords.push(newValue);
                    }
                });

                // Remove deselected items, but only from the removableKeywords list
                updatedKeywords = updatedKeywords.filter(
                    (keyword) => !removedItems.includes(keyword)
                );

                // Create the updated filters object
                const updatedFilters = {
                    ...filters,
                    propertyKeywords: updatedKeywords, // Ensure it's always an array of valid strings
                };

                // Update the filters state and apply the filters
                setFilters(updatedFilters);
                applyFilters(updatedFilters);
                return;
            }
        }
        const updatedFilters = {
            ...filters,
            [name]: value,
        };
    
        setFilters(updatedFilters);
        applyFilters(updatedFilters); // Apply the updated filters to the list
    };
    

    const applyFilters = (currentFilters = filters) => {
        setFilteredHouses(
            houses.filter((house) => {
                const meetsMinPrice = currentFilters.propertyMinPrice
                    ? house.propertyPrice >= parseInt(currentFilters.propertyMinPrice, 10)
                    : true;
    
                const meetsMaxPrice = currentFilters.propertyMaxPrice
                    ? house.propertyPrice <= parseInt(currentFilters.propertyMaxPrice, 10)
                    : true;
    
                const meetsLocation = currentFilters.propertyLocation
                    ? house.propertyLocation
                          ?.toLowerCase()
                          .includes(currentFilters.propertyLocation.toLowerCase())
                    : true;
                const meetsBedrooms = currentFilters.propertyMinBedrooms
                    ? house.propertyBedrooms >= parseInt(currentFilters.propertyMinBedrooms, 10)
                    : true;
    
                const meetsBathrooms = currentFilters.propertyMinBathrooms
                    ? house.propertyBathrooms >= parseInt(currentFilters.propertyMinBathrooms, 10)
                    : true;
    
                const meetsTokensLeft = currentFilters.propertyMinTokensLeft
                    ? house.propertyTokensLeft >= parseInt(currentFilters.propertyMinTokensLeft, 10)
                    : true;
    
                const meetsTokenPrice = currentFilters.propertyMaxTokenPrice
                    ? house.propertyTokenPrice <= parseInt(currentFilters.propertyMaxTokenPrice, 10)
                    : true;
    
                const meetsRental = currentFilters.propertyRental
                    ? (currentFilters.propertyRental.toLowerCase() === "rent" && house.propertyRental) ||
                      (currentFilters.propertyRental.toLowerCase() === "buy" && !house.propertyRental)
                    : true;
    
                const meetsPropertyAdded = currentFilters.propertyAdded
                    ? new Date(house.propertyAdded || "") >= new Date(currentFilters.propertyAdded)
                    : true;
    
                
                const meetsType = Array.isArray(currentFilters.propertySettlement) && currentFilters.propertySettlement.length > 0
                    ? currentFilters.propertySettlement
                          .map((type: string) => type.toLowerCase().trim()) // Normalize filter array items
                          .includes(house.propertySettlement?.toLowerCase() || "") // Normalize house property for comparison
                    : true; // Show all if no filters are selected
                    
                
                
                return (
                    meetsMinPrice &&
                    meetsMaxPrice &&
                    meetsLocation &&
                    meetsBedrooms &&
                    meetsBathrooms &&
                    meetsTokensLeft &&
                    meetsTokenPrice &&
                    meetsType &&
                    meetsRental &&
                    meetsPropertyAdded 
                );
            })
        );
    };
    
    
    
    return (
        <div
            className={`
                min-h-screen
                h-screen
                w-full
                transition-colors
                duration-300
                overflow-y-auto
                pb-12
                ${darkMode ? "bg-gradient-to-t from-gray-800 to-gray-900 text-white" : "bg-gray-100 text-black"}
            `}
        >
            <FilterBar
                darkMode={darkMode}
                filters={filters}
                onFilterChange={handleFilterChange}
            />
            
            <div className="bg-gray-800 shadow-lg">
                <AlertSaveSearchBar />
                <hr className="border-gray-600 w-[98%] mx-auto my-1" />
                {/* Results bar */}
                <ResultsBar count={filteredHouses.length} />
            </div>

            <div className="pb-16">
                <div className="p-4">
                    <KeywordDropdown onKeyWordChange={handleFilterChange} />
                </div>
                <div className="px-10">
                    <HouseList houses={filteredHouses} />
                </div>
            </div>

        </div>
    );
};

export default HouseDisplay;