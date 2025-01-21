import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import FilterControls from "./FilterControl";
import { FaSortDown } from "react-icons/fa";

type Filters = {
    propertyMinPrice: string;
    propertyMaxPrice: string;
    propertyLocation: string;
    propertySettlement: string;
    propertyMinBedrooms: string;
    propertyMaxBedrooms: string;
    propertyMinBathrooms: string;
    propertyMaxBathrooms: string;
    propertyMinTokensLeft: string;
    propertyMaxTokensLeft: string;
    propertyMinTokenPrice: string;
    propertyMaxTokenPrice: string;
    propertyKeywords: string[]; 
    dontShowKeywords: string[]; 
    propertyAdded: string;
    propertyType: string;
    propertyRental: string;
};

type FilterBarProps = {
    darkMode: boolean;
    filters: Filters;
    onFilterChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, optionalParam?: string) => void;
    isOverlay?: boolean;
    closeOverlay?
};

const FilterBar: React.FC<FilterBarProps> = ({ darkMode, filters, onFilterChange, isOverlay, closeOverlay }) => {
    const [distanceFilter, setDistanceFilter] = useState<string>('10'); // Default to 10 miles
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedItems, setSelectedItems] = useState<string[]>(() => {
        const saved = localStorage.getItem("selectedItems");
        return saved ? JSON.parse(saved) : [];
    });

    // Local states for Must Haves and Don't Show selections
    const [mustHaveSelections, setMustHaveSelections] = useState<string[]>(filters.propertyKeywords || []);
    const [dontShowSelections, setDontShowSelections] = useState<string[]>(filters.dontShowKeywords || []);

    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    }, [selectedItems]);

    const handleFilterChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        onFilterChange(event); // Notify the parent handler
    };

     // Handle Must Haves selection toggle
     const handleMustHaveToggle = (item: string) => {
        const updatedSelections = mustHaveSelections.includes(item)
            ? mustHaveSelections.filter((i) => i !== item)
            : [...mustHaveSelections, item];

        setMustHaveSelections(updatedSelections);

        // Update parent filters state via onFilterChange
        onFilterChange({
            target: {
                name: "propertyKeywords",
                value: updatedSelections.join(","), // Pass as a comma-separated string
            },
        } as unknown as ChangeEvent<HTMLInputElement>);
    };

    // Handle Don't Show selection toggle
    const handleDontShowToggle = (item: string) => {
        const updatedSelections = dontShowSelections.includes(item)
            ? dontShowSelections.filter((i) => i !== item)
            : [...dontShowSelections, item];

        setDontShowSelections(updatedSelections);

        // Update parent filters state via onFilterChange
        onFilterChange({
            target: {
                name: "dontShowKeywords",
                value: updatedSelections.join(","), // Pass as a comma-separated string
            },
        } as unknown as ChangeEvent<HTMLInputElement>);
    };

    const clearSearch = () => {
        setSearchQuery(""); // Clear the search query
        setDistanceFilter("10"); // Reset the distance filter to its default value
    
        // Reset the search location filter in the parent component
        onFilterChange({
            target: {
                name: "searchLocation",
                value: {
                    longitude: null,
                    latitude: null,
                    metric: null,
                    distance: "10", // Reset distance to default value
                },
            },
        } as unknown as ChangeEvent<HTMLInputElement>);
    };

    async function getCountryFromLatLng(lat: any, lng: any) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_API_KEY}`;
        
        try {
          const response = await fetch(url);
          const data = await response.json();
      
          if (data.results && data.results.length > 0) {
            const countryComponent = data.results
              .flatMap((result: { address_components: any; }) => result.address_components)
              .find((component: { types: string | string[]; }) => component.types.includes('country'));
            
            return countryComponent ? countryComponent.long_name : 'Country not found';
          } else {
            return 'No results found';
          }
        } catch (error) {
          console.error('Error fetching country:', error);
          return 'Error fetching country';
        }
    }

    const handlePostCodeSearch = async (overrideDistance?: string) => {
        if (!searchQuery) {
            alert("Please enter a location!");
            return;
        }
    
        try {
            const response = await fetch(
                `http://localhost:3001/geoencode/search?postcode=${encodeURIComponent(searchQuery.trim())}`
            );
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            const { longitude, latitude } = await response.json();

            // Fetch the country name using the getCountryFromLatLng function
            const countryName = await getCountryFromLatLng(latitude, longitude);

            if (!countryName || countryName === 'Country not found') {
                throw new Error("Country could not be determined from the given coordinates.");
            }
    
            // Use the overrideDistance if provided, otherwise fallback to the current distanceFilter
            const effectiveDistance = overrideDistance || distanceFilter;
            let selectedDistance: string | number | null;
    
            if (effectiveDistance === "All Locations" || effectiveDistance === "Within Country") {
                selectedDistance = effectiveDistance;
            } else {
                const parsedDistance = parseInt(effectiveDistance, 10);
                if (!isNaN(parsedDistance)) {
                    selectedDistance = parsedDistance;
                } else {
                    throw new Error(
                        "Invalid distance value. Distance must be 'All Locations', 'Within Country', or a valid integer."
                    );
                }
            }
    
            // Update the parent component's filters
            onFilterChange({
                target: {
                    name: "searchLocation",
                    value: {
                        longitude,
                        latitude,
                        metric: "miles",
                        distance: selectedDistance,
                        country_from_search: countryName,
                    },
                },
            } as unknown as ChangeEvent<HTMLInputElement>);
        } catch (error) {
            console.error("Error fetching location data:", error);
            alert("Failed to fetch location data. Please try again.");
        }
    };
    

    const handleDistanceChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newDistance = event.target.value;
        setDistanceFilter(newDistance);
        handlePostCodeSearch(newDistance); // Use the updated distance immediately
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleFilterDropdown = () => {
        setIsFilterVisible((prev) => !prev);
    };

    const handleKeyPress = (e: { key: string; preventDefault: () => void; }) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission behavior
            handlePostCodeSearch();
        }
    };

    const priceFilterRef = useRef(null);
    const tokenPriceRef = useRef(null);
    const [isPriceFilterHidden, setIsPriceFilterHidden] = useState(false);
    const [isTokenPriceHidden, setIsTokenPriceHidden] = useState(false);

    const isElementHidden = (ref) => {
        if (!ref.current) return false;
        const { width, height } = ref.current.getBoundingClientRect();
        return width === 0 || height === 0;
    };

    useEffect(() => {
        const checkVisibility = () => {
            setIsPriceFilterHidden(isElementHidden(priceFilterRef));
            setIsTokenPriceHidden(isElementHidden(tokenPriceRef));
        };

        // Initial check
        checkVisibility();

        // Add resize listener
        window.addEventListener("resize", checkVisibility);

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener("resize", checkVisibility);
        };
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-wrap items-center gap-3 p-0 bg-gradient-to-b from-gray-800 to-gray-900">
                {/* Search Bar */}
                <div className="relative flex-grow border-gray-600 p-2 pr-4">
                    <div className="relative flex items-center bg-white border border-gray-300 rounded-lg shadow-sm">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyPress} // Listen for Enter key press
                            placeholder="Search a location..."
                            className="flex-grow px-4 py-1 text-sm rounded-l-lg focus:outline-none text-gray-400"
                        />
                        {searchQuery && (
                            <button
                                onClick={clearSearch}
                                className="px-2 py-1 text-gray-400 hover:text-red-500"
                            >
                                &#x2715;
                            </button>
                        )}
                        <select
                            className="px-4 py-2 text-sm bg-white border-l rounded-r-lg border-gray-300 text-gray-400 text-center"
                            value={distanceFilter}
                            onChange={handleDistanceChange}
                        >
                            <option value="10">+10 Miles</option>
                            <option value="20">+20 Miles</option>
                            <option value="30">+30 Miles</option>
                            <option value="50">+50 Miles</option>
                            <option value="Within Country">Within Country</option>
                            <option value="All Locations">All Locations</option>
                        </select>
                    </div>
                </div>

                

                {/* Bedroom Filter */}
                <div className="hidden lg:flex flex-row space-x-2 items-center px-4 py-2 border-r border-gray-600" ref={tokenPriceRef}>
                    <div className="">
                        <select
                            name="propertyMinTokenPrice"
                            value={filters.propertyMinTokenPrice}
                            onChange={onFilterChange}
                            className="text-sm border-gray-300 rounded-lg bg-transparent w-32"
                        >
                            <option value="">Min Token Price</option>
                            <option value="10">10+</option>
                            <option value="20">20+</option>
                            <option value="30">30+</option>
                            <option value="40">40+</option>
                            <option value="50">50+</option>
                            <option value="60">60+</option>
                            <option value="70">70+</option>
                            <option value="80">80+</option>
                            <option value="90">90+</option>
                            <option value="100">100+</option>
                        </select>
                    </div>
                    <div className="text-gray-400 text-sm">to</div>
                    <div className="">
                        <select
                            name="propertyMaxTokenPrice"
                            value={filters.propertyMaxTokenPrice}
                            onChange={onFilterChange}
                            className="text-sm border-gray-300 rounded-lg bg-transparent w-32"
                        >
                            <option value="">Max Token Price</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                            <option value="70">70</option>
                            <option value="80">80</option>
                            <option value="90">90</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>

                {/* Price Filter */}
                <div className="hidden md:flex flex-row space-x-2 items-center px-4 py-2 border-r border-gray-600" ref={priceFilterRef}>
                    <div>
                        <select
                            name="propertyMinPrice"
                            value={filters.propertyMinPrice}
                            onChange={onFilterChange}
                            className="text-sm border-gray-300 rounded-lg bg-transparent w-24"
                        >
                            <option value="">Min Price</option>
                            <option value="100000">£100,000+</option>
                            <option value="200000">£200,000+</option>
                            <option value="300000">£300,000+</option>
                            <option value="300000">£400,000+</option>
                            <option value="500000">£500,000+</option>
                            <option value="600000">£600,000+</option>
                            <option value="700000">£700,000+</option>
                            <option value="800000">£800,000+</option>
                            <option value="900000">£900,000+</option>
                            <option value="1000000">£1,000,000+</option>
                            <option value="1500000">£1,500,000+</option>
                            <option value="2000000">£2,000,000+</option>
                            <option value="5000000">£5,000,000+</option>
                            <option value="10000000">£10,000,000+</option>
                        </select>
                    </div>
                    <div className="text-gray-400 text-sm">to</div>
                    <div>
                        <select
                            name="propertyMaxPrice"
                            value={filters.propertyMaxPrice}
                            onChange={onFilterChange}
                            className="text-sm border-gray-300 rounded-lg bg-transparent w-24"
                        >
                            <option value="">Max Price</option>
                            <option value="100000">£100,000+</option>
                            <option value="200000">£200,000+</option>
                            <option value="300000">£300,000+</option>
                            <option value="300000">£400,000+</option>
                            <option value="500000">£500,000+</option>
                            <option value="600000">£600,000+</option>
                            <option value="700000">£700,000+</option>
                            <option value="800000">£800,000+</option>
                            <option value="900000">£900,000+</option>
                            <option value="1000000">£1,000,000+</option>
                            <option value="1500000">£1,500,000+</option>
                            <option value="2000000">£2,000,000+</option>
                            <option value="5000000">£5,000,000+</option>
                            <option value="10000000">£10,000,000+</option>
                        </select>
                    </div>
                </div>

                {/* Filter Button */}
                <div
                    onClick={toggleFilterDropdown}
                    className="px-4 py-2 flex flex-row space-x-1 cursor-pointer"
                >
                    <h1 className="text-sm">Filters</h1>
                    <FaSortDown />
                </div>
                
                {isOverlay && 
                    <>
                       <div
                            onClick={closeOverlay}
                            className="px-4 py-2 flex text-xs items-center justify-center space-x-2 cursor-pointer border-l border-gray-600 hover:text-red-500"
                            aria-label="Close"
                            title="Close"
                        >
                            <h1 className="text-base font-medium">Close</h1>
                            <span className="text-lg font-bold">×</span>
                        </div>
                                            
                    </>
                }
            </div>

            {/* Dropdown Filter Panel */}
            {isFilterVisible && (
                <div
                    ref={filterRef}
                    className={`absolute top-full left-0 w-full bg-white shadow-lg border border-gray-300 rounded-lg mt-1 z-50 transition-transform duration-300 ease-in-out transform ${isFilterVisible ? "scale-y-100" : "scale-y-0 origin-top"}`}
                >
                    <FilterControls
                        darkMode={darkMode}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        selectFilterChange={onFilterChange}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        handleMustHave={handleMustHaveToggle}
                        handleDontHave={handleDontShowToggle}
                        isPriceFilterHidden={isElementHidden(priceFilterRef)} // Pass price filter visibility
                        isTokenPriceFilterHidden={isElementHidden(tokenPriceRef)} // Pass bedroom filter visibility
                    />
                </div>
            )}
        </div>
    );
};

export default FilterBar;
