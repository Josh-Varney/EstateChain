import React, { useState, useEffect } from "react";
import Sidebar from "./components/main/Sidebar";
import WalletPrompt from "./components/prompts/WalletWarningPrompt";
import WalletDropdown from "./components/prompts/WalletConnected";
import CardGrid from "./components/main/CardGrid";
import HeaderBar from "./components/main/HeaderBar";
import ProfileDropdown from "./components/prompts/ProfileDropdown";
import NotificationDropdown from "./components/prompts/NotificationDropdown";

const DummyDashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
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
        <HeaderBar darkMode={darkMode} onWalletClick={toggleWalletPrompt} onProfileClick={toggleProfilePrompt} onNotiicationClick={toggleNotificationPrompt}/>

        {/* Main Content Area */}
        <CardGrid darkMode={darkMode} />

        {/* Wallet Prompts */}
        {walletConnectPrompt && (
          <WalletPrompt close={() => setWalletConnectPrompt(false)} />
        )}
        {walletConnectedPrompt && (
          <WalletDropdown
            close={() => setWalletConnectedPrompt(false)}
            isOpen={walletConnectedPrompt}
          />
        )}

        {notificationPrompt && (
          <NotificationDropdown close={() => setNotificationPrompt(false)} isOpen={notificationPrompt} notifications={[]} />
        )}

        {/* Profile Dropdown */}
        {profilePrompt && (
          <ProfileDropdown
            close={() => setProfilePrompt(false)}
            isOpen={profilePrompt}
          />
        )}
      </div>
    </div>
  );
};

export default DummyDashboard;
