import React, { useState, useEffect } from "react";
import Sidebar from "../main/Sidebar";
import HeaderBar from "../main/HeaderBar";
import Prompts from "../prompts/Prompts";
import TransactionScreen from "./components/Transactions";

const DummyTransactions: React.FC = () => {
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

  const toggleNotificationPrompt = () => {
    setNotificationPrompt((prev) => !prev);
  }

  const toggleIsBuyer = () => {
    setIsBuyer((prevIsBuyer) => !prevIsBuyer);
  };

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
      className={`flex w-screen h-screen overflow-hidden ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <Sidebar darkMode={darkMode} setDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <div className="flex flex-col w-full h-full ml-20">
        <HeaderBar
          onToggleBuyerSeller={toggleIsBuyer}
          darkMode={darkMode}
          onWalletClick={toggleWalletPrompt}
          onProfileClick={toggleProfilePrompt}
          onNotiicationClick={toggleNotificationPrompt} isBuyer={false}        
        />

        <TransactionScreen />

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
    </div>
  );
};

export default DummyTransactions;
