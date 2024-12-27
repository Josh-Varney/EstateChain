import React, { useState, useEffect } from "react";
import Sidebar from "../main/Sidebar";
import WalletPrompt from "../prompts/WalletWarningPrompt";
import WalletDropdown from "../prompts/WalletConnected";
import HeaderBar from "../main/HeaderBar";
import HouseDisplay from "./components/HouseSearchForm";

const DummyMarket: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [walletConnectPrompt, setWalletConnectPrompt] = useState(false);
  const [walletConnectedPrompt, setWalletConnectedPrompt] = useState(false);

  const toggleWalletPrompt = () => {
    if (localStorage.getItem("connectedAccount")) {
      setWalletConnectedPrompt((prev) => !prev); // Toggle connected prompt
    } else {
      setWalletConnectPrompt((prev) => !prev); // Toggle wallet connect prompt
    }
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
      {/* Sidebar */}
      <Sidebar darkMode={darkMode} setDarkMode={toggleDarkMode} />

      {/* Main Content */}
      <div className="flex flex-col w-full h-full ml-20">
        <HeaderBar darkMode={darkMode} onWalletClick={toggleWalletPrompt}/>

        <HouseDisplay darkMode={darkMode} />

        {/* Wallet Prompts */}
        {walletConnectPrompt && (
          <WalletPrompt close={() => setWalletConnectPrompt(false)} />
        )}
        {walletConnectedPrompt && (
          <WalletDropdown
            close={() => setWalletConnectedPrompt(false)}
            isOpen={true}
          />
        )}
      </div>
    </div>
  );
};

export default DummyMarket;
