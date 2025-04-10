import { ethers } from "ethers";
import dataNet from "../../net.json"
import { isWalletConnected } from "../profile/check-wallet";
import axios from "axios";

export async function getABI(network:string, moduleName:string){
    try {   
        console.log(network, moduleName);
        const chainID = dataNet[network]["chainId"];
        const chainJSON = dataNet[network]["properties"][moduleName]; 
        const encodedJsonFileName = encodeURIComponent(chainJSON);
        
        const response = await fetch(`http://localhost:3001/api/getAbi?chainId=${chainID as string}&jsonFileName=${encodedJsonFileName}`, {
            method: 'GET',
        });

        if (!response.ok){
            throw new Error("Network could not fetch ABI");
        }

        const data = await response.json();

        return data;

    } catch (e){
        console.log(e);
    }
}

export async function getSigner(addressSelected: string) {
    try {
      // Initialize the provider using the BrowserProvider (for Ethereum)
      const provider = new ethers.BrowserProvider(window.ethereum);
  
      // Request the list of accounts from the user's Ethereum wallet
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      // Check if the selected address is among the accounts
      if (!accounts.includes(addressSelected)) {
        console.log(`Address ${addressSelected} is not in the list of connected accounts.`);
        return null;  // Return null or handle the error as needed
      }
  
      // If the address is found, set the signer for that account
      const signer = await provider.getSigner(addressSelected);

      console.log("signer", signer)
      
      // Log and return the signer for the selected address
      console.log("My Signer: ", await signer.getAddress());
      return signer;
      
    } catch (error) {
      console.log("Signer Error: ", error);
      return null;  // Return null or handle the error as needed
    }
  }

export async function executeTransaction(propertyID: any, propertyAddress: any, contract: any, numberOfTokens: any, totalCost: any, setTxHash: any, setShowPopup: any, setIsWaitingForReciept: any, setReceipt: any){
    console.log("Execute transaction")
    // Execute the transaction
    let tx;
    try {
        tx = await contract.buyTokens(numberOfTokens, { value: ethers.parseEther(totalCost) });
        
        setShowPopup(true);
        // Transaction Sent 
        setTxHash(tx.hash);

    } catch (txError: any) {
        throw new Error(`Transaction failed: ${txError.message}`);
    }

    // Wait for transaction confirmation
    let receipt;
    let tokensLeftChange;
    try {
        setIsWaitingForReciept(true);
        receipt = await tx.wait();
        setIsWaitingForReciept(false);

        setReceipt(receipt);
        if (!receipt || receipt.status !== 1) throw new Error("Transaction failed or was reverted");
        console.log("Transaction confirmed! Receipt:", receipt);

        try {
            tokensLeftChange = await contract.getTokenSupply();
            
            if (!tokensLeftChange) {
                console.log("Failed to get tokensLeft updated from contract", tokensLeftChange);
                return;
            }
        } catch (supplyError) {
            console.log("Failed to get tokensLeft updated from contract");
            return;
        }

        // Call my endpoint with the update
        try {
            const updatedJsonWithNumber = {
                "pId": propertyID,
                "tokensLeft": parseInt(tokensLeftChange.toString())
            };

            console.log(updatedJsonWithNumber);
              
            const response = await fetch('http://localhost:8080/update-tokens-left', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedJsonWithNumber), 
            });

            // Check if the response status is successful (status code 200-299)
            if (response.status >= 200 && response.status < 300) {
                console.log("Tokens updated successfully:", response);
            } else {
                console.log("Error updating tokens:", response.status, response.statusText);
            }
        } catch (e){
            console.log("Error Updating Tokens: ", e);
        }

        // To confirm the user and send notification


        // This is correct
        const transaction_json = {
            "block_hash": receipt.blockHash,
            "hash": receipt.hash,
            "block_number": receipt.blockNumber,
            "gas_price": receipt.gasPrice.toString(),
            "sender_address": receipt.from,
            "receiver_address": receipt.to,
            "property_address": propertyAddress,
            "token_amount": numberOfTokens,
            "uuid": localStorage.getItem("uuid")
        }

        console.log(transaction_json);

        try {      
            const response = await fetch('http://localhost:8080/post-transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transaction_json), 
            });

            // Check if the response status is successful (status code 200-299)
            if (response.status >= 200 && response.status < 300) {
                console.log("Transaction stored successfully:", response);
            } else {
                console.log("Error upating transaction", response.status, response.statusText);
            }
        } catch (e){
            console.log("Error posting transaction: ", e);
        }


        const notify = await axios.post("http://localhost:8080/send-notification", {
            uuid: localStorage.getItem("uuid"),  // Assuming propertyAddedBy is a valid UUID here
            message: `Your transaction was successful: ${receipt.hash}`,
            type: "info",
            related_table: "PropertyTokenised",
            wasRead: false
        });
        
        // Show confirmation and link to etherscan with confirmation over transaction

    } catch (receiptError: any) {
        throw new Error(`Transaction confirmation failed: ${receiptError.message}`);
    }
}

