import axios from "axios";

// Define the interface for the balance structure

interface NetworkBalance {
  balance: string;
  symbol: string;
}


export async function getTestNetworkBalances(address: string): Promise<void> {
    const networkNames = ["sepoliaETH", "holeskyETH"];
  
    // Initialize the wallet balance structure
    const jsonWalletBalances: { [key: string]: { [key: string]: { balance: string; symbol: string } | null } } = {};
  
    // Ensure the address key is initialized
    jsonWalletBalances[address] = {};
  
    for (const network of networkNames) {
      console.log(`Testing network: ${network}`);
  
      try {
        const response = await axios.get("http://localhost:3001/api/getBalancesTestNet", {
          params: { walletAddress: address, network },
        });
  
        if (response.data && response.data.balance && response.data.symbol) {
          const { balance, symbol } = response.data;
  
          // Log the balance
          console.log(`Network: ${network}, Balance: ${balance} ${symbol}`);
  
          // Store the balance data in the jsonWalletBalances object
          jsonWalletBalances[address][network] = { balance, symbol };
        } else {
          console.log(`Incomplete or missing data for network: ${network}`);
          // Store null if data is incomplete
          jsonWalletBalances[address][network] = null;
        }
      } catch (error) {
        console.error(`Error fetching balance for network: ${network}`);
        if (axios.isAxiosError(error)) {
          console.error(`Axios error: ${error.response?.data || error.message}`);
        } else {
          console.error(`Unexpected error: ${error}`);
        }
  
        // Store null for failed network requests
        jsonWalletBalances[address][network] = null;
      }
    }
  
    // Log or return the jsonWalletBalances object for further use
    console.log("Final Wallet Balances:", JSON.stringify(jsonWalletBalances, null, 2));
    
    // Save jsonWalletBalances to localStorage
    localStorage.setItem('walletBalances', JSON.stringify(jsonWalletBalances));
}
  