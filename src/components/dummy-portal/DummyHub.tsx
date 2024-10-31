// HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaWallet, FaUserCircle } from 'react-icons/fa';
import Sidebar from './components/Sidebar';
import Card from './components/HomeCard';
import WalletPrompt from './components/WalletWarningPrompt';
import WalletDropdown from './components/WalletConnected';

const HomeScreen: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [walletConnectPrompt, setWalletConnectPrompt] = useState(false);
  const [walletConnectedPrompt, setWalletConnectedPrompt] = useState(false);

  const toggleWalletPrompt = () => { 
    if (localStorage.getItem('connectedAccount')) {
      setWalletConnectedPrompt(prev => !prev); // Toggle connected prompt
    } else {
      setWalletConnectPrompt(prev => !prev); // Toggle wallet connect prompt
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
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
        <div className={`flex justify-end space-x-5 items-center h-16 px-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          {/* Conditional Icon Rendering */}
          {walletConnectPrompt ? (
            <FaWallet className='w-6 h-6 cursor-pointer' onClick={toggleWalletPrompt} />
          ) : (
            <FaWallet className='w-6 h-6 cursor-pointer' onClick={toggleWalletPrompt} />
          )}
          
          <div onClick={toggleDarkMode} className="rounded-full cursor-pointer" aria-label="Toggle dark mode">
            {darkMode ? (
              <FaSun className="text-yellow-400 text-2xl hover:text-yellow-300 transition-colors duration-300 w-7 h-7" />
            ) : (
              <FaMoon className="text-gray-600 text-2xl hover:text-gray-500 transition-colors duration-300 w-7 h-7" />
            )}
          </div>
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="User Profile">
            <FaUserCircle className="w-7 h-7" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className={`flex w-full h-full p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} overflow-auto`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {/* Large and Small Cards */}
            <Card title="Large Card 1" description="This is a large card." darkMode={darkMode} className="col-span-2 row-span-2" />
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

        {/* Wallet Prompt */}
        {walletConnectPrompt && <WalletPrompt close={() => setWalletConnectPrompt(false)} />}
        
        {/* Wallet Connected Dropdown */}
        {walletConnectedPrompt && <WalletDropdown close={() => setWalletConnectedPrompt(false)} isOpen={true} />}
      </div>
    </div>
  );
};

export default HomeScreen;
