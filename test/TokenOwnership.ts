import hre, { ethers } from "hardhat";
import { expect } from "chai";

describe("PropertyERC20 Contract", function () {

    // Deploy and Sale Initialization Tests
    describe("Check Deployment and Sale Initialization", function () {

        it("Should deploy the contract correctly", async function () {
            const [owner] = await ethers.getSigners();

            const hardhatToken = await ethers.deployContract("PropertyERC20", [
                "MockProp", "MPT"
            ]);

            expect(await hardhatToken.getAddress()).to.equal("0x5FbDB2315678afecb367f032d93F642f64180aa3");
        });

        it("Should initialize the property sale correctly and verify isRentalProperty", async function () {
            const [owner] = await ethers.getSigners();

            // Deploy the contract
            const hardhatToken = await ethers.deployContract("PropertyERC20", [
                "MockProp", "MPT"
            ]);

            await hardhatToken.waitForDeployment(); // Ensure deployment completes

            // Define initialization parameters
            const totalSupply = 1000;
            const tokenPrice = ethers.parseEther("0.1"); // Convert 0.1 ETH to wei
            const propertyOwner = owner.address;
            const isRentalProperty = true;
            const monthlyIncome = ethers.parseEther("1"); // 1 ETH rental income per month

            // Call initializeSale function
            const tx = await hardhatToken.initializeSale(
                totalSupply, 
                tokenPrice, 
                propertyOwner, 
                isRentalProperty, 
                monthlyIncome
            );
            await tx.wait(); // Wait for transaction confirmation

            // Fetch and verify the isRentalProperty flag and other details
            const setRentalStatus = await hardhatToken.getIsRentalProperty();
            const setPropertyTokenSupply = await hardhatToken.getTokenSupply();
            const setMonthlyIncome = await hardhatToken.getWhatRentalIncome();

            // Assert the expected result (if using Chai for testing)
            expect(setRentalStatus).to.equal(isRentalProperty);
            expect(Number(ethers.formatUnits(setPropertyTokenSupply, 18))).to.equal(totalSupply);
            expect(setMonthlyIncome).to.equal(monthlyIncome);
        });

    });

    // Tests for Separation between Rental and Non-Rental Tokenized Property
    describe("Separation between Rental Tokenized Property and Non-Rental Tokenized Property", function () {
        
        const totalSupply = 1000;
        const tokenPrice = ethers.parseEther("0.1"); // Convert 0.1 ETH to wei
        const monthlyIncome = ethers.parseEther("1"); // 1 ETH rental income per month

        it("Test Rental Implementation", async function () {
            const [owner] = await ethers.getSigners();
            const propertyOwner = owner.address;
            
            const rentalProp = true;

            // Deploy the contract
            const hardhatToken = await ethers.deployContract("PropertyERC20", [
                "MockProp", "MPT"
            ]);

            await hardhatToken.waitForDeployment(); // Ensure deployment completes

            // Call initializeSale function
            const tx = await hardhatToken.initializeSale(
                totalSupply, 
                tokenPrice, 
                propertyOwner, 
                rentalProp, 
                monthlyIncome
            );
            await tx.wait(); // Wait for transaction confirmation

            // Verify the rental status
            expect(await hardhatToken.getIsRentalProperty()).to.equal(rentalProp);
        });

        it("Test Non-Rental Implementation and Error Thrown", async function () {
            const [owner] = await ethers.getSigners();
            const propertyOwner = owner.address;
            const nonRental = false;
            const monthlyIncome = 0; // No monthly income for non-rental property

            // Deploy the contract
            const hardhatToken = await ethers.deployContract("PropertyERC20", [
                "MockProp", "MPT"
            ]);

            await hardhatToken.waitForDeployment(); // Ensure deployment completes

            // Call initializeSale function
            const tx = await hardhatToken.initializeSale(
                totalSupply, 
                tokenPrice, 
                propertyOwner, 
                nonRental,
                monthlyIncome
            );
            await tx.wait(); // Wait for transaction confirmation

            // Verify the non-rental status
            expect(await hardhatToken.getIsRentalProperty()).to.equal(nonRental);

            // Error thrown to show clear seperation
            await expect(hardhatToken.getWhatRentalIncome()).to.be.revertedWith("This is not a rental property");
            
        });

    });

});
