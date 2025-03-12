import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import HouseList from "./HouseList";
import FilterBar from "./FilterBar";
import AlertSaveSearchBar from "./AltertSaveSearchBar";
import ResultsBar from "./ResultsFoundBar";
import KeywordDropdown from "./KeywordDropdown";

type SearchLocation = {
    latitude: number;
    longitude: number;
    metric: "miles" | "km";
    distance: number | "Within Country" | "All Locations";
    country_from_search: string;
};

type Filters = {
    propertyMinPrice: string;
    propertyMaxPrice: string;
    propertyLocation: string;
    propertySettlement: string;
    propertyKeywords: string[]; // Must Haves
    dontShowKeywords: string[]; // Don't Show
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
    searchLocation: SearchLocation | null;
};

type OnKeyWordChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    optionalParam?: string
) => void;

const HouseDisplay = ({ darkMode }) => {
    
    const [houses, setHouses] = useState<House[]>([]); 
    const [filteredHouses, setFilteredHouses] = useState<House[]>(houses);
    const [sortBy, setSortBy] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState<string | null>(null); // Error state for fetching issues

    const [filters, setFilters] = useState<Filters>({
        propertyMinPrice: "",
        propertyMaxPrice: "",
        propertyLocation: "",
        propertySettlement: "",
        propertyAdded: "",
        propertyMinBedrooms: "",
        propertyMaxBedrooms: "",
        propertyMinBathrooms: "",
        propertyMaxBathrooms: "",
        propertyMinTokensLeft: "",
        propertyMaxTokensLeft: "",
        propertyMinTokenPrice: "",
        propertyMaxTokenPrice: "",
        propertyType: "",
        propertyRental: "",
        searchLocation: null, // Ensure explicitly set to null
        propertyKeywords: [], // Must Haves
        dontShowKeywords: [], // Don't Show
    });
    
    const handleSortChange = (value: string) => {
        setSortBy(value);
    };

    // Fetch houses only once when the component mounts
    useEffect(() => {
            // Function to convert the data
            const convertToHouseList = (data: any[]): House[] => {
                return data.map(property => ({
                  id: property.propertyID,
                  propertyAddress: property.propertyAddress,
                  propertySettlement: property.propertySettlement,
                  propertyDescription: property.propertyDescription,
                  propertyAdded: new Date().toISOString(), // Current date as the "added" date
                  propertyAddedBy: property.propertyAddedBy,
                  propertyAgent: {
                    agentName: property.agentName || "Unknown Agent",
                    agentIcon: property.agentIcon || "default-icon-url",
                    agentNumber: property.agentContactNumber || "Not Provided",
                    agentEmail: property.agentEmail || "Not Provided",
                    agentAddress: property.agentAddress || "Not Provided",
                    agentSoldRecentlyDescription: property.agentSoldRecentlyDescription || "Not Provided",
                    agentWhyDescription: property.agentWhyDescription || "Not Provided",
                  },
                  propertyKeywords: property.propertyKeywords.split(","), // Assuming keywords are comma-separated
                  propertyPrice: property.propertyPrice,
                  propertyLocation: {
                    latitude: parseFloat(property.propertyGeoLat),
                    longitude: parseFloat(property.propertyGeoLong)
                  },
                  propertyCountry: property.propertyCountry,
                  propertySize: property.propertySize,
                  propertyBedrooms: property.propertyBedrooms,
                  propertyBathrooms: property.propertyBathrooms,
                  propertyTokenPrice: property.propertyTokenPrice,
                  propertyTokensLeft: property.propertyTokensLeft,
                  propertyType: property.propertyType,
                  propertyPostcode: property.propertyPostcode,
                  propertyRental: property.propertyRental,
                  propertyImage: property.propertyImage,
                  propertyFeatured: property.propertyFeatured,
                  propertyGarden: property.propertyGarden || false, // Ensure a default value
                  propertyAcessibility: property.propertyAcessibility || false, // Ensure a default value
                  propertyKeyFeatures: property.propertyKeyFeatures ? property.propertyKeyFeatures.split(",") : [], // Ensure a default empty array if undefined
                  propertyTenure: property.propertyTenure || "Unknown", // Default to "Unknown" if missing
                  propertyValue: property.pValuation,
                  propertyTotalTokens: property.pTotalTokens,
                  propertySmartAddress: property.pSmartAddress,
                  propertyRentalDistributionExpectancy: property.rentalDistributionExpectancy,
                  propertyChainType: property.bType,
                  propertyChainCurrency: property.bCurrency,
                  propertyContractName: property.contractName
                }));
        };
        

        const fetchHouses = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/getProperties");
                // console.log("Response Status:", response.status); // Log status code
                const responseBody = await response.text(); // Get the raw response body
                // console.log("Raw Response Body:", responseBody); // Log the raw response

            
        
                if (response.ok) {
                    const data = JSON.parse(responseBody); // Parse the response body
                    // console.log("Parsed Data:", data); // Check the structure of the parsed data
                    // Ensure the data has the 'properties' field and it's an array
                    if (data) {
                        const houses = convertToHouseList(data);
                        setHouses(houses); // Update state with the properties
                        setFilteredHouses(houses);

                        console.log(houses);
                        // console.log("houses:", houses);
                    } else {
                        setError("No properties found in response.");
                        console.error("Properties key not found or is empty.");
                    }
                } else {
                    setError(`Failed to fetch houses: ${response.status} - ${responseBody}`);
                }
            } catch (error) {
                setError(`Error fetching houses: ${error.message}`);
                console.error("Error fetching houses:", error);
            } finally {
                setLoading(false);
            }
        };        

        fetchHouses();
    }, []); 

    useEffect(() => {
        applyFilters(filters);
    }, [filters]);

    useEffect(() => {
        applySorting(); // Sort the houses
    }, [sortBy]); // Only run when `sortBy` changes

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

    function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number, unit: 'miles' | 'km' = 'miles'): number {
        /**
         * Calculate the great-circle distance between two points
         * on the Earth's surface using the Haversine formula.
         *
         * Parameters:
         *     lat1, lon1: Latitude and longitude of point 1 (in degrees)
         *     lat2, lon2: Latitude and longitude of point 2 (in degrees)
         *     unit: Unit of distance ('miles' or 'km'). Defaults to 'miles'.
         *
         * Returns:
         *     Distance between the two points in the specified unit.
         */
    
        // Convert latitude and longitude from degrees to radians
        const toRadians = (degrees: number) => degrees * (Math.PI / 180);
        lat1 = toRadians(lat1);
        lon1 = toRadians(lon1);
        lat2 = toRadians(lat2);
        lon2 = toRadians(lon2);
    
        // Haversine formula
        const dlat = lat2 - lat1;
        const dlon = lon2 - lon1;
        const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        // Radius of Earth
        const radiusOfEarthInMiles = 3958.8;
        const radiusOfEarthInKm = 6371.0;
        const radiusOfEarth = unit === 'miles' ? radiusOfEarthInMiles : radiusOfEarthInKm;
    
        return radiusOfEarth * c;
    }
    
    function arePointsWithinDistance(
        point1: { latitude: number; longitude: number },
        point2: { latitude: number; longitude: number },
        distance: number,
        unit: 'miles' | 'km' = 'miles'
    ): boolean {
        /**
         * Determine if two points are within a given distance.
         *
         * Parameters:
         *     point1: Object with 'latitude' and 'longitude' keys for the first point.
         *     point2: Object with 'latitude' and 'longitude' keys for the second point.
         *     distance: Distance to check.
         *     unit: Unit of distance ('miles' or 'km'). Defaults to 'miles'.
         *
         * Returns:
         *     True if the points are within the specified distance, False otherwise.
         */
        const { latitude: lat1, longitude: lon1 } = point1;
        const { latitude: lat2, longitude: lon2 } = point2;
    
        const calculatedDistance = haversineDistance(lat1, lon1, lat2, lon2, unit);
        return calculatedDistance <= distance;
    }
    
    const applyFilters = (currentFilters = filters) => {
        setFilteredHouses(
            houses.filter((house) => {
                const meetsMinPrice = currentFilters.propertyMinPrice
                    ? house.propertyPrice >= parseInt(currentFilters.propertyMinPrice, 10)
                    : true;
    
                const meetsMaxPrice = currentFilters.propertyMaxPrice
                    ? house.propertyPrice <= parseInt(currentFilters.propertyMaxPrice, 10)
                    : true;

                const meetsMinBedrooms = currentFilters.propertyMinBedrooms
                    ? house.propertyBedrooms >= parseInt(currentFilters.propertyMinBedrooms, 10)
                    : true;
    
                const meetsMaxBedrooms = currentFilters.propertyMaxBedrooms
                    ? house.propertyBedrooms <= parseInt(currentFilters.propertyMaxBedrooms, 10)
                    : true;
    
                const meetsMinBathrooms = currentFilters.propertyMinBathrooms
                    ? house.propertyBathrooms >= parseInt(currentFilters.propertyMinBathrooms, 10)
                    : true;

                const meetsMaxBathrooms = currentFilters.propertyMaxBathrooms
                    ? house.propertyBathrooms <= parseInt(currentFilters.propertyMaxBathrooms, 10)
                    : true;
    
                const meetsMinTokenPrice = currentFilters.propertyMinTokenPrice
                    ? house.propertyTokenPrice >= parseInt(currentFilters.propertyMinTokenPrice, 10)
                    : true;
    
                const meetsMaxTokenPrice = currentFilters.propertyMaxTokenPrice
                    ? house.propertyTokenPrice <= parseInt(currentFilters.propertyMaxTokenPrice, 10)
                    : true;

                const meetsMinTokensLeft = currentFilters.propertyMinTokensLeft
                    ? house.propertyTokensLeft >= parseInt(currentFilters.propertyMaxTokensLeft, 10)
                    : true;
    
                const meetsMaxTokensLeft = currentFilters.propertyMaxTokensLeft
                    ? house.propertyTokensLeft <= parseInt(currentFilters.propertyMaxTokensLeft, 10)
                    : true;
    
                const meetsRental = currentFilters.propertyRental
                    ? (currentFilters.propertyRental.toLowerCase() === "rent" && house.propertyRental) ||
                      (currentFilters.propertyRental.toLowerCase() === "buy" && !house.propertyRental)
                    : true;
    
                
                const meetsType = Array.isArray(currentFilters.propertySettlement) && currentFilters.propertySettlement.length > 0
                    ? currentFilters.propertySettlement
                          .map((type: string) => type.toLowerCase().trim()) // Normalize filter array items
                          .includes(house.propertySettlement?.toLowerCase() || "") // Normalize house property for comparison
                    : true; // Show all if no filters are selected

                
                const meetsKeywords = currentFilters.propertyKeywords && Array.isArray(house.propertyKeywords)
                    ? currentFilters.propertyKeywords.every((keyword) =>
                          (house.propertyKeywords || []).map((kw) => kw.toLowerCase().trim()).includes(keyword.toLowerCase().trim())
                      )
                    : true; // Show all if no keywords are provided

                const avoidsDontShowKeywords = currentFilters.dontShowKeywords && Array.isArray(house.propertyKeywords)
                    ? currentFilters.dontShowKeywords.every((keyword) =>
                          !(house.propertyKeywords || []).map((kw) => kw.toLowerCase().trim()).includes(keyword.toLowerCase().trim())
                      )
                    : true; // Show all if no "dontShowKeywords" are provided

                // Check if the property is within the desired distance
                const withinDistance = currentFilters.searchLocation &&
                    currentFilters.searchLocation.latitude !== null &&
                    currentFilters.searchLocation.longitude !== null &&
                    house.propertyLocation &&
                    house.propertyLocation.latitude !== null &&
                    house.propertyLocation.longitude !== null
                    ? (() => {
                        if (currentFilters.searchLocation.distance === "All Locations") {
                            // Display all properties
                            return true;
                        } else if (currentFilters.searchLocation.distance === "Within Country") {
                            return currentFilters.searchLocation.country_from_search === house.propertyCountry;
                        } else if (typeof currentFilters.searchLocation.distance === "number") {
                            // Use the selected distance in miles or km
                            return arePointsWithinDistance(
                                {
                                    latitude: currentFilters.searchLocation.latitude,
                                    longitude: currentFilters.searchLocation.longitude,
                                },
                                {
                                    latitude: house.propertyLocation.latitude,
                                    longitude: house.propertyLocation.longitude,
                                },
                                currentFilters.searchLocation.distance, // Dynamic distance value
                                currentFilters.searchLocation.metric, // Default to miles if metric not specified
                            );
                        } else {
                            // If distance is invalid, default to displaying all
                            return true;
                        }
                    })()
                    : true; // If any location is invalid, show all properties


                const meetsPropertyAdded = (() => {
                    if (!currentFilters.propertyAdded) return true; // No filter applied

                    const propertyAddedDate = new Date(house.propertyAdded);
                    
                    console.log("Parsed Date:", propertyAddedDate);
                    if (isNaN(propertyAddedDate.getTime())) {
                        console.error("Invalid propertyAdded date:", house.propertyAdded);
                        return false;
                    }
                    const now = new Date();

                    if (isNaN(propertyAddedDate.getTime())) {
                        console.error("Invalid date format:", house.propertyAdded);
                        return false; // Skip invalid dates
                    }
                
                    // Check "last 24 hours"
                    if (currentFilters.propertyAdded === "last24hours") {
                        const oneDayAgo = new Date(now);
                        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
                        return propertyAddedDate >= oneDayAgo;
                    }
                
                    // Check "last 7 days"
                    if (currentFilters.propertyAdded === "last7days") {
                        const sevenDaysAgo = new Date(now);
                        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                        return propertyAddedDate >= sevenDaysAgo;
                    }
                
                    // Check "last month"
                    if (currentFilters.propertyAdded === "lastmonth") {
                        const oneMonthAgo = new Date(now);
                        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                        return propertyAddedDate >= oneMonthAgo;
                    }
                
                    return true; // Default to showing all
                })();
                
                console.log(currentFilters.propertyAdded);
                console.log(house.propertyAdded);

                return (
                    meetsMinPrice &&
                    meetsMaxPrice &&
                    meetsMinBedrooms &&
                    meetsMaxBedrooms &&
                    meetsMinBathrooms &&
                    meetsMaxBathrooms &&
                    meetsMinTokenPrice &&
                    meetsMaxTokenPrice &&
                    meetsType &&
                    meetsRental &&
                    meetsPropertyAdded &&
                    meetsMinTokensLeft &&
                    meetsMaxTokensLeft &&
                    meetsKeywords &&
                    avoidsDontShowKeywords && 
                    withinDistance && 
                    meetsPropertyAdded
                );
            })
        );
    };

    const applySorting = () => {
        const sortedHouses = [...filteredHouses];
        switch (sortBy) {
            case "priceAsc":
                sortedHouses.sort((a, b) => a.propertyPrice - b.propertyPrice);
                break;
            case "priceDesc":
                sortedHouses.sort((a, b) => b.propertyPrice - a.propertyPrice);
                break;
            case "bedroomsAsc":
                sortedHouses.sort((a, b) => a.propertyBedrooms - b.propertyBedrooms);
                break;
            case "bedroomsDesc":
                sortedHouses.sort((a, b) => b.propertyBedrooms - a.propertyBedrooms);
                break;
            case "tokenPriceAsc":
                sortedHouses.sort((a, b) => a.propertyTokenPrice - b.propertyTokenPrice);
                break;
            case "tokenPriceDesc":
                sortedHouses.sort((a, b) => b.propertyTokenPrice - a.propertyTokenPrice);
                break;
            case "tokensLeftAsc":
                sortedHouses.sort((a, b) => a.propertyTokensLeft - b.propertyTokensLeft);
                break;
            case "tokensLeftDesc":
                sortedHouses.sort((a, b) => b.propertyTokensLeft - a.propertyTokensLeft);
                break;
            case "dateAddedAsc":
                sortedHouses.sort(
                    (a, b) => new Date(a.propertyAdded).getTime() - new Date(b.propertyAdded).getTime()
                );
                break;
            case "dateAddedDesc":
                sortedHouses.sort(
                    (a, b) => new Date(b.propertyAdded).getTime() - new Date(a.propertyAdded).getTime()
                );
                break;
            default:
                break;
        }

        setFilteredHouses(sortedHouses);
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
                // setSearchQuery={setSearchQuery}
            />
            
            <div className="bg-gray-800 shadow-lg">
                <AlertSaveSearchBar />
                <hr className="border-gray-600 w-[98%] mx-auto my-1" />
                {/* Results bar */}
                <ResultsBar count={filteredHouses.length} onSortChange={handleSortChange} darkMode={darkMode} filters={filters} onFilterChange={handleFilterChange} filteredHouses={filteredHouses} searchLocation={filters.searchLocation}/>
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