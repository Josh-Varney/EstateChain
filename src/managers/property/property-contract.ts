import { ethers } from "ethers";
import dataNet from "../../net.json"
import { isWalletConnected } from "../profile/check-wallet";

export async function getABI(network:string){
    try {   
        const chainID = dataNet[network]["chainId"];
        const chainJSON = dataNet[network]["chainJSON"]

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

export async function getSigner () {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);

        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const signer = await provider.getSigner();

        console.log("My Signer: ", await signer.getAddress());

        return signer;
    } catch (error){
        console.log("Signer Error: ", error);
    }
}

// See which wallet address they want to execute the smart contract on 
export async function queryContract (smartAddress:string, network:string) {

    // New parameters is wallet address wanted, and network of the propertes smart contract.
    const deployedSmartContact = smartAddress as string;

    // Need to check if there is a wallet if not then prompt the user to attach an account.
    const boolVal = await isWalletConnected();

    if (!boolVal) {
        alert("Please connect a wallet, through the wallet icon at the top of the dash");
        return;
    } 

    try {
        // Ethers provider from the ethereum network

        console.log("Smart Address: ", smartAddress);

        // Used to communicate over a web server
        const abi = await getABI(network.toLowerCase());
        // console.log(abi);

        // Get transaction signer
        const signer = await getSigner();

        // read-only contract
        const contract = new ethers.Contract(deployedSmartContact, abi.abi, signer);

        console.log("Confirmed Address: ", await contract.getAddress())
        // console.log("jello");
        console.log("Tokens Left: ", await contract.getTokenSupply());


        const tx = await contract.buyTokens(1, { value: ethers.parseEther("0.1")});

        console.log("Transaction sent! Tx Hash:", tx.hash);
        console.log("Waiting for confirmation...");
    
        const receipt = await tx.wait();

        console.log("Receipt: ", receipt);


    


        // GET Private KET 
    } catch (error){
        console.log("Error with transaction: ", error);
    }

}