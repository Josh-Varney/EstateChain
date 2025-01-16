import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import FilterControls from "./FilterControl";
import { FaSortDown } from "react-icons/fa";

type Filters = {
    propertyMinPrice: string;
    propertyMaxPrice: string;
    propertyLocation: string;
    propertySettlement: string;
    propertyMinBedrooms: string;
    propertyMinBathrooms: string;
    propertyMinTokensLeft: string;
    propertyMaxTokenPrice: string;
    propertyKeywords: string[]; 
    dontShowKeywords: string[]; 
    propertyAdded: string;
    propertyType: string;
    propertyRental: string;
};

type FilterBarProps = {
    darkMode: string;
    filters: Filters;
    onFilterChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, optionalParam?: string) => void;
};

const FilterBar: React.FC<FilterBarProps> = ({ darkMode, filters, onFilterChange }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [distanceFilter, setDistanceFilter] = useState<string>('10'); // Default to 10 miles
    const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
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

    const clearSearch = () => setSearchQuery("");

    const handlePostCodeSearch = async () => {
        if (!searchQuery) {
            alert("Please enter a location!");
            return;
        }

        const postcode = searchQuery.trim().toUpperCase().replace(/\s+/g, "");

        const selectedMetric = "miles";

        try {
            if (!searchQuery) {
                alert("Please enter a location!");
                return;
            }
        
            const response = await fetch(
                `http://localhost:3001/geoencode/search?postcode=${encodeURIComponent(searchQuery.trim())}`
            );
        
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const { longitude, latitude } = await response.json();

            console.log(longitude, latitude);

            // Update both longitude and latitude
            onFilterChange(
                { target: { name: "searchLocation", value: {longitude: longitude, latitude: latitude, selectedMetric: selectedMetric} } } as unknown as ChangeEvent<HTMLInputElement>
            );
            
        } catch (error) {
            console.error("Error fetching location data:", error);
            alert("Failed to fetch location data. Please try again.");
        }
    };

    const handleDistanceChange = (event: { target: { value: any; }; }) => {
        const newDistance = event.target.value;
        setDistanceFilter(newDistance);

        // If there's an active search, automatically execute it
        if (searchQuery) {
            handlePostCodeSearch();
        }
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
                            <option value="Option 1">+10 Miles</option>
                            <option value="Option 2">+20 Miles</option>
                            <option value="Option 3">+30 Miles</option>
                            <option value="Option 4">+50 Miles</option>
                            <option value="Option 5">Within Country</option>
                            <option value="Option 6">All Locations</option>
                        </select>
                    </div>
                </div>

                {/* Price Filter */}
                <div className="hidden md:flex flex-row space-x-2 items-center px-4 py-2 border-r border-gray-600">
                    <div>
                        <select
                            name="propertyMinPrice"
                            value={filters.propertyMinPrice}
                            onChange={onFilterChange}
                            className="text-sm border-gray-300 rounded-lg bg-transparent"
                        >
                            <option value="">Min Price</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                        </select>
                    </div>
                    <div className="text-gray-400 text-sm">to</div>
                    <div>
                        <select
                            name="propertyMaxPrice"
                            value={filters.propertyMaxPrice}
                            onChange={onFilterChange}
                            className="text-sm border-gray-300 rounded-lg bg-transparent"
                        >
                            <option value="">Max Price</option>
                            <option value="100">100</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                        </select>
                    </div>
                </div>

                {/* Bedroom Filter */}
                <div className="hidden lg:flex flex-row space-x-2 items-center px-4 py-2 border-r border-gray-600">
                    <div className="">
                        <select
                            name="propertyMinBedrooms"
                            value={filters.propertyMinBedrooms}
                            onChange={onFilterChange}
                            className="text-sm border-gray-300 rounded-lg bg-transparent"
                        >
                            <option value="">Min Beds</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div className="text-gray-400 text-sm">to</div>
                    <div className="">
                        <select
                            name="propertyMinBathrooms"
                            value={filters.propertyMinBathrooms}
                            onChange={onFilterChange}
                            className="text-sm border-gray-300 rounded-lg bg-transparent"
                        >
                            <option value="">Min Baths</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
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
                    />
                </div>
            )}
        </div>
    );
};

export default FilterBar;
