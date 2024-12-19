import { getTestNetworkBalances } from "../components/dummy-portal/testnet/infura-meta";

// MetaMask Connection to Wallet
const MetaMaskConnect = async (): Promise<void> => {
   
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
            // window.ethereum is hooked when metamask installed on Chrome
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            
            // many accounts may be connected 
            localStorage.setItem("connectedAccount", accounts as string);
            console.log("MetaMask Accounts:", localStorage.getItem('connectedAccount'));
            
            alert(localStorage.getItem("connectedAccount"));

            getTestNetworkBalances(localStorage.getItem("connectedAccount") as string);

        } catch (error) {
            console.log("MetaMask Connection Error:", error);
        }
    } else {
        // Please add context for the user (This is probably an error due to the user having a safari browser)
        console.log("Please install MetaMask.");
    }
};

const MetaMaskDisconnect = () =>{
    localStorage.removeItem("connectedAccount");

    alert("Wallet Disconnected");
}


// Coinbase Wallet Connect
// const CoinBaseConnect = async (): Promise<void> => {
//     if (typeof window !== "undefined") {
//         try {
//             const APP_NAME = "Your App";
//             const APP_LOGO_URL = process.env.APP_LOGO_URL; 
//             // const DEFAULT_ETH_JSONRPC_URL = `${process.env.COINBASE_CONNECT_KEY}`; // Your Infura API key
//             // const DEFAULT_CHAIN_ID = 1; // Ethereum mainnet

//             const coinbaseWallet = new CoinbaseWalletSDK({
//                 appName: APP_NAME,
//                 appLogoUrl: APP_LOGO_URL,
//             });

//             const coinbaseWalletProvider = coinbaseWallet.makeWeb3Provider();
//             window.coinbaseWalletProvider = coinbaseWalletProvider;

//             const provider = new ethers.providers.Web3Provider(coinbaseWalletProvider);
//             const accounts = await provider.send("eth_requestAccounts", []);
//             localStorage.setItem("connectedAccount", accounts[0]);
//             console.log("Coinbase Wallet Accounts:", accounts);
            
//         } catch (error) {
//             console.error("Coinbase Wallet Connection Error:", error);
//         }
//     } else {
//         console.warn("Window object is not defined, unable to connect to Coinbase Wallet.");
//         // Add in context here 
//     }
// };

// Event Listeners
window.ethereum?.on('accountsChanged', (accounts: any) => {
    console.log('MetaMask accounts changed:', accounts);
    // Optionally update UI here
});

window.coinbaseWalletProvider?.on('accountsChanged', (accounts: any) => {
    console.log('Coinbase accounts changed:', accounts);
    // Optionally update UI here
});

// Export the connection and disconnect functions
export { MetaMaskConnect };
