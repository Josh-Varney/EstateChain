import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { vars } from "hardhat/config";

const INFURA_API_KEY = vars.get("INFURA_DEV_KEY");
const PRIVATE_KEY = vars.get("PRIVATE_KEY");

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    holesky: {
      url: `https://ethereum-holesky-rpc.publicnode.com`,
      accounts: [`0x${PRIVATE_KEY}`],
      gas: 5500000,
      gasPrice: 20000000000,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`],
      gas: 5500000,  // Set a reasonable gas limit
      gasPrice: 20000000000,  // Increase gas price to 20 Gwei (example)
    },
  }
};

export default config;
