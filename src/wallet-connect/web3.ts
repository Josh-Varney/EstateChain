// import { getTestNetworkBalances } from "../components/dummy-portal/testnet/infura-meta";

// MetaMask Connection to Wallet
const MetaMaskConnect = async (): Promise<void> => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
            // Request accounts from MetaMask
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

            // Store all connected accounts into localStorage
            localStorage.setItem("connectedAccounts", JSON.stringify(accounts));
            console.log("MetaMask Accounts:", accounts);
            alert(`Connected Accounts: ${accounts.join(", ")}`);

            // Listen for account changes and update localStorage
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                localStorage.setItem("connectedAccounts", JSON.stringify(accounts));
                console.log("Updated MetaMask Accounts:", accounts);
                alert(`Account changed: ${accounts.join(", ")}`);
            });

        } catch (error) {
            console.log("MetaMask Connection Error:", error);
        }
    } else {
        console.log("Please install MetaMask.");
    }
};


// const MetaMaskDisconnect = () =>{
//     localStorage.removeItem("connectedAccount");

//     alert("Wallet Disconnected");
// }


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
window.ethereum.on('accountsChanged', (accounts: string[]) => {
    console.log('MetaMask accounts changed here:', accounts);

    // Retrieve currently stored accounts from localStorage
    const storedAccounts = JSON.parse(localStorage.getItem("connectedAccounts") || "[]");

    // Identify added accounts (present in new `accounts` but not in `storedAccounts`)
    const addedAccounts = accounts.filter((account) => !storedAccounts.includes(account));

    // Identify removed accounts (present in `storedAccounts` but not in new `accounts`)
    const removedAccounts = storedAccounts.filter((account: string) => !accounts.includes(account));

    // Update localStorage with the new accounts list
    localStorage.setItem("connectedAccounts", JSON.stringify(accounts));

    // Log the changes
    if (addedAccounts.length > 0) {
        console.log("Accounts added:", addedAccounts);
    }

    if (removedAccounts.length > 0) {
        console.log("Accounts removed:", removedAccounts);
    }

    // Optionally, update the UI or state here
    if (accounts.length === 0) {
        console.log("Please connect to MetaMask.");
    } else {
        console.log("Current connected account(s):", accounts);
    }

    console.log("localStorage", localStorage.getItem("connectedAccounts"))
});


window.coinbaseWalletProvider?.on('accountsChanged', (accounts: any) => {
    console.log('Coinbase accounts changed:', accounts);
    // Optionally update UI here
});

// Export the connection and disconnect functions
export { MetaMaskConnect };
