import React, { useState, useEffect } from "react";
import { FaTimes, FaInfoCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { Info } from "lucide-react";
import { queryContract } from "../../../../../managers/property/property-contract";

interface PopupModalProps {
  status: string;
  txHash: string;
  closePopup: () => void;
  receipt: any;       // Transaction receipt passed as a prop
  isWaiting: boolean;  // Whether we're still waiting for the receipt
}

const TransactionModal: React.FC<PopupModalProps> = ({ status, txHash, closePopup, receipt, isWaiting }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-md w-full transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
        {/* Modal Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">{status}</h2>

        {/* Waiting State: Spinner and Message */}
        {isWaiting ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-green-500 border-solid"></div>
            <p className="text-lg text-gray-500">Waiting for receipt...</p>
          </div>
        ) : (
          receipt && (
            <div className="space-y-4">
              <p className="text-xl text-green-500 font-semibold">Transaction Confirmed</p>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Block Number:</strong> {receipt.blockNumber}</p>
                <p><strong>Gas Used:</strong> {receipt.gasUsed.toString()}</p>
                <p><strong>Status:</strong> {receipt.status === 1 ? "Success" : "Failed"}</p>
              </div>
            </div>
          )
        )}

        {/* Transaction Hash (Small and Subtle) */}
        {txHash && !isWaiting && (
          <p className="mt-4 text-sm text-gray-500">
            <strong>Transaction Hash:</strong>{" "}
            <a
              href={`https://holesky.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              {txHash?.slice(0, 12)}...{txHash?.slice(-6)} {/* Display first and last part of the txHash */}
            </a>
          </p>
        )}

        {/* Close Button */}
        <button
          onClick={closePopup}
          className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};



const PropertyInvestPopup = ({
  isOpen,
  onClose,
  tokenPrice,
  propertyID,
  propertyAddress,
  propertyName,
  totalTokens,
  tokensLeft,
  tokensSold,
  addedBy,
  smartAddress,
  propertyDescription,
  blockchain,
  blockchainCurrency,
  propertyValuation,
  rentalExpectancy,
  contractName,
  isProject,
  isRental,
}) => {
  const [status, setStatus] = useState(""); // Stores the status of the transaction
  const [loading, setLoading] = useState(false); // Shows loading indicator
  const [txHash, setTxHash] = useState(""); // Stores the transaction hash for success
  const [errorMessage, setErrorMessage] = useState(""); // Stores error message
  const [isWaiting, setIsWaiting] = useState(true); // Waiting for receipt state
  const [receipt, setReceipt] = useState<any>(null);

  const [tokenAmount, setTokenAmount] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [storedAccounts, setStoredAccounts] = useState([]);
  const gasFees = 1

  const totalCost = ((tokenAmount * tokenPrice) + gasFees * tokenAmount).toFixed(2);
  // const tokensLeft = totalTokens - tokensSold;
  const percentageSold = ((tokensSold / totalTokens) * 100).toFixed(2);
  const ownershipPercentage = ((tokenAmount / totalTokens) * 100).toFixed(2);
  const [showPopup, setShowPopup] = useState(false); 

  const handleTransaction = async () => {
    // Set the loading state and start processing
    setLoading(true);
    setStatus("Processing Request");
    setErrorMessage(""); // Clear previous error message

    // Call the queryContract function with relevant parameters
    await queryContract(
        propertyID,
        propertyAddress,
        smartAddress,   // Replace with actual smart contract address
        blockchain,                // Replace with the network (e.g., "mainnet")
        contractName,           // Replace with the contract name
        tokenPrice,             // Replace with token price
        tokenAmount,                       // Replace with number of tokens
        selectedAccount,             // Replace with the user's address
        setShowPopup,
        setLoading,
        setTxHash,
        setErrorMessage,
        setIsWaiting, 
        setReceipt,
    );

    setStatus("Confirmation");
};

useEffect(() => {
  const checkAccountsInLocalStorage = () => {
      // Get the accounts from localStorage
      const accountsFromLocalStorage = localStorage.getItem("connectedAccounts");

      // If accountsFromLocalStorage is not null, parse it, else set it to an empty array
      const parsedAccounts = accountsFromLocalStorage ? JSON.parse(accountsFromLocalStorage) : [];
      console.log(parsedAccounts);

      // Store the parsed accounts in the state
      setStoredAccounts(parsedAccounts);

      // If there are any accounts, set the first one as the selected account
      if (parsedAccounts.length > 0) {
          setSelectedAccount(parsedAccounts[0]);
      }
  };

  // Check initially
  checkAccountsInLocalStorage();

  // Check every 3 seconds (you can adjust the interval as needed)
  const interval = setInterval(checkAccountsInLocalStorage, 3000);

  // Clean up interval on unmount
  return () => clearInterval(interval);
}, []);

  const closePopup = () => {
    setShowPopup(false);
  };


  
  if (!isOpen) return null;

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedAccount(e.target.value);  // Update state when input value changes
  };

  const showFullAddress = false;

  const trimAddress = (address: string) => {
    if (showFullAddress) {
      return address;  // Show full address if the state is true
    }
    if (address.length <= 14) return address; // Return full address if it's too short
    return `${address.slice(0, 6)}...${address.slice(-4)}`;  // Truncate address with ... in the middle
  };

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
            <span className="text-gray-600">Estimated Gas Fess:</span>
            <span className="font-semibold text-gray-800">
              {blockchainCurrency} {gasFees}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Token Type:</span>
            <span className="flex flex-row font-bold text-blue-500">
               ERC-200 {contractName}
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
          <label className="block text-gray-700 font-medium mb-1">
            Account to Use
          </label>

          {/* 6. Render a select dropdown for accounts */}
          <select
            value={selectedAccount}
            onChange={handleInputChange}  // Update selected account on change
            className="w-full px-4 py-2 border border-gray-300 text-blue-500 rounded-lg focus:ring focus:ring-green-300"
          >
            {/* 7. Render each account in the dropdown */}
            {storedAccounts.length === 0 ? (
              <option value="">No accounts available</option>
            ) : (
              storedAccounts.map((account, index) => (
                <option key={index} value={account}>
                  {trimAddress(account)}
                </option>
              ))
            )}
          </select>
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
              onClick={handleTransaction}
              disabled={loading || tokenAmount <= 0 || tokenAmount > tokensLeft}
              className={`px-6 py-3 text-lg rounded-lg text-white transition-all ${
                loading || tokenAmount <= 0 || tokenAmount > tokensLeft
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? "Processing..." : isProject ? "Contribute" : "Invest"}
            </button>

          {showPopup && (
            <TransactionModal status={status} txHash={txHash} closePopup={closePopup} receipt={receipt} isWaiting={isWaiting} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyInvestPopup;
