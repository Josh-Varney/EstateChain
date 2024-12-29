import React, { useState, useEffect } from "react";
import Sidebar from "../main/Sidebar";
import HeaderBar from "../main/HeaderBar";
import Prompts from "../prompts/Prompts";
import TokenizedRealEstateDisplay from "./components/AnalyticsDisplay";

const DummyAnalytics: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isBuyer, setIsBuyer] = useState(true);
  const [walletConnectPrompt, setWalletConnectPrompt] = useState(false);
  const [walletConnectedPrompt, setWalletConnectedPrompt] = useState(false);
  const [profilePrompt, setProfilePrompt] = useState(false);
  const [notificationPrompt, setNotificationPrompt] = useState(false);

  const toggleWalletPrompt = () => {
    if (localStorage.getItem("connectedAccount")) {
      setWalletConnectedPrompt((prev) => !prev);
    } else {
      setWalletConnectPrompt((prev) => !prev);
    }
  };

  const toggleBuyerSeller = () => {
    setIsBuyer((prevState) => !prevState);
  };

  const toggleIsBuyer = () => {
    setIsBuyer((prevIsBuyer) => !prevIsBuyer); // Update the state
  };


  const toggleNotificationPrompt = () => {
    setNotificationPrompt((prev) => !prev);
  };

  const toggleProfilePrompt = () => {
    setProfilePrompt((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

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
      <Sidebar darkMode={darkMode} setDarkMode={toggleDarkMode} />

      <div className="flex flex-col w-full h-full ml-20">
        <HeaderBar
          darkMode={darkMode}
          isBuyer={isBuyer}
          onWalletClick={toggleWalletPrompt}
          onProfileClick={toggleProfilePrompt}
          onNotiicationClick={toggleNotificationPrompt}
          onToggleBuyerSeller={toggleBuyerSeller}
        />

        <TokenizedRealEstateDisplay />

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

export default DummyAnalytics;
