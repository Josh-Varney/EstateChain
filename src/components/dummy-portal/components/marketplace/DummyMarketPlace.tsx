import React, { useState, useEffect } from "react";
import Sidebar from "../main/Sidebar";
import HeaderBar from "../main/HeaderBar";
import HouseDisplay from "./components/HouseSearchForm";
import Prompts from "../prompts/Prompts";
import AddPropertyButton from "./components/addPropertyButton";
import { ethers } from "ethers";

const DummyMarket: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isBuyer, setIsBuyer] = useState(true);
  const [walletConnectPrompt, setWalletConnectPrompt] = useState(false);
  const [walletConnectedPrompt, setWalletConnectedPrompt] = useState(false);
  const [profilePrompt, setProfilePrompt] = useState(false);
  const [notificationPrompt, setNotificationPrompt] = useState(false);

  // Toggle between wallet connect and wallet connected prompts
  const toggleWalletPrompt = () => {
    if (localStorage.getItem("connectedAccount")) {
      setWalletConnectedPrompt((prev) => !prev);
    } else {
      setWalletConnectPrompt((prev) => !prev);
    }
  };

    const handleWalletCheck = async () => {
      const isWalletConnected = async () => {
        if (!window.ethereum) {
          console.log("MetaMask is not installed");
          return false;
        }
    
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);
    
        if (accounts.length > 0) {
          console.log("Wallet is connected:", accounts[0]);
          return true;
        } else {
          console.log("No wallet connected");
          return false;
        }
      };
    
      const connected = await isWalletConnected();
    
      if (!connected) {
        setWalletConnectPrompt(true); // Show "Connect Wallet" prompt
        setWalletConnectedPrompt(false); // Ensure "Wallet Connected" prompt is hidden
      } else {
        setWalletConnectedPrompt(true); // Show "Wallet Connected" prompt
        setWalletConnectPrompt(false); // Hide "Connect Wallet" prompt
      }
    };

  const toggleBuyerSeller = () => {
    setIsBuyer((prevState) => !prevState);
  };

  const toggleNotificationPrompt = () => {
    setNotificationPrompt((prev) => !prev);
  }

  // Toggle profile dropdown
  const toggleProfilePrompt = () => {
    console.log(profilePrompt)
    setProfilePrompt((prev) => !prev);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  // Load saved theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  return (
    <div
      className={`flex w-screen h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <Sidebar darkMode={darkMode} setDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <div className="flex flex-col w-full h-full ml-20">
        <HeaderBar
          darkMode={darkMode}
          isBuyer={isBuyer}
          onWalletClick={toggleWalletPrompt}
          onProfileClick={toggleProfilePrompt}
          onNotiicationClick={toggleNotificationPrompt} 
          onToggleBuyerSeller={toggleBuyerSeller}    
          titleName="Mock Marketplace"
        />

        <HouseDisplay darkMode={darkMode} />

        <Prompts
          walletConnectPrompt={walletConnectPrompt}
          walletConnectedPrompt={walletConnectedPrompt}
          profilePrompt={profilePrompt}
          notificationPrompt={notificationPrompt}
          setWalletConnectPrompt={setWalletConnectPrompt}
          setWalletConnectedPrompt={setWalletConnectedPrompt}
          closeProfilePrompt={() => setProfilePrompt(false)}
          closeNotificationPrompt={() => setNotificationPrompt(false)}
        />

        {!isBuyer && <AddPropertyButton />}
      </div>
    </div>
  );
};

export default DummyMarket;
