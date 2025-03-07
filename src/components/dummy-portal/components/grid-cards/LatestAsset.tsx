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
}

const LatestAssetCard: React.FC<LatestAssetCardProps> = ({ darkMode }) => {
  // Sample assets data
  const assets: Asset[] = [
    {
      id: 1,
      name: "Luxury Villa in Beverly Hills",
      dateAdded: "2024-12-22T09:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1600607685362-cf365f694d68",
      description: "A stunning luxury villa located in the heart of Beverly Hills.",
      value: 5000000,
      category: "Real Estate",
    },
    {
      id: 2,
      name: "Modern Apartment in New York",
      dateAdded: "2024-12-20T09:00:00Z",
      imageUrl: "https://images.unsplash.com/photo-1560185127-6d3cb9e6e17c",
      description: "A beautiful modern apartment located in the heart of New York City.",
      value: 2500000,
      category: "Real Estate",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 h-full w-full mx-auto">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className={`
            flex flex-col h-full p-6 rounded-lg shadow-lg
            transition-all duration-300
            ${darkMode ? "bg-gray-900 border border-gray-700 text-gray-100" : "bg-white border border-gray-300 text-gray-900"}
          `}
        >
          {/* Card Header */}
          <h2 className="text-lg font-semibold mb-1">Latest Asset</h2>

          {/* Asset Details */}
          <div className="flex gap-4 items-start flex-grow">
            <img
              src={asset.imageUrl}
              alt={asset.name}
              className="h-32 w-32 rounded-md object-cover shadow-sm flex-none"
            />
            <div className="flex flex-col flex-grow">
              <h3 className="text-base font-medium truncate">{asset.name}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{asset.category}</span>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex-grow">
                {asset.description}
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="px-4 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  See More
                </button>
                <button
                  className="px-4 py-2 text-sm rounded bg-green-500 text-white hover:bg-green-600 transition"
                >
                  Invest Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestAssetCard;
