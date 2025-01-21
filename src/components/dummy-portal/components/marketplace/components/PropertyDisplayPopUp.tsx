import React, { useState, useEffect } from "react";
import Sidebar from "../../main/Sidebar";
import HeaderBar from "../../main/HeaderBar";
import Prompts from "../../prompts/Prompts";
import { useParams } from "react-router-dom";
import PropertyGrid from "./PropertyGrid";

interface DisplayPropertyProps {}

type House = {
  id: number;
  propertyAddress: string;
  propertySettlement: string;
  propertyDescription: string;
  propertyAdded: string;
  propertyAddedBy: string;
  propertyAgent: {
    agentName: string;
    agentIcon: string;
    agentNumber: string;
    agentEmail: string;
  };
  propertyKeywords: string[];
  propertyPrice: number;
  propertyLocation: {
    latitude: number;
    longitude: number;
  };
  propertyCountry: string;
  propertySize: string;
  propertyBedrooms: number;
  propertyBathrooms: number;
  propertyTokenPrice: number;
  propertyTokensLeft: number;
  propertyType: string;
  propertyPostcode: string;
  propertyRental: boolean;
  propertyImage: string;
  propertyFeatured: boolean;
};

const DisplayProperty: React.FC<DisplayPropertyProps> = () => {

  const [house, setHouse] = useState<House>();
  const [darkMode, setDarkMode] = useState(false);
  const [isBuyer, setIsBuyer] = useState(true);
  const [walletConnectPrompt, setWalletConnectPrompt] = useState(false);
  const [walletConnectedPrompt, setWalletConnectedPrompt] = useState(false);
  const [notificationPrompt, setNotificationPrompt] = useState(false);
  const [profilePrompt, setProfilePrompt] = useState(false);

  // Toggle wallet prompts
  const toggleWalletPrompt = () => {
    if (localStorage.getItem("connectedAccount")) {
      setWalletConnectedPrompt((prev) => !prev);
    } else {
      setWalletConnectPrompt((prev) => !prev);
    }
  };

  // Toggle Buyer/Seller mode
  const toggleBuyerSeller = () => {
    setIsBuyer((prevState) => !prevState);
  };

  // Toggle profile prompt
  const toggleProfilePrompt = () => {
    setProfilePrompt((prev) => !prev);
  };

  // Toggle notification prompt
  const toggleNotificationPrompt = () => {
    setNotificationPrompt((prev) => !prev);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
    // Get the query string from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const houseString = urlParams.get('propertyID');

    if (houseString) {
      try {
        // Decode and parse the house object from the URL
        // Ensure that the houseString is a valid JSON string
        const decodedHouseString = decodeURIComponent(houseString);
  
        // Check if the string starts with a "{" (likely to be an object) before trying to parse
        if (decodedHouseString && decodedHouseString.startsWith("{")) {
          const parsedHouse = JSON.parse(decodedHouseString);
          setHouse(parsedHouse); // Set the house object in the state
        } else {
          console.error("The propertyID is not a valid JSON object:", decodedHouseString);
        }
      } catch (error) {
        console.error("Failed to parse house data from URL", error);
      }
    }
  }, []);

  return (
    <div
      className={`flex w-screen h-screen overflow-hidden ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <Sidebar darkMode={darkMode} setDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <div className="flex flex-col w-full h-full ml-20">
        <HeaderBar
          darkMode={darkMode}
          onWalletClick={toggleWalletPrompt}
          onProfileClick={toggleProfilePrompt}
          onNotiicationClick={toggleNotificationPrompt}
          onToggleBuyerSeller={toggleBuyerSeller}
          isBuyer={isBuyer}
        />

        {/* Scrollable Content */}
        <div className="flex-grow h-full overflow-y-auto">
          <PropertyGrid darkMode={darkMode} houseDisplayed={house} />
        </div>
      </div>

      {/* Prompts */}
      <Prompts
        walletConnectPrompt={walletConnectPrompt}
        walletConnectedPrompt={walletConnectedPrompt}
        profilePrompt={profilePrompt}
        notificationPrompt={notificationPrompt}
        closeWalletConnectPrompt={() => setWalletConnectPrompt(false)}
        closeWalletConnectedPrompt={() => setWalletConnectedPrompt(false)}
        closeProfilePrompt={() => setProfilePrompt(false)}
        closeNotificationPrompt={() => setNotificationPrompt(false)}
      />
    </div>
  );
};

export default DisplayProperty;
