import React, { FC, useState, ChangeEvent } from "react";

interface FakeCryptoData {
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number; // Percentage change in the last 24 hours
  iconUrl: string;
}

interface FakeCryptoListCardProps {
  darkMode: boolean;
}

const FakeCryptoListCard: FC<FakeCryptoListCardProps> = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterChange, setFilterChange] = useState<"all" | "positive" | "negative">("all");

  // Sample fakenet coins data
  const fakenetCryptos: FakeCryptoData[] = [
    {
      name: "TestCoin Alpha",
      symbol: "TCA",
      price: 1.25,
      priceChange24h: 2.5,
      iconUrl: "https://via.placeholder.com/48?text=TCA",
    },
    {
      name: "BetaToken",
      symbol: "BTK",
      price: 0.75,
      priceChange24h: -1.2,
      iconUrl: "https://via.placeholder.com/48?text=BTK",
    },
    {
      name: "GammaCash",
      symbol: "GMC",
      price: 2.5,
      priceChange24h: 0.5,
      iconUrl: "https://via.placeholder.com/48?text=GMC",
    },
    {
      name: "DeltaDollar",
      symbol: "DDL",
      price: 3.0,
      priceChange24h: -0.8,
      iconUrl: "https://via.placeholder.com/48?text=DDL",
    },
    {
      name: "EpsilonEther",
      symbol: "EPE",
      price: 4.75,
      priceChange24h: 1.5,
      iconUrl: "https://via.placeholder.com/48?text=EPE",
    },
    {
      name: "ZetaZero",
      symbol: "ZTZ",
      price: 0.95,
      priceChange24h: -2.0,
      iconUrl: "https://via.placeholder.com/48?text=ZTZ",
    },
    // Add more fakenet coins as needed
  ];

  // Handle search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (filter: "all" | "positive" | "negative") => {
    setFilterChange(filter);
  };

  // Filter cryptocurrencies based on search term and price change
  const filteredCryptos = fakenetCryptos.filter((crypto) => {
    const matchesSearch =
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterChange === "all"
        ? true
        : filterChange === "positive"
        ? crypto.priceChange24h > 0
        : crypto.priceChange24h < 0;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 max-w-lg mx-auto h-full">
      <div
        className={`
          flex-grow
          flex
          flex-col
          p-4
          rounded-lg
          shadow-md
          transition-colors
          duration-300
          ${darkMode ? "bg-gray-800" : "bg-white"}
          ${darkMode ? "text-gray-300" : "text-gray-600"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Fakenet Cryptos</h3>
          <span className="text-sm font-medium">CryptoChoice</span>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or symbol..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={`
            mt-4
            px-3 py-2
            rounded
            border
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-black"}
          `}
        />

        {/* Filter Buttons */}
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => handleFilterChange("all")}
            className={`
              px-3 rounded
              ${filterChange === "all"
                ? "bg-blue-500 text-white"
                : darkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
            `}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange("positive")}
            className={`
              px-3 rounded
              ${filterChange === "positive"
                ? "bg-green-500 text-white"
                : darkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
            `}
          >
            Positive
          </button>
          <button
            onClick={() => handleFilterChange("negative")}
            className={`
              px-3 py-1 rounded
              ${filterChange === "negative"
                ? "bg-red-500 text-white"
                : darkMode
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
            `}
          >
            Negative
          </button>
        </div>

        {/* Crypto List */}
        <div className="overflow-y-auto flex-grow mt-4">
          {filteredCryptos.length > 0 ? (
            <ul className="space-y-2">
              {filteredCryptos.map((crypto) => (
                <li key={crypto.symbol} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={crypto.iconUrl}
                      alt={`${crypto.name} icon`}
                      className="h-6 w-6"
                    />
                    <div>
                      <span className="font-medium">{crypto.name}</span>
                      <span className="text-xs uppercase text-gray-500 ml-1">({crypto.symbol})</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">£{crypto.price.toLocaleString()}</span>
                    <br />
                    <span
                      className={`text-xs font-semibold ${
                        crypto.priceChange24h > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {crypto.priceChange24h > 0 ? "+" : ""}
                      {crypto.priceChange24h}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm">No cryptocurrencies match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FakeCryptoListCard;
