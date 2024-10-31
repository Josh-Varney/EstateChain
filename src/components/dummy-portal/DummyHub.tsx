// HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { CoinBaseConnect, MetaMaskConnect } from '../../wallet-connect/web3';
import Sidebar from './components/Sidebar';
import Card from './components/HomeCard';
import WalletCard from './components/WalletConnectCard';

const HomeScreen: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  return (
    <div className={`flex w-screen h-screen overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      
      {/* Sidebar */}
      <Sidebar darkMode={darkMode} />

      {/* Main Content */}
      <div className="flex flex-col w-full h-full ml-20">
        
        {/* Header Bar */}
        <div className={`flex justify-end items-center h-16 px-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
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
        <div className={`flex w-full h-full p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {/* Large and Small Cards */}
            <Card title="Large Card 1" description="This is a large card." darkMode={darkMode} className="col-span-2 row-span-2" />
            <WalletCard darkMode={darkMode} walletFunction={CoinBaseConnect} />
            <Card title="Small Card 2" description="This is a small card." darkMode={darkMode} />
            <Card title="Large Card 2" description="This is another large card." darkMode={darkMode} className="col-span-2 row-span-1" />
            <Card title="Small Card 3" description="This is a small card." darkMode={darkMode} />
            <Card title="Small Card 4" description="This is a small card." darkMode={darkMode} />
            <Card title="Large Card 3" description="This is a tall large card." darkMode={darkMode} className="col-span-1 row-span-2" />
            <Card title="Small Card 5" description="This is a small card." darkMode={darkMode} />
            <Card title="Small Card 6" description="This is a small card." darkMode={darkMode} />
            <Card title="Small Card 7" description="This is a small card." darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