// See which wallet address they want to execute the smart contract on 
export async function queryContract (propertyID: any, propertyAddress: string, smartAddress:string, network:string, contractName:string, tokenPrice:string, numberOfTokens: number, address:string, setShowPopup: any, setLoading: any, setTxHash: any, setErrorMessage: any, setIsWaitingForReciept: any, setReceipt: any) {

    const totalCost = (Number(tokenPrice) * numberOfTokens).toString();
    // New parameters is wallet address wanted, and network of the propertes smart contract.
    const deployedSmartContact = smartAddress as string;

    // Need to check if there is a wallet if not then prompt the user to attach an account.
    const boolVal = await isWalletConnected();

    if (!boolVal) {
        alert("Please connect a wallet, through the wallet icon at the top of the dash");
        setErrorMessage("Please connect wallet via the Wallet Icon in the top right of the dash");
        setLoading(false);
        return;
    } 

    try {
    
        // Ensure network is defined
        if (!network){
            setErrorMessage("This is a fault due to network issues");
            setLoading(false);
            return;
        } 
    
        // Fetch the contract ABI
        let abi;
        try {
            console.log(network, contractName)
            abi = await getABI(network.toLowerCase(), contractName);
        
            if (!abi || !abi.abi){
                setErrorMessage(`Failed to retrieve ABI`);
                setLoading(false)
                return;
            } 
        } catch (abiError: any) {
            setErrorMessage(`Failed to retrieve ABI: ${abiError.message}`);
            setLoading(false)
            return;
        }
    
        // Get the transaction signer
        let signer;
        try {
            signer = await getSigner(address);
            console.log("SIGNER FROM THIS: ", signer)
            if (!signer){
                setErrorMessage(`Could not sign the transaction`);
                setLoading(false)
                return;
            } 
        } catch (signerError) {
            setErrorMessage(`Could not sign the transaction`);
            setLoading(false)
            return;
        }
    
        // Ensure contract address is defined
        if (!deployedSmartContact){
            setErrorMessage(`Could not find deployed smart contract`);
            setLoading(false)
            return;
        } 
    
        // Initialize the contract
        let contract;
        try {
            contract = new ethers.Contract(deployedSmartContact, abi.abi, signer);
        } catch (contractError) {
            alert("Please connect a wallet, through the wallet icon at the top of the dash");
            setErrorMessage(`Could not initialize smart contract: ${contractError}`);
            setLoading(false)
            return;
        }
    
        // Confirm contract is valid
        try {
            console.log("Confirmed Address:", await contract.getAddress());
        } catch (addressError) {
            alert("Please connect a wallet, through the wallet icon at the top of the dash");
            setErrorMessage(`Contract Address Error: ${addressError}`);
            setLoading(false)
            return;
        }
    
        // Retrieve token supply
        try {
            console.log("Executed Token Supply")
            console.log("Tokens Left:", await contract.getTokenSupply());
        } catch (supplyError) {
            setErrorMessage(`Failed to retireve Tokens from Contract: ${supplyError}`);
            setLoading(false)
            return;
        }

        try {
            const owner = await contract.ownerOf(); // Retrieve the owner of the property
            console.log("Get Owner:", owner);
        
            if (owner.toLowerCase() === address.toLowerCase()) {
                setErrorMessage(`Failed to execute due to they are the owner`);
                setLoading(false)
                return;
            } 
        } catch (ownerError) {
            setErrorMessage(`Failed to receive owner: ${ownerError}`);
            return;
        }

        try {
            await executeTransaction(propertyID, propertyAddress, contract, numberOfTokens, totalCost, setTxHash , setShowPopup, setIsWaitingForReciept, setReceipt);
            setLoading(false);
        } catch(error){
            setErrorMessage(`Failed to excute due to executeTransaction() failure ${error}`);
            setLoading(false)
            setShowPopup(false);
        }
        
    } catch (error: any) {
        console.error("Error with transaction:", error.message);
    }    
}