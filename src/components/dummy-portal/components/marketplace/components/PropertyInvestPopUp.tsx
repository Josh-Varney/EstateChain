import React, { useState } from "react";
import { FaTimes, FaInfoCircle } from "react-icons/fa";

interface PropertyInvestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  tokenPrice: number;
  propertyName: string;
  totalTokens: number;
  tokensSold: number;
  isProject: boolean;
  isRental: boolean;
  rentalYield?: number; // Annual percentage return from rental income
}

const PropertyInvestPopup: React.FC<PropertyInvestPopupProps> = ({
  isOpen,
  onClose,
  tokenPrice,
  propertyName,
  totalTokens,
  tokensSold,
  isProject,
  isRental,
  rentalYield = 0,
}) => {
  const [tokenAmount, setTokenAmount] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const totalCost = tokenAmount * tokenPrice;
  const tokensLeft = totalTokens - tokensSold;
  const percentageSold = ((tokensSold / totalTokens) * 100).toFixed(2);
  const estimatedAnnualIncome = ((tokenAmount * tokenPrice * rentalYield) / 100).toFixed(2);
  const ownershipPercentage = ((tokenAmount / totalTokens) * 100).toFixed(2);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className={`bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative transform transition-all scale-100`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Property Name
        </h2>

        <h2 className="text-gray-400">property description</h2>

        <div className="text-center mb-6">
          <button onClick={() => setShowInfo(!showInfo)} className="text-blue-600 flex items-center justify-center">
            <FaInfoCircle className="mr-2" /> More Info
          </button>
          {showInfo && (
            <p className="text-gray-600 mt-2">
              Please review the property information before investing. Upon transaction, you will own a percentage of the property based on the tokens you purchase.
            </p>
          )}
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Tokens Left:</span>
            <span className="font-semibold text-gray-800">{tokensLeft}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Percentage Sold:</span>
            <span className="font-semibold text-gray-800">{percentageSold}%</span>
          </div>
          <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: `${percentageSold}%` }}></div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="tokenAmount" className="block text-gray-700 font-medium mb-2">
            Number of Tokens to Buy
          </label>
          <input
            id="tokenAmount"
            type="number"
            min="0"
            max={tokensLeft}
            value={tokenAmount}
            onChange={(e) => setTokenAmount(Math.max(0, Number(e.target.value)))}
            className="w-full px-4 py-2 border border-gray-300 text-red-700 rounded-lg focus:ring focus:ring-green-300"
          />
        </div>

        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Total Investment: <span className="font-bold text-gray-800">${totalCost.toFixed(2)}</span>
          </p>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            Ownership Percentage: <span className="font-bold text-gray-800">{ownershipPercentage}%</span>
          </p>
        </div>

        {isRental && (
          <div className="bg-green-100 p-4 rounded-lg text-center mb-6">
            <p className="text-green-800 font-medium">
              Rental Income: Estimated annual return of <strong>${estimatedAnnualIncome}</strong>
              <span className="text-sm text-gray-600 ml-2">({rentalYield}% per year)</span>
            </p>
          </div>
        )}

        {!isRental && (
          <div className="text-center text-gray-600 text-sm mb-6 flex items-center justify-center">
            <FaInfoCircle className="mr-2" /> Investment is based on token valuation appreciation over time.
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (tokenAmount > tokensLeft) {
                alert("You cannot purchase more tokens than are available.");
                return;
              }
              alert(
                `You have invested $${totalCost.toFixed(2)} for ${tokenAmount} tokens in ${propertyName}.`
              );
              onClose();
            }}
            disabled={tokenAmount <= 0 || tokenAmount > tokensLeft}
            className={`px-6 py-3 text-lg rounded-lg text-white transition-all ${
              tokenAmount <= 0 || tokenAmount > tokensLeft
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isProject ? "Contribute" : "Invest"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyInvestPopup;
