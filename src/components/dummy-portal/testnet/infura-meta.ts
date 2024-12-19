import { ethers } from "ethers";
import axios from "axios";

export async function testAllNetworks(address: string): Promise<void> {
    const networkNames = ["polygonAmoy", "sepoliaETH", "holeskyETH", "bscTestnet", "avalancheFuji"];

    for (const network of networkNames) {
        console.log(`Testing network: ${network}`);
        try {
            const response = await axios.get("http://localhost:3001/api/getBalances", {
                params: { walletAddress: address, network: network },
            });

            if (response.data) {
                console.log(`Network: ${network}, Balance: ${response.data.balance} ${response.data.symbol}`);
            } else {
                console.log(`No balance data returned for network: ${network}`);
            }
        } catch (error) {
            console.error(`Error fetching balance for network: ${network}`);
            if (axios.isAxiosError(error)) {
                console.error(`Axios error: ${error.response?.data || error.message}`);
            } else {
                console.error(`Unexpected error: ${error}`);
            }
        }
    }
}