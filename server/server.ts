import express, { Request, response, Response} from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from "axios";
import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { formatUnits } from 'ethers/lib/utils';

dotenv.config();

const app = express();

// Enable CORS with specific origin
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Update with your front-end URL
  methods: ['GET', 'POST'],
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Serve static files (optional for deployment)
app.use(express.static(path.join(process.cwd(), 'build')));

app.get("/api/getBalancesTestNet", async (req: Request, res: Response) => {
  const infuraApiKey = process.env.INFURA_DEV_API;

  // Check if the INFURA_DEV_API environment variable is set
  if (!infuraApiKey) {
      return res.status(500).json({ error: 'INFURA_DEV_API key is not set in environment variables' });
  }

  const address = req.query.walletAddress as string;
  const network = req.query.network as string;

  if (!address && !network){
    return res.status(400).json({error: 'wallet and network query parameters are required'})
  }

  if (!address) {
      return res.status(400).json({ error: 'walletAddress query parameter is required' });
  }

  if (!network) {
      return res.status(400).json({ error: 'network query parameter is required' });
  }

  const networks: { [key: string]: { rpcUrl: string, symbol: string } } = {
      "polygonAmoy": { rpcUrl: `https://polygon-amoy.infura.io/v3/${infuraApiKey}`, symbol: "AMOY" },
      "sepoliaETH": { rpcUrl: `https://sepolia.infura.io/v3/${infuraApiKey}`, symbol: "SETH" },
      "holeskyETH": { rpcUrl: `https://holesky.infura.io/v3/${infuraApiKey}`, symbol: "HETH" },
      "bscTestnet": { rpcUrl: `https://bsc-testnet.infura.io/v3/${infuraApiKey}`, symbol: "BSCT" },
      "avalancheFuji": { rpcUrl: `https://avalanche-fuji.infura.io/v3/${infuraApiKey}`, symbol: "FUJI" },
  };

  const networkConfig = networks[network];

  if (!networkConfig) {
      return res.status(400).json({ error: `Unsupported network: ${network}` });
  }

  try {
    
      console.log(networkConfig.rpcUrl);
      console.log(infuraApiKey)
      console.log(address);
      console.log(network);

      const rpcUrl = networkConfig.rpcUrl;
      const provider = new JsonRpcProvider(rpcUrl);

      console.log(provider);

      // Fetch balance in Wei
      const balance = await provider.getBalance(address);

      // Format the balance to Ether
      const formattedBalance = formatUnits(balance); 

      console.log(`Balance for ${address} on ${network}:`, formattedBalance, networkConfig.symbol);

      // Send response with balance and symbol
      return res.json({ balance: formattedBalance, symbol: networkConfig.symbol });
  } catch (error) {
      console.error(`Error fetching balance for ${network}:`, error);

      // Check for different types of errors (e.g., invalid address format, provider errors)
      if (error instanceof Error) {
          return res.status(500).json({ error: 'Failed to fetch balance', details: error.message });
      }

      return res.status(500).json({ error: 'Unknown error occurred' });
  }
});

// This endpoint has limited credit calls but API data itself is rerendered every 60s
app.get("/api/getCryptoPrices", async (req: Request, res: Response) =>{
  
// To this I will require to get a query param which specifies the users location to determine the currency to convert to 
  try {
    const response = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.DEX_API_COIN_MARKET_CAP,
      },
      params: {
        "convert": "GBP"
      }
    });

    // filter by "name" using array to get the currencies we want
    const jsonObj = response.data
    
    // Will need to add some filtering conditions for certain currency's e.g., sepolina
    const RealSystemStats = ["ETH", "BTC", "MATIC", "BSC", "XTZ", "XLM", "SOL", "AVAX", "ADA", "ALGO", "FLOW"]
    
    // Etheureum Testnets e.g., Sepolina, Goerli
    // MATIC Mumbai Testnet:
    // BNB Chain Testnet: Binance Smart Chain Testnet
    // Solana

    const FakeSystemStats = ["Sepolia","Goerli"]

    res.json(response.data);
  } catch (error){
    console.log("getCryptoPrices: ", error); // 401
  }
});

app.get("/geoencode/search", async (req: Request, res: Response) => {
  const { postcode } = req.query; // Get the postcode from the query string

  if (!postcode) {
      return res.status(400).json({ error: "Postcode is required" });
  }

  const BASE_URL = `https://maps.googleapis.com/maps/api/geocode/json`;

  try {
      // Make a request to Google Geocoding API
      const response = await axios.get(BASE_URL, {
          params: {
              address: postcode,
              key: process.env.REACT_APP_API_KEY, 
          },
      });

      // Handle the response from Google API
      if (response.data.status === "OK") {
          const { lat, lng } = response.data.results[0].geometry.location;
          return res.status(200).json({ latitude: lat, longitude: lng });
      } else {
          return res.status(404).json({ error: "Location not found", status: response.data.status });
      }
  } catch (error) {
      console.error("Error fetching geocode data:", error);
      return res.status(500).json({ error: "Internal server error" });
  }
});

// This endpoint fetches properties from the Go server without any filtering
app.get("/api/getProperties", async (req, res) => {
  try {
      // Make a request to your Go server to fetch all properties (adjust the URL as needed)
      const response = await axios.get('http://localhost:8080/get-properties');

      // Assuming the response from the Go API is in the format:
      // { properties: [...] }
      const properties = response.data.properties;

      // If there are no properties returned from the Go server
      if (!properties || properties.length === 0) {
          return res.status(404).json({ message: "No properties found" });
      }

      // Send the properties data back to the client
      res.json(properties);

  } catch (error) {
      console.log("Error fetching properties:", error);
      res.status(500).json({ error: "Failed to fetch properties" });
  }
});



// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
