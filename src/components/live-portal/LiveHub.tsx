// HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import Sidebar from './components/Sidebar';

const LiveHub: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode and save preference in localStorage
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  // Set theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  return (
    <div className={`flex flex-row w-screen h-screen overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      
      {/* Sidebar */}
      <div className="flex h-full">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full h-full">
        
        {/* Header Bar */}
        <div className={`flex justify-end items-center h-16 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
          <div
            onClick={toggleDarkMode}
            className="rounded-full cursor-pointer p-2 transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400 text-2xl hover:text-yellow-300 transition-colors duration-300" />
            ) : (
              <FaMoon className="text-gray-600 text-2xl hover:text-gray-500 transition-colors duration-300" />
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className={`flex w-full h-full p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-300'}`}>
          {/* Add your main content components here */}
        </div>

      </div>
    </div>
  );
};

export default LiveHub;
