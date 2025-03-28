import React, { useState, useEffect } from "react";
import Sidebar from "./components/main/Sidebar";
import CardGrid from "./components/main/CardGrid";
import HeaderBar from "./components/main/HeaderBar";
import Prompts from "./components/prompts/Prompts";
import { ethers } from "ethers";
import { handleWalletCheck } from "../../managers/profile/check-wallet";

const DummyDashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isBuyer, setIsBuyer] = useState(true);
  const [walletConnectPrompt, setWalletConnectPrompt] = useState(false);
  const [walletConnectedPrompt, setWalletConnectedPrompt] = useState(false);
  const [notificationPrompt , setNotificationPrompt] = useState(false); 
  const [profilePrompt, setProfilePrompt] = useState(false);


  const toggleWalletPrompt = async () => {
    await handleWalletCheck(setWalletConnectPrompt, setWalletConnectedPrompt)
  };

  const toggleBuyerSeller = () => {
    setIsBuyer((prevState) => !prevState);
  };

  // const toggleIsBuyer = () => {
  //   setIsBuyer((prevIsBuyer) => !prevIsBuyer);
  // };

  const toggleProfilePrompt = () => {
    setProfilePrompt((prev) => !prev);
  };

  const toggleNotificationPrompt = () => {
    setNotificationPrompt((prev) => !prev);
  }

  const toggleDarkMode = () => {
    const newTheme = !darkMode ? "dark" : "light";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
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
      {/* Sidebar */}
      <Sidebar darkMode={darkMode} setDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <div className="flex flex-col w-full h-full ml-20">
        <HeaderBar darkMode={darkMode} onWalletClick={toggleWalletPrompt} onProfileClick={toggleProfilePrompt} onNotiicationClick={toggleNotificationPrompt} onToggleBuyerSeller={toggleBuyerSeller} isBuyer={isBuyer} titleName="Dashboard"/>

        {/* Main Con tent Area */}
        <CardGrid darkMode={darkMode} mode={isBuyer ? "buyer" : "seller"} />

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
      </div>
    </div>
  );
};

export default DummyDashboard;
