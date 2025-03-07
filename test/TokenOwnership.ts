import hre, { ethers } from "hardhat";
import { expect } from "chai";

describe("PropertyERC20 Contract", function (){
    let PropertyERC20;
    let propertyERC20;
    let owner;
    let addr1;
    let addr2;
    const tokenPrice = hre.ethers.parseEther("0.1"); // 0.1 ETH per token
    const totalSupply = 1000;

    describe("Deployment should work on test network", function () {
        it("should deploy correctly", async function () {
            // Get the signers (i.e., the test accounts)
            [owner, addr1, addr2] = await hre.ethers.getSigners();
    
            // Deploy the contract using ethers.deployContract() (available with Hardhat)
            const propertyERC20 = await ethers.deployContract("PropertyERC20", [
                "MockPropertyToken",   // _name
                "MPT",                  // _symbol
                totalSupply,            // _totalSupply
                tokenPrice,             // _tokenPrice
                owner.address           // _propertyOwner
            ]);
            
            const ownerOfContract = await propertyERC20.ownerOf();

            const buyersInContract = await propertyERC20.getBuyers();

            // Check Initialisation 
            expect(buyersInContract).to.be.an('array');
            expect(buyersInContract).to.have.lengthOf(0);

            expect("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", ownerOfContract);
        });
    });
    
});