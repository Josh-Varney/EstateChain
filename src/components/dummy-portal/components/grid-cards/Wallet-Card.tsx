import React, { FC, useState } from "react";
import { FaBitcoin, FaWallet } from "react-icons/fa";

interface WalletGridCardProps {
  darkMode: boolean;
  accounts: { id: string; name: string; balance: number }[];
  cryptocurrencies: { id: string; name: string; icon: JSX.Element }[];
  revenueSources: { id: string; name: string; value: number }[];
}

const WalletGridCard: FC<WalletGridCardProps> = ({
  darkMode,
  accounts,
  cryptocurrencies,
  revenueSources,
}) => {
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [selectedCrypto, setSelectedCrypto] = useState(cryptocurrencies[0]);
  const [selectedRevenue, setSelectedRevenue] = useState(revenueSources[0]);

  const handleAccountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const account = accounts.find((acc) => acc.id === event.target.value);
    if (account) setSelectedAccount(account);
  };

  const handleCryptoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const crypto = cryptocurrencies.find((c) => c.id === event.target.value);
    if (crypto) setSelectedCrypto(crypto);
  };

  const handleRevenueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const revenue = revenueSources.find((r) => r.id === event.target.value);
    if (revenue) setSelectedRevenue(revenue);
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 max-w-lg mx-auto">
      {/* Wallet Card */}
      <div
        className={`p-6 rounded-lg shadow-lg transition-transform duration-300 ${
          darkMode ? "bg-gray-900 border border-gray-700 text-gray-100" : "bg-white border border-gray-300 text-gray-900"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <FaWallet className="text-blue-500" /> Wallet Overview
          </h1>
          <select
            className={`text-sm px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"
            }`}
            value={selectedAccount.id}
            onChange={handleAccountChange}
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Select Cryptocurrency
          </label>
          <select
            className={`w-full text-sm px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"
            }`}
            value={selectedCrypto.id}
            onChange={handleCryptoChange}
          >
            {cryptocurrencies.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.name}
              </option>
            ))}
          </select>
        </div>

        <div
          className={`p-3 rounded-lg flex items-center justify-between ${
            darkMode ? "bg-blue-800 text-gray-100" : "bg-blue-500 text-white"
          }`}
        >
          <div>
            <h2 className="text-sm font-medium">Current Balance</h2>
            <p className="text-2xl font-bold mt-1">
              £{selectedAccount.balance.toLocaleString()}
            </p>
          </div>
          <div className="text-3xl">{selectedCrypto.icon}</div>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Compared to Last Month:{" "}
          <span className="font-medium text-green-500">+382%</span>
        </p>
      </div>

      {/* Revenue Card */}
      <div
        className={`p-6 rounded-lg shadow-lg border transition-transform duration-300 ${
          darkMode ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-white border-gray-300 text-gray-900"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">Revenue</h1>
          <select
            className={`text-sm px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"
            }`}
            value={selectedRevenue.id}
            onChange={handleRevenueChange}
          >
            {revenueSources.map((revenue) => (
              <option key={revenue.id} value={revenue.id}>
                {revenue.name}
              </option>
            ))}
          </select>
        </div>
        <p className="text-sm text-gray-500 mb-2">
          Revenue from {selectedRevenue.name}:
        </p>
        <div
          className={`p-3 rounded-lg flex items-center justify-between ${
            darkMode ? "bg-green-800 text-gray-100" : "bg-green-500 text-white"
          }`}
        >
          <div>
            <h2 className="text-sm font-medium">Total Revenue</h2>
            <p className="text-2xl font-bold mt-1">
              £{selectedRevenue.value.toLocaleString()}
            </p>
          </div>
          <div className="text-3xl">
            <FaBitcoin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletGridCard;
