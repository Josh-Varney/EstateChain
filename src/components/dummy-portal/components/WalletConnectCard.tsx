import React from 'react';
import { FaWallet } from 'react-icons/fa';

interface WalletCardProps {
  darkMode: boolean;
  className?: string; // Allow additional classes
  walletFunction: () => Promise<void>; // Function to handle wallet actions
}

const WalletCard: React.FC<WalletCardProps> = ({ darkMode, className = '', walletFunction }) => {
  return (
    <div
      onClick={walletFunction}
      className={`cursor-pointer p-4 rounded-lg shadow-md transition-colors duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} ${className}`}
    >
      <FaWallet className="text-2xl" />
      <p>This is a wallet</p>
    </div>
  );
};

export default WalletCard;
