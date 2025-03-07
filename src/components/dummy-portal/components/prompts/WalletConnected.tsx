import React, { useEffect, useRef, useState } from 'react';
import { FaExternalLinkAlt, FaCopy, FaSignOutAlt } from 'react-icons/fa';

interface WalletDropdownProps {
  close: () => void;
  address?: string;
  balance?: string;
  isOpen: boolean; // Tracks if the dropdown is open
  darkMode?: boolean; // Boolean to toggle dark mode
}

const currencies = [
  { code: 'SETH', label: 'SepoliaETH' },
  { code: 'HETH', label: 'HoleskyETH' },
  { code: 'AMOY', label: 'PolygonAmoy' },
  { code: 'BSCT', label: 'bscTestnet' },
  { code: 'FUJI', label: 'avalancheFuji' },
];

const WalletDropdown: React.FC<WalletDropdownProps> = ({ close, address = 'Not Connected', balance = '0.00', isOpen, darkMode }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('ETH');
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [showFullAddress, setShowFullAddress] = useState<boolean>(false);
  const [showBalance, setShowBalance] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  console.log(localStorage.getItem('connectedAccounts'));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [close]);

  useEffect(() => {
    // Fetch initial connected accounts from localStorage
    const storedAccounts = JSON.parse(localStorage.getItem("connectedAccounts") || "[]");
    setConnectedAccounts(storedAccounts);
    setSelectedAccount(storedAccounts[0] || null);

    // Listen for MetaMask account changes
    const handleAccountsChanged = (accounts: string[]) => {
      console.log("MetaMask accounts changed:", accounts);
      localStorage.setItem("connectedAccounts", JSON.stringify(accounts));
      setConnectedAccounts(accounts);
      setSelectedAccount(accounts[0] || null); // Select the first account
    };

    if (typeof window !== "undefined" && (window as any).ethereum) {
      const ethereum = (window as any).ethereum;
      ethereum.on("accountsChanged", handleAccountsChanged);

      // Cleanup listener on component unmount
      return () => {
        ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, []);

  // Utility function to trim the wallet address, with a toggle for full address visibility
  const trimAddress = (address: string) => {
    if (showFullAddress) {
      return address;  // Show full address if the state is true
    }
    if (address.length <= 14) return address; // Return full address if it's too short
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };



  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    alert("Address copied to clipboard!");
  };

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-4 mt-16 w-64 shadow-lg rounded-md overflow-hidden z-50 animate-fadeIn ${darkMode ? 'bg-gray-900 dark:text-white' : 'bg-white text-black'}`}
    >
      {/* Wallet Summary */}
      <div className={`p-4 border-b ${darkMode ? 'dark:border-gray-700 dark:bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
        <div className='flex flex-row justify-between'>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Wallet Address</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer" onClick={() => setShowFullAddress(!showFullAddress)}>
          {showFullAddress ? 'Hide' : 'Show'}
        </p>
        </div>
        <select
          value={selectedAccount || ""}
          onChange={(e) => setSelectedAccount(e.target.value)}
          className={`mt-1 w-full text-sm font-mono ${darkMode ? 'text-blue-400 dark:text-blue-700 dark:bg-gray-700' : 'text-blue-700 bg-gray-50'} border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500`}
        >
          {connectedAccounts.map((account) => (
            <option key={account} value={account}>
              {trimAddress(account)} {/* Display trimmed/full address */}
            </option>
          ))}
        </select>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mt-1`}>
          Balance:
          {showBalance ? (
            <>
              <span className="font-semibold"> {balance} {selectedCurrency}</span>
              <button
                onClick={() => setShowBalance(false)}
                className="ml-2 text-blue-600 underline"
              >
                Hide
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowBalance(true)}
              className="ml-1 text-blue-600 underline"
            >
              Show
            </button>
          )}
        </p>
      </div>

      {/* Currency Selector */}
      <div className={`p-4 border-b ${darkMode ? 'dark:border-gray-700 dark:bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
        <label className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Select Currency</label>
        <select
          value={selectedCurrency}
          onChange={(e) => handleCurrencyChange(e.target.value)}
          className={`mt-1 w-full border border-gray-300 rounded-md ${darkMode ? 'dark:bg-gray-700 dark:border-gray-600 text-gray-200' : 'text-gray-800 bg-white'}`}
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.label}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown Options */}
      <div className="flex flex-col">
        <button
          className={`flex items-center space-x-2 p-4 text-left text-sm ${darkMode ? 'hover:bg-gray-700 dark:hover:bg-gray-600' : 'hover:bg-gray-200'} transition duration-150 ease-in-out rounded-md`}
          onClick={handleCopyAddress}
        >
          <FaCopy className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          <span>Copy Address</span>
        </button>
        <button
          className={`flex items-center space-x-2 p-4 text-left text-sm ${darkMode ? 'hover:bg-gray-700 dark:hover:bg-gray-600' : 'hover:bg-gray-200'} transition duration-150 ease-in-out rounded-md`}
          onClick={() => window.open(`https://explorer.example.com/address/${address}`, '_blank')}
        >
          <FaExternalLinkAlt className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          <span>View on Explorer</span>
        </button>
        <button
          className={`flex items-center space-x-2 p-4 text-left text-sm ${darkMode ? 'text-red-600 hover:bg-red-700' : 'text-red-600 hover:bg-red-50'} transition duration-150 ease-in-out rounded-md`}
          onClick={close}
        >
          <FaSignOutAlt />
          <span>Disconnect</span>
        </button>
      </div>
    </div>
  );
};

export default WalletDropdown;
