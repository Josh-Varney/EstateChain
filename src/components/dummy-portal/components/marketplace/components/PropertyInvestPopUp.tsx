import React, { useState } from "react";

interface PropertyInvestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  tokenPrice: number;
  propertyName: string;
  totalTokens: number;
  tokensSold: number;
  isProject: boolean; // Boolean to differentiate if it's a project
}

const PropertyInvestPopup: React.FC<PropertyInvestPopupProps> = ({
  isOpen,
  onClose,
  tokenPrice,
  propertyName,
  totalTokens,
  tokensSold,
  isProject,
}) => {
  const [tokenAmount, setTokenAmount] = useState(0);
  const totalCost = tokenAmount * tokenPrice;
  const tokensLeft = totalTokens - tokensSold;
  const percentageSold = ((tokensSold / totalTokens) * 100).toFixed(2);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Modal container */}
      <div
        className={`bg-white rounded-2xl shadow-2xl ${
          isProject ? "w-[700px]" : "w-[600px]"
        } max-w-full p-8 relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {isProject ? `Support the ${propertyName} Project` : `Invest in ${propertyName}`}
        </h2>

        {/* Project-specific message */}
        {isProject && (
          <p className="mb-6 text-gray-600 text-lg leading-relaxed">
            This project is raising funds through tokenization. By purchasing tokens, you’re directly contributing to
            its development and growth. Be a part of something impactful and own a stake in its success.
          </p>
        )}

        {/* Tokens information */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-base text-gray-600">Tokens Left:</span>
            <span className="text-xl font-semibold text-gray-800">{tokensLeft}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-base text-gray-600">Percentage Sold:</span>
            <span className="text-xl font-semibold text-gray-800">{percentageSold}%</span>
          </div>
          <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{ width: `${percentageSold}%` }}
            ></div>
          </div>
        </div>

        {/* Token purchase input */}
        <div className="mb-8">
          <label
            htmlFor="tokenAmount"
            className="block text-base font-medium text-gray-700 mb-3"
          >
            Number of Tokens to Buy
          </label>
          <input
            id="tokenAmount"
            type="number"
            min="0"
            max={tokensLeft}
            value={tokenAmount}
            onChange={(e) => setTokenAmount(Number(e.target.value))}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
          />
        </div>

        {/* Total investment */}
        <div className="mb-8">
          <p className="text-lg text-gray-600">
            Total Investment:{" "}
            <span className="text-2xl font-bold text-gray-800">
              ${totalCost.toFixed(2)}
            </span>
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-300 text-gray-800 text-lg rounded-lg hover:bg-gray-400"
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
                `You have invested $${totalCost.toFixed(
                  2
                )} for ${tokenAmount} tokens in ${propertyName}.`
              );
              onClose();
            }}
            disabled={tokenAmount <= 0 || tokenAmount > tokensLeft}
            className={`px-6 py-3 text-lg rounded-lg text-white ${
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
