import React, { useEffect, useRef, useState } from 'react';
import { FaExternalLinkAlt, FaCopy, FaSignOutAlt } from 'react-icons/fa';

interface WalletDropdownProps {
  close: () => void;
  address?: string;
  balance?: string;
  isOpen: boolean; // Tracks if the dropdown is open
}

const currencies = [
  { code: 'ETH', label: 'Ethereum' },
  { code: 'BTC', label: 'Bitcoin' },
  { code: 'USDT', label: 'Tether' },
];

const WalletDropdown: React.FC<WalletDropdownProps> = ({ close, address = '0x1234...abcd', balance = '0.00 ETH', isOpen }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('ETH');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [close]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    alert("Address copied to clipboard!");
  };

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
  };

  return (
    <div ref={dropdownRef} className="absolute right-4 mt-16 w-64 bg-white dark:bg-gray-900 shadow-lg rounded-md overflow-hidden z-50 animate-fadeIn">
      {/* Wallet Summary */}
      <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <p className="text-xs text-gray-600 dark:text-gray-400">Wallet Address</p>
        <p className="text-sm font-mono text-blue-700 dark:text-blue-400 truncate">{address}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
          Balance: <span className="font-semibold">{balance} {selectedCurrency}</span>
        </p>
      </div>

      {/* Currency Selector */}
      <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <label className="text-xs text-gray-600 dark:text-gray-400">Select Currency</label>
        <select
          value={selectedCurrency}
          onChange={(e) => handleCurrencyChange(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
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
          className="flex items-center space-x-2 p-4 text-left text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out rounded-md"
          onClick={handleCopyAddress}
        >
          <FaCopy className="text-gray-600 dark:text-gray-300" />
          <span>Copy Address</span>
        </button>
        <button
          className="flex items-center space-x-2 p-4 text-left text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out rounded-md"
          onClick={() => window.open(`https://explorer.example.com/address/${address}`, '_blank')}
        >
          <FaExternalLinkAlt className="text-gray-600 dark:text-gray-300" />
          <span>View on Explorer</span>
        </button>
        <button
          className="flex items-center space-x-2 p-4 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-700 transition duration-150 ease-in-out rounded-md"
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
