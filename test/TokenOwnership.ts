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

    describe("Check Deployment of Token Ownership Contract", function () {
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

            const buyersInContract = await propertyERC20.getBuyers();

            // Check Initialisation 
            expect(buyersInContract).to.be.an('array');
            expect(buyersInContract).to.have.lengthOf(0);
        });
    });
});