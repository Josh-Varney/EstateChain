import { ethers } from "ethers";

export const handleWalletCheck = async (setWalletConnectPrompt, setWalletConnectedPrompt) => {
    const isWalletConnected = async () => {
      if (!window.ethereum) {
        console.log("MetaMask is not installed");
        return false;
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_accounts", []);
  
      if (accounts.length > 0) {
        console.log("Wallet is connected:", accounts[0]);
        return true;
      } else {
        console.log("No wallet connected");
        return false;
      }
    };
  
    const connected = await isWalletConnected();
  
    if (!connected) {
      setWalletConnectPrompt(true); // Show "Connect Wallet" prompt
      setWalletConnectedPrompt(false); // Ensure "Wallet Connected" prompt is hidden
    } else {
      setWalletConnectedPrompt(true); // Show "Wallet Connected" prompt
      setWalletConnectPrompt(false); // Hide "Connect Wallet" prompt
    }
};


export const isWalletConnected = async () => {
    if (!window.ethereum) {
    console.log("MetaMask is not installed");
    return false;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_accounts", []);

    if (accounts.length > 0) {
    console.log("Wallet is connected:", accounts[0]);
    return true;
    } else {
    console.log("No wallet connected");
    return false;
    }
};
