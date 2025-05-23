import React, { ChangeEvent, useState } from "react";
import { FaHome, FaBuilding, FaTree, FaWarehouse } from "react-icons/fa";

interface Filters {
    propertyMinPrice: string;
    propertyMaxPrice: string;
    propertyLocation: string;
    propertyAdded: string;
    propertyMinBedrooms: string;
    propertyMaxBedrooms: string;
    propertyMinBathrooms: string;
    propertyMaxBathrooms: string;
    propertyMinTokensLeft: string;
    propertyMaxTokenPrice: string;
    propertyMaxTokensLeft: string;
    propertyMinTokenPrice: string;
    propertyKeywords: string[]; 
    dontShowKeywords: string[]; 
    propertyType: string;
    propertyRental: string;
}

interface FilterControlsProps {
    filters: Filters;
    onFilterChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    selectFilterChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    darkMode: boolean;
    selectedItems: string[]; // Added this prop
    setSelectedItems: (items: string[]) => void; // Added this prop
    handleMustHave: (item: string) => void;
    handleDontHave: (item: string) => void;
    isPriceFilterHidden: boolean;
    isTokenPriceFilterHidden: boolean;
}

const FilterControls: React.FC<FilterControlsProps> = ({ filters, onFilterChange, selectFilterChange, isPriceFilterHidden, isTokenPriceFilterHidden }) => {
    // const DEBUG = true;
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [mustHaveItems, setMustHaveItems] = useState<string[]>([]);
    const [dontShowItems, setDontShowItems] = useState<string[]>([]);

    const propertyTypes = [
        { id: "detatched", label: "Detatched", icon: <FaHome size={30} /> },
        { id: "semi-detached", label: "Semi-Detatched", icon: <FaHome size={30} /> },
        { id: "terrace", label: "Terraced", icon: <FaWarehouse size={30} /> },
        { id: "flat", label: "Flat", icon: <FaBuilding size={30} /> },
        { id: "bungalow", label: "Bungalow", icon: <FaHome size={30} /> },
        { id: "land", label: "Land", icon: <FaTree size={30} /> },
        { id: "park-home", label: "Park Home", icon: <FaHome size={30} /> },
    ];

    const toggleSelection = (
        id: string,
        category: "mustHave" | "dontShow" | "propertyType"
    ) => {
        let updatedSelections: string[];
    
        if (category === "mustHave") {
            updatedSelections = mustHaveItems.includes(id)
                ? mustHaveItems.filter((item) => item !== id) // Remove item if already selected
                : [...mustHaveItems, id]; // Add item if not selected
            setMustHaveItems(updatedSelections);
            localStorage.setItem("selectedMustHaves", JSON.stringify(updatedSelections));
    
            // if (DEBUG) {
            //     console.log(`Must Have Item Clicked: ${id}`);
            //     console.log("Updated Must Have Items:", updatedSelections);
            // }
        } else if (category === "dontShow") {
            updatedSelections = dontShowItems.includes(id)
                ? dontShowItems.filter((item) => item !== id) // Remove item if already selected
                : [...dontShowItems, id]; // Add item if not selected
            setDontShowItems(updatedSelections);
            localStorage.setItem("selectedDontShow", JSON.stringify(updatedSelections));
    
            // if (DEBUG) {
            //     console.log(`Don't Show Item Clicked: ${id}`);
            //     console.log("Updated Don't Show Items:", updatedSelections);
            // }
        } else {
            updatedSelections = selectedItems.includes(id)
                ? selectedItems.filter((item) => item !== id) // Remove item if already selected
                : [...selectedItems, id]; // Add item if not selected
            setSelectedItems(updatedSelections);
            localStorage.setItem("selectedFilters", JSON.stringify(updatedSelections));
    
        }
    
        // Notify parent component of the changes
        onFilterChange({
            target: {
                name:
                    category === "mustHave"
                        ? "propertyKeywords"
                        : category === "dontShow"
                        ? "dontShowKeywords"
                        : "propertySettlement",
                value: updatedSelections,
            },
        } as unknown as ChangeEvent<HTMLInputElement>);
    };

    const clearFilters = () => {
        setSelectedItems([]);
        setMustHaveItems([]);
        setDontShowItems([]);
        localStorage.removeItem("selectedFilters");
        localStorage.removeItem("selectedMustHaves");
        localStorage.removeItem("selectedDontShow");

        onFilterChange({
            target: {
                name: "clearAll",
                value: "",
            },
        } as unknown as ChangeEvent<HTMLInputElement>);
    };

    const isSelected = (id: string) => selectedItems.includes(id);

    const Dropdown: React.FC<{
        name: string;
        value: string;
        options: { value: string; label: string }[];
        onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    }> = React.memo(({ name, value, options, onChange }) => (
        <div className="relative w-full">
            <select
                name={name}
                value={value}
                onChange={onChange} // Ensure this is passed correctly
                className="w-full text-sm border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    ));

    
    const dropdownOptions = {
        min_bedrooms: [
            { value: "", label: "Min Beds" },
            { value: "1", label: "1+" },
            { value: "2", label: "2+" },
            { value: "3", label: "3+" }
        ],
        max_bedrooms: [
            { value: "", label: "Max Beds" },
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" }
        ],
        min_bathrooms: [
            { value: "", label: "Min Baths" },
            { value: "1", label: "1+" },
            { value: "2", label: "2+" }
        ],
        max_bathrooms: [
            { value: "", label: "Max Baths" },
            { value: "1", label: "1" },
            { value: "2", label: "2" }
        ],
        rental: [
            { value: "", label: "Rental Type" },
            { value: "buy", label: "Buy" },
            { value: "rent", label: "Rent" }
        ],
        min_token_price: [
            { value: "", label: "Min Token Price" },
            { value: "1", label: "1+" },
            { value: "2", label: "2+" },
            { value: "3", label: "3+" },
            { value: "4", label: "4+" },
            { value: "5", label: "5+" },
            { value: "6", label: "6+" },
            { value: "7", label: "7+" },
            { value: "8", label: "8+" },
            { value: "9", label: "9+" },
            { value: "10", label: "10+" }
        ],
        max_token_price: [
            { value: "", label: "Max Token Price" },
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
            { value: "5", label: "5" },
            { value: "6", label: "6" },
            { value: "7", label: "7" },
            { value: "8", label: "8" },
            { value: "9", label: "9" },
            { value: "10", label: "10" }
        ],
        min_house_price: [
            { value: "", label: "Min Price" },
            { value: "100000", label: "£100,000+" },
            { value: "200000", label: "£200,000+" },
            { value: "300000", label: "£300,000+" },
            { value: "400000", label: "£400,000+" },
            { value: "500000", label: "£500,000+" },
            { value: "600000", label: "£600,000+" },
            { value: "700000", label: "£700,000+" },
            { value: "800000", label: "£800,000+" },
            { value: "900000", label: "£900,000+" },
            { value: "1000000", label: "£1,000,000+" },
            { value: "1500000", label: "£1,500,000+" },
            { value: "2000000", label: "£2,000,000+" },
            { value: "5000000", label: "£5,000,000+" },
            { value: "10000000", label: "£10,000,000+" }
        ],
        max_house_price: [
            { value: "", label: "Max Price" },
            { value: "100000", label: "£100,000+" },
            { value: "200000", label: "£200,000+" },
            { value: "300000", label: "£300,000+" },
            { value: "400000", label: "£400,000+" },
            { value: "500000", label: "£500,000+" },
            { value: "600000", label: "£600,000+" },
            { value: "700000", label: "£700,000+" },
            { value: "800000", label: "£800,000+" },
            { value: "900000", label: "£900,000+" },
            { value: "1000000", label: "£1,000,000+" },
            { value: "1500000", label: "£1,500,000+" },
            { value: "2000000", label: "£2,000,000+" },
            { value: "5000000", label: "£5,000,000+" },
            { value: "10000000", label: "£10,000,000+" }
        ],
        timeAdded: [
            { value: "", label: "House Added" },
            { value: "last24hours", label: "Last 24 Hours" },
            { value: "last7days", label: "Last 7 Days" },
            { value: "lastmonth", label: "Last Month" }
        ],
        min_tokens_left: [
            { value: "", label: "Min Tokens Left" },
            { value: "1", label: "1+" },
            { value: "2", label: "2+" },
            { value: "3", label: "3+" },
            { value: "4", label: "4+" },
            { value: "5", label: "5+" },
            { value: "6", label: "6+" },
            { value: "7", label: "7+" },
            { value: "8", label: "8+" },
            { value: "9", label: "9+" },
            { value: "10", label: "10+" }
        ],
        max_tokens_left: [
            { value: "", label: "Max Tokens Left" },
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
            { value: "5", label: "5" },
            { value: "6", label: "6" },
            { value: "7", label: "7" },
            { value: "8", label: "8" },
            { value: "9", label: "9" },
            { value: "10", label: "10" }
        ]
    };


    const dontShowOptions = ["New Home", "Retirement Home", "Buying Schemes", "High Contributions"];

    return (
        <div className="flex flex-col items-center w-full space-y-4 px-6 mt-6">
            <h2 className="font-bold text-center text-gray-500">Property Type</h2>
            {/* Property Types */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 w-full max-w-5xl text-gray-500 whitespace-nowrap">
                {propertyTypes.map(({ id, label, icon }) => (
                    <div
                        key={id}
                        className={`flex flex-col items-center space-y-2 px-4 py-3 cursor-pointer border rounded-lg shadow-md transition transform hover:scale-105 ${
                            isSelected(id) ? "bg-blue-100 border-blue-300" : "bg-white border-gray-300"
                        }`}
                        onClick={() =>  toggleSelection(id, "propertyType")}
                        aria-pressed={isSelected(id)}
                    >
                        {icon}
                        <h1 className="text-sm font-medium text-center">{label}</h1>
                    </div>
                ))}
            </div>

            {/* Filters Section */}
            <div className="w-full max-w-5xl space-y-6">
            <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full max-w-5xl"
                >
                    {isTokenPriceFilterHidden &&
                        <>
                            <Dropdown 
                                name="propertyMinTokenPrice"
                                value={filters.propertyMinTokenPrice}
                                options={dropdownOptions.min_token_price}
                                onChange={selectFilterChange}
                            />
                            <Dropdown
                                name="propertyMaxTokenPrice"
                                value={filters.propertyMaxTokenPrice}
                                options={dropdownOptions.max_token_price}
                                onChange={selectFilterChange}
                            />
                        </>
                    }
                    {isPriceFilterHidden && 
                        <>
                            <Dropdown
                                name="propertyMinPrice"
                                value={filters.propertyMinPrice}
                                options={dropdownOptions.min_house_price}
                                onChange={selectFilterChange}
                            />
                            <Dropdown
                                name="propertyMaxPrice"
                                value={filters.propertyMaxPrice} // Corrected: Was mapped to propertyMaxBedrooms
                                options={dropdownOptions.max_house_price}
                                onChange={selectFilterChange}
                            />
                        </>
                    }
                    <Dropdown
                        name="propertyMinTokensLeft"
                        value={filters.propertyMinTokensLeft}
                        options={dropdownOptions.min_tokens_left}
                        onChange={selectFilterChange}
                    />
                    <Dropdown
                        name="propertyMaxTokensLeft"
                        value={filters.propertyMaxTokensLeft}
                        options={dropdownOptions.max_tokens_left}
                        onChange={selectFilterChange}
                    />
                    <Dropdown
                        name="propertyMinBedrooms"
                        value={filters.propertyMinBedrooms}
                        options={dropdownOptions.min_bedrooms}
                        onChange={selectFilterChange}
                    />
                    <Dropdown
                        name="propertyMaxBedrooms"
                        value={filters.propertyMaxBedrooms}
                        options={dropdownOptions.max_bedrooms}
                        onChange={selectFilterChange}
                    />
                    <Dropdown
                        name="propertyMinBathrooms"
                        value={filters.propertyMinBathrooms}
                        options={dropdownOptions.min_bathrooms}
                        onChange={selectFilterChange}
                    />
                    <Dropdown
                        name="propertyMaxBathrooms"
                        value={filters.propertyMaxBathrooms}
                        options={dropdownOptions.max_bathrooms}
                        onChange={selectFilterChange}
                    />
                    <Dropdown
                        name="propertyRental"
                        value={filters.propertyRental}
                        options={dropdownOptions.rental}
                        onChange={selectFilterChange}
                    />
                    <Dropdown
                        name="propertyAdded"
                        value={filters.propertyAdded}
                        options={dropdownOptions.timeAdded}
                        onChange={selectFilterChange}
                    />
                </div>



                {/* Must Haves */}
                <div>
                    <h2 className="text-gray-500 font-semibold text-center mb-4">Must Haves</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-gray-500">
                        {["Garden", "Parking", "New Home", "Retirement Home", "Buying Schemes", "Auction Property"].map(
                            (item) => (
                                <button
                                    key={item}
                                    className={`border px-4 py-3 rounded-lg shadow-md text-center font-medium hover:shadow-lg transform hover:scale-105 transition ${
                                        mustHaveItems.includes(item.toLowerCase().replace(" ", "-"))
                                            ? "bg-blue-100 border-blue-300"
                                            : "bg-white border-gray-300"
                                    }`}
                                    onClick={() => toggleSelection(item.toLowerCase().replace(" ", "-"), "mustHave")}
                                >
                                    {item}
                                </button>
                            )
                        )}
                    </div>
                </div>

                {/* Don't Show */}
                <div className="">
                    <h2 className="text-gray-500 font-semibold text-center mb-4">Don't Show</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-gray-500 mb-6">
                        {dontShowOptions.map((item) => (
                            <button
                                key={`dont-${item}`}
                                className={`flex items-center justify-center border px-4 py-3 rounded-lg shadow-md text-center font-medium hover:shadow-lg transform hover:scale-105 transition ${
                                    dontShowItems.includes(item.toLowerCase().replace(" ", "-"))
                                        ? "bg-red-100 border-red-300"
                                        : "bg-white border-gray-300"
                                }`}
                                onClick={() => toggleSelection(item.toLowerCase().replace(" ", "-"), "dontShow")}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            <hr className="border-t border-gray-400 w-screen" />

            <div className="w-full">
                
                {/* Bottom Section */}
                <div className="flex flex-row items-center justify-between w-full bg-white mb-4 px-6 xl:px-20">
                    {/* Clear Button */}
                    <button
                        onClick={clearFilters}
                        className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transform hover:scale-105 transition"
                    >
                        Clear
                    </button>

                    {/* Results and Done Button */}
                    <div className="flex flex-row items-center space-x-4">
                        <h1 className="text-gray-700 font-semibold"> Results</h1>
                        <button
                            className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transform hover:scale-105 transition"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterControls;
