// src/components/grid-cards/LatestAssetCard.tsx

import React from "react";

// Define the shape of a single asset
type Asset = {
  id: number;
  name: string;
  dateAdded: string;
  imageUrl: string;
  description: string;
  value: number;
  category: string;
};

// Props for the LatestAssetCard
interface LatestAssetCardProps {
  darkMode: boolean;
  // Optionally, you can pass the latest asset as a prop
  // latestAsset?: Asset;
}

const LatestAssetCard: React.FC<LatestAssetCardProps> = ({ darkMode }) => {
  // Sample latest asset data
  const latestAsset: Asset = {
    id: 1,
    name: "Luxury Villa in Beverly Hills",
    dateAdded: "2024-12-22T09:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1600607685362-cf365f694d68",
    description: "A stunning luxury villa located in the heart of Beverly Hills.",
    value: 5000000,
    category: "Real Estate",
  };

  return (
    <div
      className={`
        w-full p-4 rounded-lg shadow-md
        transition-colors duration-300
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
      `}
    >
      {/* Card Header */}
      <h2 className="text-xl font-bold mb-4">Latest Asset Added</h2>

      {/* Asset Details */}
      <div className="flex items-center">
        <img
          src={latestAsset.imageUrl}
          alt={`${latestAsset.name} image`}
          className="h-16 w-16 rounded-full mr-4 object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{latestAsset.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{latestAsset.category}</p>
        </div>
      </div>

      {/* Asset Description */}
      <p className="mt-4 text-sm">{latestAsset.description}</p>

      {/* Asset Value and Date */}
      <div className="mt-4 flex justify-between items-center">
        <span className="font-semibold">Value: £{latestAsset.value.toLocaleString()}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Added on {new Date(latestAsset.dateAdded).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default LatestAssetCard;
