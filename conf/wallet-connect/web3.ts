import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider;
        coinbaseWalletProvider?: any;
    }
}

// Metamask Wallet Connect
const MetaMaskConnect = async (): Promise<void> => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
        try {
            /* MetaMask is Installed in User Browser */ 
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts"});
            console.log(accounts);

        } catch (error){
            console.log("Error: ", error)
        }
    } else {
        /* MetaMask is Not Installed */ 
        console.log("Please install MetaMask");
    }
}
// Wallet Connect 
// Coinbase Wallet
// const CoinBaseConnect = async (): Promise<void> => {

// }

export { MetaMaskConnect };