import React from "react";
import WalletGridCard from "../grid-cards/Wallet-Card";
import CalendarCard from "../grid-cards/Calendar-Card";
import HousingAssetCard from "../grid-cards/Assets-Card";
import FakeCryptoListCard from "../grid-cards/CryptoPrices";
import GlobalTransactionsCard from "../grid-cards/GlobalTransactions";
import LatestAssetCard from "../grid-cards/LatestAsset";
import { FaBitcoin, FaEthereum } from "react-icons/fa";

interface CardGridProps {
  darkMode: boolean;
}

const accounts = [
  { id: "1", name: "Account 1", balance: 13918401 },
  { id: "2", name: "Account 2", balance: 7328910 },
];

const cryptocurrencies = [
  { id: "btc", name: "Bitcoin", icon: <FaBitcoin /> },
  { id: "eth", name: "Ethereum", icon: <FaEthereum /> },
  { id: "ltc", name: "Litecoin", icon: <FaEthereum /> },
];

const revenueSources = [
  { id: "rental", name: "Rental Income", value: 25000 },
  { id: "appreciation", name: "Asset Appreciation", value: 20000 },
];

const housingAssets = [
  {
    propertyType: "Condo",
    location: "456 Elm St, Miami, FL",
    purchasePrice: 300000,
    purchaseDate: "2020-01-20",
    currentValue: 350000,
    mortgageBalance: 200000,
    imageUrl: "https://via.placeholder.com/400",
    improvements: [
      { description: "Bathroom Renovation", cost: 10000, date: "2022-03-01" },
    ],
    valueHistory: [
      { date: "2020-01-20", value: 300000 },
      { date: "2023-01-20", value: 350000 },
    ],
  },
];

const CardGrid: React.FC<CardGridProps> = ({ darkMode }) => {
  return (
    <div
      className={`
        min-h-screen
        w-full
        p-4
        sm:p-6
        transition-colors
        duration-300
        ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}
        overflow-y-auto
        overflow-x-hidden
      `}
    >
      <div
        className="
          grid
          gap-4
          sm:gap-6
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          xl:grid-cols-6
        "
      >
        {/* Wallet Card */}
        <div
          className="
            col-span-2
            md:col-span-1
            lg:col-span-2
            xl:col-span-2
            w-full
            overflow-hidden
            rounded-lg
            shadow-md
            transition-transform
            duration-300
          "
        >
          <WalletGridCard
            darkMode={true}
            accounts={accounts}
            cryptocurrencies={cryptocurrencies}
            revenueSources={revenueSources}
          />
        </div>

        {/* Calendar Card */}
        <div
          className="
            col-span-2
            md:col-span-1
            lg:col-span-3
            xl:col-span-2
            w-full
            overflow-hidden
            rounded-lg
            shadow-md
            transition-transform
            duration-300
          "
        >
          <CalendarCard darkMode={darkMode} />
        </div>

        {/* Crypto Price List Card */}
        <div
          className="
            col-span-2
            md:col-span-2
            lg:col-span-2
            xl:col-span-2
            w-full
            overflow-hidden
            rounded-lg
            shadow-md
            transition-transform
            duration-300
          "
        >
          <FakeCryptoListCard darkMode={darkMode} />
        </div>

        {/* Housing Asset Cards */}
        {housingAssets.map((asset, index) => (
          <div
            key={index}
            className="
              col-span-2
              lg:col-span-2
              xl:col-span-2
              w-full
              overflow-hidden
              rounded-lg
              shadow-md
              transition-transform
              duration-300
            "
          >
            <HousingAssetCard darkMode={darkMode} asset={asset} />
          </div>
        ))}

        {/* Latest Asset Card */}
        <div
          className="
            col-span-2
            lg:col-span-4
            xl:col-span-4
            w-full
            overflow-hidden
            rounded-lg
            shadow-md
            transition-transform
            duration-300
          "
        >
          <LatestAssetCard darkMode={darkMode} />
        </div>

        {/* Global Transactions Card */}
        <div
          className="
            col-span-2
            lg:col-span-6
            xl:col-span-6
            w-full
            overflow-hidden
            rounded-lg
            shadow-md
            transition-transform
            duration-300
          "
        >
          <GlobalTransactionsCard darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default CardGrid;
