import hre from "hardhat";
import { expect } from "chai";


describe("RentalPropertyERC20 Contract", function (){
    let RentalPropertyERC20;
    let rentalPropertyERC20;
    let owner;
    let addr1;
    let addr2;
    const tokenPrice = hre.ethers.parseEther("0.1"); // 0.1 ETH per token
    const totalSupply = 1000;  // 1000 tokens total supply
    const monthlyIncome = hre.ethers.parseEther("10"); // Fixed monthly income (for example, 10 ETH)

    describe("Check Deployment of Token Rental Ownership Contract", function () {
            it("should deploy correctly", async function () {
                // Get the signers (i.e., the test accounts)
            [owner, addr1, addr2] = await hre.ethers.getSigners();

            // Deploy the contract with the new monthlyIncome parameter
            rentalPropertyERC20 = await hre.ethers.deployContract("RentalPropertyERC20", 
                [
                "MockPropertyRentalToken",   // _name
                "MPRT",                       // _symbol
                totalSupply,                 // _totalSupply
                tokenPrice,                  // _tokenPrice
                owner.address,               // _propertyOwner
                monthlyIncome                // _monthlyIncome
                ]
            );
        });
    });
});