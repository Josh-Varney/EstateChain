// src/components/CardGrid.tsx

import React from "react";
import WalletGridCard from "../grid-cards/Wallet-Card";
import CalendarCard from "../grid-cards/Calendar-Card";
import HousingAssetCard from "../grid-cards/Assets-Card";
import FakeCryptoListCard from "../grid-cards/CryptoPrices";
import GlobalTransactionsCard from "../grid-cards/GlobalTransactions";
import LatestAssetCard from "../grid-cards/LatestAsset";

interface CardGridProps {
  darkMode: boolean;
}

// Example transactions data
const sampleTransactions = [
  {
    id: 1,
    date: "2024-12-21",
    description: "Grocery Store",
    amount: 54.99,
    type: "debit",
  },
  {
    id: 2,
    date: "2024-12-20",
    description: "Freelance Payment",
    amount: 350,
    type: "credit",
  },
  {
    id: 3,
    date: "2024-12-19",
    description: "Coffee Shop",
    amount: 5.75,
    type: "debit",
  },
  {
    id: 4,
    date: "2024-12-18",
    description: "Streaming Subscription",
    amount: 14.99,
    type: "debit",
  },
  {
    id: 5,
    date: "2024-12-17",
    description: "Sold Old Furniture",
    amount: 60,
    type: "credit",
  },
  {
    id: 6,
    date: "2024-12-16",
    description: "Electric Bill",
    amount: 120,
    type: "debit",
  },
];

// Sample housing asset data
const sampleHousingAsset = {
  propertyType: "Single Family",
  location: "123 Main St, Springfield, IL",
  purchasePrice: 250000,
  currentValue: 320000,
  mortgageBalance: 150000,
  imageUrl: "https://images.unsplash.com/photo-1600607685362-cf365f694d68",
};

// Sample cryptocurrency data with eight cryptocurrencies
const sampleCryptos = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 29950.75,
    priceChange24h: -2.5,
    iconUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 1890.5,
    priceChange24h: 3.8,
    iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    price: 95.25,
    priceChange24h: 1.2,
    iconUrl: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
  },
  {
    name: "Ripple",
    symbol: "XRP",
    price: 0.75,
    priceChange24h: -1.1,
    iconUrl: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: 0.45,
    priceChange24h: 2.3,
    iconUrl: "https://cryptologos.cc/logos/cardano-ada-logo.png",
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    price: 320.5,
    priceChange24h: 1.5,
    iconUrl: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 22.75,
    priceChange24h: 4.2,
    iconUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    price: 5.25,
    priceChange24h: -0.8,
    iconUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
  },
  // Add more cryptocurrencies as needed
];

const CardGrid: React.FC<CardGridProps> = ({ darkMode }) => {
  return (
    <div
      className={`
        min-h-screen        /* Occupies at least the full viewport height */
        w-full              /* Spans the full viewport width */
        p-6                 /* Padding around the grid */
        transition-colors 
        duration-300 
        ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} 
        overflow-y-auto     /* Allows vertical scrolling */
        overflow-x-hidden   /* Hides any horizontal overflow */
      `}
    >
      <div
        className="
          grid
          gap-6
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {/* Wallet Card */}
        <div
          className="
            w-full
            overflow-hidden
            rounded-lg
            shadow-md
            transition-transform
            duration-300
            hover:shadow-xl
            hover:scale-105
          "
        >
          <WalletGridCard darkMode={darkMode} />
        </div>

        {/* Calendar Card */}
        <div
          className="
            w-full
            overflow-hidden
            rounded-lg
            shadow-md
            transition-transform
            duration-300
            hover:shadow-xl
            hover:scale-105
          "
        >
          <CalendarCard darkMode={darkMode} />
        </div>

        {/* Housing Asset Card */}
        <div
          className="
            w-full
            overflow-hidden
            rounded-lg
            shadow-md
            transition-transform
            duration-300
            hover:shadow-xl
            hover:scale-105
          "
        >
          <HousingAssetCard darkMode={darkMode} asset={sampleHousingAsset} />
        </div>

        {/* Crypto Price List Card */}
        <div
          className="
            w-full
            col-span-1
            sm:col-span-2
            md:col-span-2
            lg:col-span-2
            xl:col-span-2
            overflow-hidden
            rounded-lg
            shadow-md
            transition-transform
            duration-300
            hover:shadow-xl
            hover:scale-105
          "
        >
          <FakeCryptoListCard darkMode={darkMode} />
        </div>

        {/* Latest Asset Card */}
        <div
          className="
            w-full
            col-span-1
            sm:col-span-2
            md:col-span-2
            lg:col-span-1
            xl:col-span-1
            overflow-hidden
            rounded-lg
            shadow-md
            transition-transform
            duration-300
            hover:shadow-xl
            hover:scale-105
          "
        >
          <LatestAssetCard darkMode={darkMode} />
        </div>

        {/* Global Transactions Card */}
        <div
          className="
            w-full
            col-span-1
            sm:col-span-2
            md:col-span-2
            lg:col-span-1
            xl:col-span-1
            overflow-hidden
            rounded-lg
            shadow-md
            transition-transform
            duration-300
            hover:shadow-xl
            hover:scale-105
          "
        >
          <GlobalTransactionsCard darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default CardGrid;
