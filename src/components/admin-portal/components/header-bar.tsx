import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

interface HeaderBarProps {
  setActiveScreen: (screen: 'faq' | 'listings' | 'otherServices') => void; // Update to include 'otherServices'
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  toggleDarkMode: () => void; // Add toggleDarkMode to the props
}

const HeaderBar: React.FC<HeaderBarProps> = ({ setActiveScreen, setDarkMode, darkMode, toggleDarkMode }) => {

  return (
    <div className={`flex justify-between items-center h-16 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}>
      {/* Left Icon */}
      <div className="flex items-center space-x-2">
        <i className="fas fa-home text-xl text-gray-600 dark:text-gray-300"></i> {/* Left icon */}
      </div>

      {/* Middle Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveScreen('faq')}
          className="text-lg font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
        >
          Manage FAQ
        </button>
        <button
          onClick={() => setActiveScreen('listings')}
          className="text-lg font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
        >
          Manage Listings
        </button>
        <button
          onClick={() => setActiveScreen('otherServices')} // New button to manage "Other Services"
          className="text-lg font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300"
        >
          Other Services
        </button>
      </div>

      {/* Dark Mode Toggle (right) */}
      <div
        onClick={toggleDarkMode} // Use the passed toggleDarkMode function here
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
  );
};

export default HeaderBar;
