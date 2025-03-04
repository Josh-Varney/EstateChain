import React, { useState, useEffect } from "react";
import HeaderBar from "./components/header-bar";
import ManageFAQ from "./components/manage-faq";

const LiveHub: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeScreen, setActiveScreen] = useState<
    "faq" | "listings" | "otherServices"
  >("faq");

  // Set theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  // Toggle dark mode and save preference in localStorage
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  return (
    <div
      className={`flex flex-col w-screen h-screen overflow-hidden ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header Bar */}
      <HeaderBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        toggleDarkMode={toggleDarkMode}
        setActiveScreen={setActiveScreen}
      />

      {/* Main Content Area */}
      <div className={`flex flex-1 w-full h-full p-4 ${darkMode ? "bg-gray-800" : "bg-gray-300"}`}>
        {/* Conditional rendering of content based on active screen */}
        {activeScreen === "faq" ? (
          <div className="flex w-full h-full">
            <ManageFAQ />
          </div>
        ) : activeScreen === "listings" ? (
          <div className="flex w-full h-full items-center justify-center">
            <h2 className="text-2xl font-semibold">Manage Listings</h2>
            {/* Add Listing management content here */}
          </div>
        ) : (
          <div className="flex w-full h-full items-center justify-center">
            <h2 className="text-2xl font-semibold">Other Services</h2>
            {/* Add "Other Services" management content here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveHub;
