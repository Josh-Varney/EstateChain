// WalletGridCard.tsx

import React, { FC } from "react";

interface WalletGridCardProps {
  darkMode: boolean;
}

const WalletGridCard: FC<WalletGridCardProps> = ({ darkMode }) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-lg transition-colors duration-300 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div
        className={`flex flex-col ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-semibold">Your Balances</h1>
          <span className="text-sm font-medium">CryptoChoice</span>
        </div>

        <hr
          className={`my-2 border-gray-300 ${
            darkMode ? "border-gray-700" : "border-gray-300"
          }`}
        />

        {/* Content */}
        <div className="space-y-2">
          <h2 className="text-sm font-medium">Balance</h2>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">£13,918,401</span>
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              Icon
            </div>
          </div>
          <p className="text-sm">
            Compared to Last Month:{" "}
            <span className="font-semibold">382</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletGridCard;
