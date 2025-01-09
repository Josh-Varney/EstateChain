import React, { useState, useEffect } from "react";
import Sidebar from "../../main/Sidebar";
import HeaderBar from "../../main/HeaderBar";
import Prompts from "../../prompts/Prompts";

const DisplayProperty: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isBuyer, setIsBuyer] = useState(true);
  const [walletConnectPrompt, setWalletConnectPrompt] = useState(false);
  const [walletConnectedPrompt, setWalletConnectedPrompt] = useState(false);
  const [notificationPrompt , setNotificationPrompt] = useState(false); 
  const [profilePrompt, setProfilePrompt] = useState(false);

  const toggleWalletPrompt = () => {
    if (localStorage.getItem("connectedAccount")) {
      setWalletConnectedPrompt((prev) => !prev); // Toggle connected prompt
    } else {
      setWalletConnectPrompt((prev) => !prev); // Toggle wallet connect prompt
    }
  };

  const toggleBuyerSeller = () => {
    setIsBuyer((prevState) => !prevState);
  };

  const toggleIsBuyer = () => {
    setIsBuyer((prevIsBuyer) => !prevIsBuyer);
  };

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
        <HeaderBar darkMode={darkMode} onWalletClick={toggleWalletPrompt} onProfileClick={toggleProfilePrompt} onNotiicationClick={toggleNotificationPrompt} onToggleBuyerSeller={toggleBuyerSeller} isBuyer={isBuyer}/>

        

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

export default DisplayProperty;
