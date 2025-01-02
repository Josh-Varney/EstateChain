import React, { ChangeEvent, useEffect, useState } from "react";
import { FaHome, FaBuilding, FaTree, FaWarehouse } from "react-icons/fa";

interface Filters {
    propertyMinPrice: string;
    propertyMaxPrice: string;
    propertyLocation: string;
    propertyAdded: string;
    propertyMinBedrooms: string;
    propertyMinBathrooms: string;
    propertyMinTokensLeft: string;
    propertyMaxTokenPrice: string;
    propertyKeywords: string[]; 
    dontShowKeywords: string[]; 
    propertyType: string;
    propertyRental: string;
}

interface FilterControlsProps {
    filters: Filters;
    onFilterChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    selectFilterChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    darkMode: string;
    selectedItems: string[]; // Added this prop
    setSelectedItems: (items: string[]) => void; // Added this prop
    handleMustHave: (item: string) => void;
    handleDontHave: (item: string) => void;
}



const FilterControls: React.FC<FilterControlsProps> = ({ filters, onFilterChange, selectFilterChange }) => {
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

    useEffect(() => {
        // Clear specific localStorage items on window reload
        window.onload = () => {
            localStorage.removeItem("selectedFilters");
            localStorage.removeItem("selectedMustHaves");
            localStorage.removeItem("selectedDontShow");
            localStorage.removeItem("filters");
        };
    }, []);


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
    
            // if (DEBUG) {
            //     console.log(`Property Type Clicked: ${id}`);
            //     console.log("Updated Property Types:", updatedSelections);
            // }
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
        placeholder?: string;
        onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    }> = ({ name, value, options, placeholder, onChange }) => (
        <div className="relative w-full">
            <select
                name={name}
                value={value}
                className="w-full text-sm border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                onChange={onChange} 
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );

    const dropdownOptions = {
        timeAdded: [
            { value: "anytime", label: "Anytime" },
            { value: "last-24-hours", label: "Last 24 Hours" },
            { value: "last-7-days", label: "Last 7 Days" },
        ],
        bedrooms: [
            { value: "1", label: "1+" },
            { value: "2", label: "2+" },
            { value: "3", label: "3+" },
        ],
        bathrooms: [
            { value: "1", label: "1+" },
            { value: "2", label: "2+" },
        ],
        rental: [
            { value: "buy", label: "Buy" },
            { value: "rent", label: "Rent" },
        ],
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
                        <Dropdown
                            name="timeAdded"
                            value={filters.propertyAdded}
                            options={dropdownOptions.timeAdded}
                            placeholder="Time Added"
                            onChange={selectFilterChange}
                        />
                        <Dropdown
                            name="propertyMinBedrooms"
                            value={filters.propertyMinBedrooms}
                            options={dropdownOptions.bedrooms}
                            placeholder="Min Bedrooms"
                            onChange={selectFilterChange}
                        />
                        <Dropdown
                            name="propertyMinBathrooms"
                            value={filters.propertyMinBathrooms}
                            options={dropdownOptions.bathrooms}
                            placeholder="Min Bathrooms"
                            onChange={selectFilterChange}
                        />
                        <Dropdown
                            name="propertyRental"
                            value={filters.propertyRental}
                            options={dropdownOptions.rental}
                            placeholder="Rental Type"
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
