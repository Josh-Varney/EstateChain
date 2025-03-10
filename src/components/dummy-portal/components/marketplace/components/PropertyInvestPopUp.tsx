import React, { useState } from "react";
import { FaTimes, FaInfoCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { Info } from 'lucide-react';

interface PropertyInvestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  tokenPrice: number;
  propertyName: string;
  totalTokens: number;
  tokensSold: number;
  propertyDescription: string;
  addedBy: string;
  smartAddress: string;
  blockchain: string;
  blockchainCurrency: string;
  propertyValuation: number;
  isProject: boolean;
  isRental: boolean;
  rentalExpectancy: string;
  rentalYield?: number; // Annual percentage return from rental income
}

const PropertyInvestPopup: React.FC<PropertyInvestPopupProps> = ({
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
  rentalYield,
}) => {
  isRental = true;
  const [tokenAmount, setTokenAmount] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const totalCost = tokenAmount * tokenPrice;
  const tokensLeft = totalTokens - tokensSold;
  const percentageSold = ((tokensSold / totalTokens) * 100).toFixed(2);
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
          {propertyName}
        </h2>

        <h2 className="text-gray-400 mb-2">{propertyDescription}</h2>

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
            <span className="text-gray-600">{blockchain} Faucet</span>
            <span className="font-semibold text-gray-800">Faucet Information</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Test Network Deployed</span>
            <span className="font-semibold text-gray-800">{blockchain}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Tokens Left:</span>
            <span className="font-semibold text-gray-800">{tokensLeft}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Property Valuation:</span>
            <span className="font-semibold text-gray-800">{blockchainCurrency} {propertyValuation}</span>
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
            className="w-full px-4 py-2 border border-gray-300 text-blue-500 rounded-lg focus:ring focus:ring-green-300"
          />
        </div>

        <div className="mb-6">
          <p className="text-gray-700 text-md">
            <div className="flex flex-row items-center">
              <div>
                Smart Address 
              </div>
              <div>
                <Info
                size={16}
                className="ml-2 text-blue-500 cursor-pointer"
                data-tooltip-id="smartAddressTooltip"
                />
              </div>
            </div>
            <span className="font-bold text-gray-800">{smartAddress}</span>
          </p>
        </div>

        <Tooltip id="smartAddressTooltip" place="right">
            This is the smart contract address where the mock property has been deployed.
        </Tooltip>

        <div className="mb-6">
          <p className="text-gray-700 text-lg">
            <div className="flex flex-row items-center">
              <div>
                Total Investment
              </div>
              <div>
                <Info
                  size={16}
                  className="ml-2 text-blue-500 cursor-pointer"
                  data-tooltip-id="smartInvestTooltip"
                  />
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-800">{blockchainCurrency} {totalCost.toFixed(18)}</span>
            </div>
          </p>
        </div>

        <Tooltip id="smartInvestTooltip" place="right">
            This is fake {blockchainCurrency} from the chain {blockchain} that will be required for transfer to own the mock property
        </Tooltip>

        <div className="mb-6 text-gray-700 text-lg">
          <div className="flex flex-row items-center">
            <div>
              Ownership Percentage:
            </div>
            <div>
              <Info
              size={16}
              className="ml-2 text-blue-500 cursor-pointer"
              data-tooltip-id="ownershipTooltip"
              />
            </div>
          </div>
          <div>
            <span className="font-bold text-gray-800">{ownershipPercentage}%</span>
          </div>
        </div>

        <Tooltip id="ownershipTooltip" place="right">
            This states the ownership that you have over this property, this will be recorded in our system and shown over the blockchain.
        </Tooltip>


        {isRental && (
          <div className="p-4 bg-green-100 rounded-lg text-center mb-6">
            <p className="text-green-800 font-medium">
              <div>
                <div className="">
                Rental Estimated Monthly Return 
                </div>
              </div>
              <div>
                <strong>{blockchainCurrency} {parseFloat(rentalExpectancy) * tokenAmount}</strong>
              </div>
            </p>
          </div>
        )}

        <Tooltip id="rentalTooltip" place="right">
            This states the ownership that you have over this property, this will be recorded in our system and shown over the blockchain.
        </Tooltip>
        

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
