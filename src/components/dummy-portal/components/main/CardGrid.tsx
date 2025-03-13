import React, { useEffect, useState } from "react";
import WalletGridCard from "../grid-cards/Wallet-Card";
import CalendarCard from "../grid-cards/Calendar-Card";
import HousingAssetCard from "../grid-cards/Assets-Card";
import FakeCryptoListCard from "../grid-cards/CryptoPrices";
import GlobalTransactionsCard from "../grid-cards/GlobalTransactions";
import LatestAssetCard from "../grid-cards/LatestAsset";
import { FaBitcoin, FaEthereum } from "react-icons/fa";

interface CardGridProps {
  darkMode: boolean;
  mode: "buyer" | "seller";
}

const cryptocurrencies = [
  { id: "SETH", name: "SepoliaEth", icon: <FaBitcoin /> },
  { id: "HETH", name: "HoleskyEth", icon: <FaEthereum /> },
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

const CardGrid: React.FC<CardGridProps> = ({ darkMode, mode }) => {

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function fetchAccounts() {
      if (window.ethereum) {
        try {
          const userAccounts = await window.ethereum.request({ method: "eth_requestAccounts" });

          // Format accounts with id, name (set as address), and balance
          const formattedAccounts = userAccounts.map((address, index) => ({
            id: (index + 1).toString(), // Convert index to string for id
            name: `${address.slice(0, 5)}...${address.slice(-4)}`, // Trim address (first 5 and last 4 characters)
            balance: 0, // Balance set to 0
          }));  


          console.log(formattedAccounts);
          setAccounts(formattedAccounts);
          console.log("Connected accounts:", formattedAccounts);
        } catch (error) {
          console.error("Error fetching accounts:", error);
        }
      } else {
        console.error("Ethereum provider not found. Install MetaMask!");
      }
    }

    fetchAccounts();
  }, []);

 

  
  // Call the function to fetch accounts
  

  // Get Test Network Balances for all addresses linked to their account 

  // Get the newest housing asset and change the housingAsserts

  //

  return (
    <div
      className={`
        min-h-screen
        w-full
        p-4
        transition-colors
        duration-300
        overflow-y-auto
        overflow-x-hidden
        ${darkMode ? "bg-gradient-to-b from-gray-800 to-gray-900" : ""}
      `}
    >
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          xl:grid-cols-6
          pb-12
        "
      >
        {mode === "buyer" && (
          <>
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
                transition-transform
                duration-300
              "
            >
              <WalletGridCard
                darkMode={darkMode}
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
                sm:col-span-2
                md:col-span-1
                lg:col-span-2
                xl:col-span-2
                w-full
                overflow-hidden
                rounded-lg
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
                  sm:col-span-2
                  md:col-span-1
                  lg:col-span-2
                  xl:col-span-2
                  w-full
                  overflow-hidden
                  rounded-lg
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
                transition-transform
                duration-300
              "
            >
              <GlobalTransactionsCard darkMode={darkMode} />
            </div>
          </>
        )}

        {mode === "seller" && (
          <>
            {/* Seller-Specific Content */}
            {/* Add content specifically for sellers */}
            <div
              className="
                col-span-2
                md:col-span-1
                lg:col-span-3
                xl:col-span-3
                w-full
                overflow-hidden
                rounded-lg
                transition-transform
                duration-300
              "
            >
              <CalendarCard darkMode={darkMode} />
            </div>

            <div
              className="
                col-span-2
                lg:col-span-4
                xl:col-span-4
                w-full
                overflow-hidden
                rounded-lg
                transition-transform
                duration-300
              "
            >
              <GlobalTransactionsCard darkMode={darkMode} />
            </div>

            {/* Example for seller mode: analytics */}
            <div
              className="
                col-span-2
                sm:col-span-1
                lg:col-span-2
                xl:col-span-2
                w-full
                overflow-hidden
                rounded-lg
                transition-transform
                duration-300
              "
            >
              <LatestAssetCard darkMode={darkMode} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardGrid;
