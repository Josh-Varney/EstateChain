import express, { Request, response, Response} from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from "axios";
import { JsonRpcProvider } from '@ethersproject/providers';
import { formatUnits, parseBytes32String } from 'ethers/lib/utils';

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

      console.log(properties);
      // Send the properties data back to the client
      res.json(properties);

  } catch (error) {
      console.log("Error fetching properties:", error);
      res.status(500).json({ error: "Failed to fetch properties" });
  }
});

// POST User
app.post("/api/postUser", async (req: Request, res: Response) => {
  try {
      const userData = req.body; // The incoming JSON data will be here

      // Validate the user data (basic example)
      if (!userData) {
        return res.status(400).json({ error: "Missing required fields: uuid" });
    }

      // Make a POST request to the Go server to store the user data
      const response = await axios.post('http://localhost:8080/add-user', userData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Send the response from the Go server back to the client
      res.json({
          message: "User data successfully forwarded to Go server",
          goServerResponse: response.data
      });
  } catch (error) {
      // If there's an error, send it back to the client
      console.error('Error forwarding user data to Go server:', error);
      res.status(500).json({ error: 'Failed to forward data to Go server' });
  }
});

// Make the GET request to your Go server endpoint
app.get("/api/checkUserExists", async (req: Request, res: Response) => {
  const uuid = req.query.uuid;

  console.log(uuid);

  // Check if UUID is provided
  if (!uuid) {
    return res.status(400).json({ error: "UUID is Required" });
  }

  try {
    // Make GET request to Go server
    const response = await axios.get("http://localhost:8080/check-user", {
      params: {
        uuid: uuid, // Pass UUID as a query parameter
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Return the response from the Go server to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error: When checking user exists on Go server", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/checkClient", async (req: Request, res: Response) => {
   try {
    const uuid = req.query.uuid;
    if (!uuid){
      return res.status(400).json({ error: "UUID is required" });
    }
    
    const response = await axios.get("http://localhost:8080/check-admin", {
      params: { uuid }
    });

    res.status(200).json(response.data);
   } catch (error) {
    console.error("Error calling Go API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/api/submitAgent", async (req, res) => {
  try {
    const propertyAgent = req.body; // Get the property agent data sent from frontend

    // Log the received agent data for debugging purposes
    console.log('Received Agent:', propertyAgent);

    // Filter the relevant fields to send to the Gin backend
    const filteredAgentData = {
      agentName: propertyAgent.agentName,
      agentIcon: propertyAgent.agentIcon || '', // Default to empty string if missing
      agentContactNumber: propertyAgent.agentContactNumber,
      agentEmail: propertyAgent.agentEmail,
      agentAddress: propertyAgent.agentAddress,
      agentWhyDescription: propertyAgent.agentWhyDescription,
      agentSoldDescription: propertyAgent.agentSoldDescription,
    };

    // Send filtered data to the Gin API at http://localhost:8080/add-agent
    const response = await fetch('http://localhost:8080/add-agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filteredAgentData), // Send the filtered data
    });

    // Handle non-OK responses from the Gin API
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.statusText}\n${errorText}`);
    }

    // Parse the response from the Gin API
    const responseData = await response.json();

    // Check if the response contains agentID (assuming it returns it)
    if (!responseData.agentID) {
      throw new Error('Agent ID not returned from Gin API.');
    }

    // Respond with the success message and data from Gin API, including the agentID
    res.status(200).json({
      message: 'Agent submitted successfully',
      agentID: responseData.agentID, // Include the agentID
      data: responseData, // You can include all the data returned from the Gin API
    });
  } catch (error) {
    console.error('Error submitting agent:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error });
  }
});


app.post("/api/submitProperty", async (req: Request, res: Response) => {
  try {
    const propertyData = req.body; // Get the property data sent from frontend

    const filteredPropertyData = {
      "propertyName": propertyData.propertyName,
      "propertyAddress": propertyData.propertyAddress,
      "propertyGeoLat": String(propertyData.propertyLocation.latitude.toFixed(6)), 
      "propertyGeoLong": String(propertyData.propertyLocation.longitude.toFixed(6)), 
      "propertyLocationLatitude": parseFloat(propertyData.propertyLocation.latitude),  // Here
      "propertyLocationLongitude": parseFloat(propertyData.propertyLocation.longitude), // Here
      "propertyKeyFeatures" : "N/A",
      "propertyDescription": propertyData.propertyDescription,
      "propertyAddedBy": String(propertyData.uuid), 
      "propertyKeywords": propertyData.propertyKeywords,
      "propertyPrice": parseFloat(propertyData.propertyPrice), 
      "propertySize": parseInt(propertyData.propertySize), 
      "propertyBedrooms": parseInt(propertyData.propertyBedrooms), 
      "propertyBathrooms": parseInt(propertyData.propertyBathrooms), 
      "propertyTokenPrice": parseFloat(propertyData.propertyTokenPrice), 
      "propertyTokensLeft": parseInt(propertyData.propertyTokensLeft), 
      "propertyType": propertyData.propertyType,
      "propertyPostcode": propertyData.propertyPostcode,
      "propertyImage": "N/A",
      "propertyFeatured": Boolean(propertyData.propertyFeatured), 
      "propertyRental": Boolean(propertyData.propertyRental),
      "propertySettlement": propertyData.propertySettlement,
      "propertyCountry": propertyData.propertyCountry,
      "propertyCity": propertyData.propertyCity,
      "propertyPostalCode": propertyData.propertyPostcode, 
      "propertyStreet": propertyData.propertyStreet,
      "propertyStreetNum": propertyData.propertyStreetNum,
      "propertyGarden": Boolean(propertyData.propertyGarden), 
      "propertyAccessibility": Boolean(propertyData.propertyAccessibility), 
      "propertyTenure": propertyData.propertyTenure,
      "propertyAgentID": parseInt(propertyData.agentID) 
  };


    const response = await fetch('http://localhost:8080/add-property', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(filteredPropertyData), 
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${response.statusText}\n${errorText}`);
    }

    const responseData = await response.json();
    console.log("Property Added Successfully:", responseData.propertyID);

    if (responseData.propertyID){
      // Get PropertyID
      const filteredContractData = {
        "propertyValuation":  parseFloat(propertyData.propertyPrice), 
        "propertyTokens": parseInt(propertyData.propertyTokensLeft), 
        "propertyTokensLeft": parseInt(propertyData.propertyTokensLeft), 
        "propertyTokenValue": propertyData.propertyTokensLeft > 0 
        ? parseFloat((propertyData.propertyPrice / propertyData.propertyTokensLeft).toString()) 
        : 0,  // Prevent division by zero
        "propertyRental": Boolean(propertyData.propertyRental), // Convert to boolean
        "rentalDistributionExpectancy": parseFloat(propertyData.rentalDistributionExpectancy) || 0, // Handle as decimal (money)
        "propertyID": responseData.propertyID
      };

      console.log(filteredContractData)

      // Call new endpoint
      const response = await fetch('http://localhost:8080/add-tokenize', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredContractData), 
      })

      // Handle the response
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data.message);

        // Return the data if needed
        return data;  // Returning the data to the calling function
      } else {
        const errorData = await response.json();
        console.log("Error:", errorData.error);

        return errorData.error;
      }
    }
    else 
    {
      console.log("Could not get propertyID")
    }

    res.status(200).json({ message: 'Property submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
