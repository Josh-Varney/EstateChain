import React from 'react';
import { MetaMaskConnect } from '../../../../wallet-connect/web3';

interface WalletPromptProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

const WalletPrompt: React.FC<WalletPromptProps> = ({ close }) => {

    function closeWallet(){
      close(false);
    }

    // Check if plugin is available
    const isMetaMaskInstalled = () => {
      return typeof window.ethereum.isMetaMask !== "undefined";
    };

    const checkPlugin = async () => {
      if (isMetaMaskInstalled()){
        await MetaMaskConnect();
        close(false);
      }
      else {
        alert("Please use a chrome browser and the MetaMask Plugin");
        close(false);
      }
    }
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fadeIn">
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-8 rounded-2xl shadow-2xl w-80 text-center transform transition-all duration-300">
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-500">
            Connect Your Wallet
          </h2>
          
          <button className="w-full mb-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-md shadow-lg transform hover:scale-105 transition duration-300 ease-in-out" 
            onClick={checkPlugin}>
            MetaMask
          </button>
          
          <button className="w-full mb-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-md shadow-lg transform hover:scale-105 transition duration-300 ease-in-out" 
            onClick={ async () => {
                // await CoinBaseConnect();
                close(false); // Should close only and when the wallet request has been completed (BUG)
            }}>
            Coinbase
          </button>
          
          <button className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-md shadow-lg transform hover:scale-105 transition duration-300 ease-in-out" onClick={closeWallet}>
            Exit
          </button>
        </div>
      </div>
    );
  };

export default WalletPrompt;
