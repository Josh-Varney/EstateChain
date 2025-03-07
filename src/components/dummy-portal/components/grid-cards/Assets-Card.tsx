import React from "react";

interface Improvement {
  description: string;
  cost: number;
  date: string;
}

interface HousingAsset {
  propertyType: string;
  location: string;
  purchasePrice: number;
  purchaseDate: string;
  currentValue: number;
  mortgageBalance?: number;
  imageUrl?: string;
  improvements?: Improvement[];
  valueHistory?: { date: string; value: number }[];
}

interface HousingAssetCardProps {
  darkMode: boolean;
  asset: HousingAsset;
}

const HousingAssetCard: React.FC<HousingAssetCardProps> = ({ darkMode, asset }) => {
  const equity = asset.mortgageBalance
    ? asset.currentValue - asset.mortgageBalance
    : asset.currentValue;

  const totalImprovementCost = asset.improvements?.reduce(
    (total, improvement) => total + improvement.cost,
    0
  ) || 0;

  const netEquity = equity - totalImprovementCost;

  const yearsSincePurchase = Math.floor(
    (new Date().getTime() - new Date(asset.purchaseDate).getTime()) /
      (1000 * 60 * 60 * 24 * 365)
  );

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 h-full max-w-lg mx-auto">
      <div
        className={`
          flex flex-col justify-between p-4 rounded-lg shadow-md border transition-colors duration-300 h-full
          ${darkMode ? "bg-gray-900 border border-gray-700 text-gray-100" : "bg-white border border-gray-300 text-gray-900"}
        `}
      >
        {/* Image */}
        {asset.imageUrl && (
          <div className="rounded-md overflow-hidden mb-4">
            <img
              src={asset.imageUrl}
              alt={asset.propertyType}
              className="w-full h-40 object-cover"
            />
          </div>
        )}

        {/* Header */}
        <div className="mb-3">
          <h2 className="text-xl font-semibold">{asset.propertyType}</h2>
          <p className="text-sm text-gray-500">{asset.location}</p>
        </div>

        {/* Key Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Purchase Price:</span>
            <span>${asset.purchasePrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Current Value:</span>
            <span className="text-green-500">${asset.currentValue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Years Owned:</span>
            <span>{yearsSincePurchase} years</span>
          </div>
          {asset.mortgageBalance !== undefined && (
            <div className="flex justify-between">
              <span>Mortgage Balance:</span>
              <span className="text-red-500">${asset.mortgageBalance.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between font-medium">
            <span>Net Equity:</span>
            <span className="text-blue-500">${netEquity.toLocaleString()}</span>
          </div>
        </div>

        {/* Improvements */}
        {asset.improvements && asset.improvements.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Improvements</h3>
            <ul className="space-y-1 text-sm text-gray-500">
              {asset.improvements.map((improvement, index) => (
                <li key={index} className="flex justify-between">
                  <span>{improvement.description}</span>
                  <span>${improvement.cost.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HousingAssetCard;
