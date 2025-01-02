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
    propertyType: string;
    propertyRental: string;
}

interface FilterControlsProps {
    filters: Filters;
    onFilterChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    darkMode: string;
    selectedItems: string[]; // Added this prop
    setSelectedItems: (items: string[]) => void; // Added this prop
}

const FilterControls: React.FC<FilterControlsProps> = ({ filters, onFilterChange }) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

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
        // Initialize `selectedItems` state from localStorage
        const savedItems = localStorage.getItem("selectedFilters");
        if (savedItems) {
            setSelectedItems(JSON.parse(savedItems));
        }
    }, [setSelectedItems]);

    const toggleSelection = (id: string) => {
        const updatedSelectedItems = selectedItems.includes(id)
            ? selectedItems.filter((item) => item !== id)
            : [...selectedItems, id];
    
        setSelectedItems(updatedSelectedItems);
        localStorage.setItem("selectedFilters", JSON.stringify(updatedSelectedItems));
    
        // Notify the parent about the updated selected items
        onFilterChange({
            target: {
                name: "propertySettlement",
                value: updatedSelectedItems.join(","), // Comma-separated string
            },
        } as unknown as ChangeEvent<HTMLInputElement>);
    };

    const clearFilters = () => {
        setSelectedItems([]);
        localStorage.removeItem("selectedFilters");
    
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
            { value: "any", label: "Any" },
            { value: "1", label: "1+" },
            { value: "2", label: "2+" },
            { value: "3", label: "3+" },
        ],
        bathrooms: [
            { value: "any", label: "Any" },
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
                        onClick={() => toggleSelection(id)}
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
                            value={filters.propertyAdded || ""}
                            options={dropdownOptions.timeAdded}
                            placeholder="Time Added"
                            onChange={onFilterChange}
                        />
                        <Dropdown
                            name="minBedrooms"
                            value={filters.propertyMinBedrooms || ""}
                            options={dropdownOptions.bedrooms}
                            placeholder="Min Bedrooms"
                            onChange={onFilterChange}
                        />
                        <Dropdown
                            name="minBathrooms"
                            value={filters.propertyMinBathrooms || ""}
                            options={dropdownOptions.bathrooms}
                            placeholder="Min Bathrooms"
                            onChange={onFilterChange}
                        />
                        <Dropdown
                            name="rental"
                            value={filters.propertyRental || ""}
                            options={dropdownOptions.rental}
                            placeholder="Rental Type"
                            onChange={onFilterChange}
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
                                        isSelected(item.toLowerCase().replace(" ", "-"))
                                            ? "bg-blue-100 border-blue-300"
                                            : "bg-white border-gray-300"
                                    }`}
                                    onClick={() => toggleSelection(item.toLowerCase().replace(" ", "-"))}
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
                                    isSelected(`dont-${item.toLowerCase().replace(" ", "-")}`)
                                        ? "bg-red-100 border-red-300"
                                        : "bg-white border-gray-300"
                                }`}
                                onClick={() =>
                                    toggleSelection(`dont-${item.toLowerCase().replace(" ", "-")}`)
                                }
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
