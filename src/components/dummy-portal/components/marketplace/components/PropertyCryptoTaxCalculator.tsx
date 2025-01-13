import React, { useState } from "react";
import { FaEthereum } from "react-icons/fa";

const CryptoTaxCalculator = ({ title }: { title: string }) => {
  const [cryptoType, setCryptoType] = useState<string>("ETH"); // Selected cryptocurrency
  const [cryptoAmount, setCryptoAmount] = useState<string>(""); // Crypto amount
  const [cryptoPrice, setCryptoPrice] = useState<string>(""); // Price per unit
  const [taxRate, setTaxRate] = useState<string>(""); // Tax rate in percentage
  const [gasFee, setGasFee] = useState<string>(""); // Gas fee for the transaction
  const [calculatedTax, setCalculatedTax] = useState<number | null>(null); // Calculated tax
  const [totalCost, setTotalCost] = useState<number | null>(null); // Total cost including tax and gas

  const calculateTaxAndGas = () => {
    if (!cryptoAmount || !cryptoPrice || !taxRate || !gasFee) return;

    const amount = parseFloat(cryptoAmount);
    const price = parseFloat(cryptoPrice);
    const rate = parseFloat(taxRate);
    const gas = parseFloat(gasFee);

    const tax = (amount * price * rate) / 100;
    const total = tax + gas;

    setCalculatedTax(tax);
    setTotalCost(total);
  };

  const resetCalculator = () => {
    setCryptoType("ETH");
    setCryptoAmount("");
    setCryptoPrice("");
    setTaxRate("");
    setGasFee("");
    setCalculatedTax(null);
    setTotalCost(null);
  };

  return (
    <div className="w-full mx-auto p-6 border rounded-lg shadow-lg bg-gray-800 border-gray-700">
      {/* Header Section */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-gray-700 text-blue-400 rounded-full">
          <FaEthereum size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-200">{title}</h2>
      </div>

      {/* Inputs Section */}
      <div className="space-y-6">
        {/* Cryptocurrency Type */}
        <div>
          <label
            htmlFor="cryptoType"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Select Cryptocurrency
          </label>
          <select
            id="cryptoType"
            value={cryptoType}
            onChange={(e) => setCryptoType(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="ETH">Ethereum (ETH)</option>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="BNB">Binance Coin (BNB)</option>
            <option value="ADA">Cardano (ADA)</option>
            <option value="SOL">Solana (SOL)</option>
          </select>
        </div>

        {/* Crypto Amount */}
        <div>
          <label
            htmlFor="cryptoAmount"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Cryptocurrency Amount ({cryptoType})
          </label>
          <input
            id="cryptoAmount"
            type="number"
            value={cryptoAmount}
            onChange={(e) => setCryptoAmount(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder={`e.g., 1.2 ${cryptoType}`}
          />
        </div>

        {/* Price per Unit */}
        <div>
          <label
            htmlFor="cryptoPrice"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Price per Unit ($)
          </label>
          <input
            id="cryptoPrice"
            type="number"
            value={cryptoPrice}
            onChange={(e) => setCryptoPrice(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="e.g., 3500"
          />
        </div>

        {/* Tax Rate */}
        <div>
          <label
            htmlFor="taxRate"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Tax Rate (%)
          </label>
          <input
            id="taxRate"
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="e.g., 15"
          />
        </div>

        {/* Gas Fee */}
        <div>
          <label
            htmlFor="gasFee"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Gas Fee ($)
          </label>
          <input
            id="gasFee"
            type="number"
            value={gasFee}
            onChange={(e) => setGasFee(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-700 border-gray-600 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="e.g., 25"
          />
        </div>
      </div>

      {/* Results Section */}
      {calculatedTax !== null && totalCost !== null && (
        <div className="bg-gray-700 p-4 mt-6 rounded-lg text-gray-200">
          <p className="mb-2 text-lg">
            Tax Owed:{" "}
            <span className="font-bold text-blue-400">${calculatedTax.toFixed(2)}</span>
          </p>
          <p className="text-lg">
            Total Cost (Tax + Gas):{" "}
            <span className="font-bold text-blue-400">${totalCost.toFixed(2)}</span>
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        <button
          onClick={resetCalculator}
          className="px-4 py-2 bg-gray-600 text-gray-200 rounded-lg hover:bg-gray-500"
        >
          Reset
        </button>
        <button
          onClick={calculateTaxAndGas}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default CryptoTaxCalculator;
