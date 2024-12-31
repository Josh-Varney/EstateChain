import React, { useState } from "react";
import { FaHome, FaBuilding, FaTree, FaWarehouse } from "react-icons/fa";

interface PropertyType {
    id: string;
    label: string;
    icon: JSX.Element;
}

const FilterControls: React.FC = () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const propertyTypes: PropertyType[] = [
        { id: "detached", label: "Detached", icon: <FaHome size={30} /> },
        { id: "semi-detached", label: "Semi-Detached", icon: <FaHome size={30} /> },
        { id: "terraced", label: "Terraced", icon: <FaWarehouse size={30} /> },
        { id: "flat", label: "Flat", icon: <FaBuilding size={30} /> },
        { id: "bungalow", label: "Bungalow", icon: <FaHome size={30} /> },
        { id: "land", label: "Land", icon: <FaTree size={30} /> },
        { id: "park-home", label: "Park Home", icon: <FaHome size={30} /> },
    ];

    const handleItemClick = (id: string) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((item) => item !== id) // Deselect if already selected
                : [...prevSelected, id] // Add to selected items
        );
    };

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-lg font-bold mb-6 text-center">Property Type</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 divide-x divide-dotted text-gray-500 divide-gray-300 w-full max-w-5xl">
                {propertyTypes.map((property) => (
                    <div
                        key={property.id}
                        className={`flex flex-col items-center space-y-2 px-4 py-2 cursor-pointer ${
                            selectedItems.includes(property.id) ? "bg-blue-100" : ""
                        }`}
                        onClick={() => handleItemClick(property.id)}
                    >
                        {property.icon}
                        <h1 className="text-sm text-center whitespace-nowrap">
                            {property.label}
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterControls;
