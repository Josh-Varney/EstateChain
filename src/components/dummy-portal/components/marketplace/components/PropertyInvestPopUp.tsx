import React, { useState } from "react";
import { FaTimes, FaInfoCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { Info } from "lucide-react";
import { queryContract } from "../../../../../managers/property/property-contract";

const PropertyInvestPopup = ({
  isOpen,
  onClose,
  tokenPrice,
  propertyName,
  totalTokens,
  tokensSold,
  addedBy,
  smartAddress,
  propertyDescription,
  blockchain,
  blockchainCurrency,
  propertyValuation,
  rentalExpectancy,
  isProject,
  isRental,
}) => {
  const [tokenAmount, setTokenAmount] = useState(0);
  const gasFees = 1

  const totalCost = ((tokenAmount * tokenPrice) + gasFees * tokenAmount).toFixed(2);
  const tokensLeft = totalTokens - tokensSold;
  const percentageSold = ((tokensSold / totalTokens) * 100).toFixed(2);
  const ownershipPercentage = ((tokenAmount / totalTokens) * 100).toFixed(2);

  if (!isOpen) return null;

  function getGasPrices(network){
    console.log("Network for Gas Prices");
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          {propertyName}
        </h2>
        <p className="text-gray-500 text-center mb-4">{propertyDescription}</p>

        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Blockchain:</span>
            <span className="font-semibold text-gray-800">{blockchain} TestNet</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Listed By:</span>
            <span className="font-semibold text-gray-800 text-sm">{addedBy}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Tokens Left:</span>
            <span className="font-semibold text-gray-800">{tokensLeft}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Valuation:</span>
            <span className="font-semibold text-gray-800">
              {blockchainCurrency} {propertyValuation.toFixed(18)}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Gas Fess:</span>
            <span className="font-semibold text-gray-800">
              {blockchainCurrency} {gasFees}
            </span>
          </div>
          <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: `${percentageSold}%` }}></div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Number of Tokens to Buy
          </label>
          <input
            type="number"
            min="0"
            max={tokensLeft}
            value={tokenAmount}
            onChange={(e) => setTokenAmount(Math.max(0, Number(e.target.value)))}
            className="w-full px-4 py-2 border border-gray-300 text-blue-500 rounded-lg focus:ring focus:ring-green-300"
          />
        </div>

        <div className="mb-4">
          <div className="flex items-center">
            <span className="text-gray-700">Smart Address:</span>
            <Info className="ml-2 text-blue-500 cursor-pointer" data-tooltip-id="smartAddressTooltip" />
          </div>
          <span className="font-bold text-gray-800 break-all">{smartAddress}</span>
        </div>
        <Tooltip id="smartAddressTooltip" place="right">
          Smart contract address where the property is deployed.
        </Tooltip>

        <div className="mb-4">
          <div className="flex items-center">
            <span className="text-gray-700">Total Investment:</span>
            <Info className="ml-2 text-blue-500 cursor-pointer" data-tooltip-id="smartInvestTooltip" />
          </div>
          <span className="font-bold text-gray-800">{blockchainCurrency} {totalCost}</span>
        </div>
        <Tooltip id="smartInvestTooltip" place="right">
          Estimated investment based on token purchase.
        </Tooltip>

        <div className="mb-4">
          <div className="flex items-center">
            <span className="text-gray-700">Ownership Percentage:</span>
            <Info className="ml-2 text-blue-500 cursor-pointer" data-tooltip-id="ownershipTooltip" />
          </div>
          <span className="font-bold text-gray-800">{ownershipPercentage}%</span>
        </div>
        <Tooltip id="ownershipTooltip" place="right">
          Your ownership share recorded on the blockchain.
        </Tooltip>

        {isRental && (
          <div className="p-4 bg-green-100 rounded-lg text-center mb-4">
            <p className="text-green-800 font-medium">
              Estimated Monthly Return: <strong>{blockchainCurrency} {(rentalExpectancy * tokenAmount).toFixed(2)}</strong>
            </p>
          </div>
        )}

        {!isRental && (
          <div className="text-center text-gray-600 text-sm mb-4">
            <FaInfoCircle className="mr-2 inline" /> Investment appreciates over time.
          </div>
        )}

        <div className="flex justify-between">
          <button onClick={onClose} className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
            Cancel
          </button>
          <button
            onClick={async () => await queryContract(smartAddress, blockchain)}
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
