import React, { useState, useEffect } from "react";
import Sidebar from "../main/Sidebar";
import WalletPrompt from "../prompts/WalletWarningPrompt";
import WalletDropdown from "../prompts/WalletConnected";
import HeaderBar from "../main/HeaderBar";
import HouseDisplay from "./components/HouseSearchForm";
import ProfileDropdown from "../prompts/ProfileDropdown";
import NotificationDropdown from "../prompts/NotificationDropdown";

const DummyMarket: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
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
          darkMode={darkMode}
          onWalletClick={toggleWalletPrompt}
          onProfileClick={toggleProfilePrompt}
          onNotiicationClick={toggleNotificationPrompt}
        />

        <HouseDisplay darkMode={darkMode} />

        {/* Wallet Prompts */}
        {walletConnectPrompt && (
          <WalletPrompt close={() => setWalletConnectPrompt(false)} />
        )}

        {walletConnectedPrompt && (
          <WalletDropdown close={() => setWalletConnectedPrompt(false)} isOpen={false} />
        )}

        {notificationPrompt &&(
          <NotificationDropdown close={() => setNotificationPrompt(false)} isOpen={false} notifications={[]} />
        )}

        {/* Profile Dropdown */}
        {profilePrompt && (
          <ProfileDropdown close={() => setProfilePrompt(false)} isOpen={false} />
        )}
      </div>
    </div>
  );
};

export default DummyMarket;
