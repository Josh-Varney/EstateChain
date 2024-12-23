import React from "react";

interface HousingAsset {
  propertyType: string;     // e.g. "Single Family", "Condo", "Townhouse"
  location: string;         // e.g. "123 Main St, Springfield, IL"
  purchasePrice: number;    // original purchase price
  currentValue: number;     // estimated current market value
  mortgageBalance?: number; // optional: remaining mortgage
  imageUrl?: string;        // optional: link to an exterior image of the property
}

interface HousingAssetCardProps {
  darkMode: boolean;
  asset: HousingAsset;
}

const HousingAssetCard: React.FC<HousingAssetCardProps> = ({ darkMode, asset }) => {
  // Calculate equity as current value - mortgage balance (if mortgageBalance is provided)
  const equity = asset.mortgageBalance
    ? asset.currentValue - asset.mortgageBalance
    : asset.currentValue;

  return (
    <div
      className={`
        w-full p-4 rounded-lg shadow-md transition-colors duration-300 
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
      `}
    >
      {/* Optional image */}
      {asset.imageUrl && (
        <div className="mb-3 h-48 overflow-hidden rounded-md">
          <img
            src={asset.imageUrl}
            alt={asset.propertyType}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <h2 className="text-xl font-bold mb-2">{asset.propertyType}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{asset.location}</p>

      <div className="mb-2">
        <p>
          <span className="font-semibold">Purchase Price:</span>{" "}
          ${asset.purchasePrice.toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Current Value:</span>{" "}
          <span className="text-green-500 dark:text-green-400">
            ${asset.currentValue.toLocaleString()}
          </span>
        </p>

        {asset.mortgageBalance !== undefined && (
          <p>
            <span className="font-semibold">Mortgage Balance:</span>{" "}
            <span className="text-red-500 dark:text-red-400">
              ${asset.mortgageBalance.toLocaleString()}
            </span>
          </p>
        )}

        <hr className="my-2 border-gray-300 dark:border-gray-700" />

        <p className="font-semibold">
          Estimated Equity:{" "}
          <span className="text-blue-600 dark:text-blue-400">
            ${equity.toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default HousingAssetCard;
