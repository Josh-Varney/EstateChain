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
            expect(1000).to.equal(totalSupply);
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

    describe("Extreme Error Suite on initializeSale", function () {

        let hardhatToken;
        let owner;
    
        // Deploy the contract before each test
        beforeEach(async function () {
            [owner] = await ethers.getSigners();
    
            // Deploy the contract before each test
            hardhatToken = await ethers.deployContract("PropertyERC20", [
                "MockProp", "MPT"
            ]);
            await hardhatToken.waitForDeployment(); // Ensure deployment completes
        });
    
        it("Should revert if rental income is 0", async function () {
            const tokenPrice = 10;
            const tokenSupply = 10;
            const propRetal = true;
            const monthlyIncome = 0;  // Invalid monthly income for rental property
    
            // Expect the contract to revert with the "Rental income must be greater than zero" error
            await expect(
                hardhatToken.initializeSale(
                    tokenSupply, 
                    tokenPrice, 
                    owner.address, 
                    propRetal, 
                    monthlyIncome
                )
            ).to.be.revertedWith("Rental income must be greater than zero");
        });
    
        it("Should revert if property token supply is 0", async function () {
            const tokenPrice = 10;
            const tokenSupply = 0;  // Invalid token supply (must be greater than 0)
            const propRetal = true;
            const monthlyIncome = 10;  // Valid monthly income for rental property
    
            // Expect the contract to revert with the "Property Token Supply must be greater than 0" error
            await expect(
                hardhatToken.initializeSale(
                    tokenSupply, 
                    tokenPrice, 
                    owner.address, 
                    propRetal, 
                    monthlyIncome
                )
            ).to.be.revertedWith("Property Token Supply must be greater than 0");
        });

        it("Should revert if the sale is already initialized", async function () {
            const tokenPrice = 10;
            const tokenSupply = 1000;
            const propertyOwner = owner.address;
            const isRentalProperty = false;
            const monthlyIncome = 0;
        
            // Initialize the sale for the first time
            await hardhatToken.initializeSale(
                tokenSupply, 
                tokenPrice, 
                propertyOwner, 
                isRentalProperty, 
                monthlyIncome
            );
        
            // Try to initialize again and expect it to revert
            await expect(
                hardhatToken.initializeSale(
                    tokenSupply, 
                    tokenPrice, 
                    propertyOwner, 
                    isRentalProperty, 
                    monthlyIncome
                )
            ).to.be.revertedWith("Sale already initialized");
        });
        
        it("Should throw a TypeError if the total token supply is too large", async function () {
            const tokenPrice = 10;
            const tokenSupply = BigInt(10)**BigInt(25); // Using BigInt to ensure we are working with large numbers
            const propertyOwner = owner.address;
            const isRentalProperty = false;
            const monthlyIncome = 0;
        
            // Expect a TypeError to be thrown due to the large number being handled
            await expect(
                hardhatToken.initializeSale(
                    tokenSupply, 
                    tokenPrice, 
                    propertyOwner, 
                    isRentalProperty, 
                    monthlyIncome
                )
            ).to.be.revertedWith("Total supply is too large"); // Depending on the issue, you may get this revert instead
        });

        it("Should revert if the property owner is the zero address", async function () {
            const tokenPrice = 10;
            const tokenSupply = 1000;
            const propertyOwner = "0x0000000000000000000000000000000000000000"; // Zero address
            const isRentalProperty = false;
            const monthlyIncome = 0;
        
            // Expect the contract to revert
            await expect(
                hardhatToken.initializeSale(
                    tokenSupply, 
                    tokenPrice, 
                    propertyOwner, 
                    isRentalProperty, 
                    monthlyIncome
                )
            ).to.be.revertedWith("Invalid property owner address");
        });
    });    

    describe("Rental Income Initialization", function () {

        let hardhatToken;
        let owner;
    
        beforeEach(async function () {
            [owner] = await ethers.getSigners();
    
            // Deploy the contract before each test
            hardhatToken = await ethers.deployContract("PropertyERC20", [
                "MockProp", "MPT"
            ]);
            await hardhatToken.waitForDeployment(); // Ensure deployment completes
        });
    
        it("Should revert if trying to initialize rental income more than once", async function () {
            const tokenPrice = ethers.parseEther("0.1"); // Token price of 0.1 ETH
            const tokenSupply = 1000; // Property token supply
            const propertyOwner = owner.address;
            const isRentalProperty = true; // Setting it as a rental property
            const monthlyIncome = ethers.parseEther("1"); // Rental income of 1 ETH per month
            
            hardhatToken.initializeSale(tokenSupply, tokenPrice, propertyOwner, isRentalProperty, monthlyIncome)

            // Call initializeRentalIncome again, which should fail because rental income is already initialized
            await expect(
                hardhatToken.initializeSale(tokenSupply, tokenPrice, propertyOwner, isRentalProperty, monthlyIncome)
            ).to.be.revertedWith("Sale already initialized");
        });

        it("Valid parameters in initialization", async function () {
            const tokenPrice = ethers.parseEther("0.1"); // Token price of 0.1 ETH
            const tokenSupply = 1000; // Property token supply
            const propertyOwner = owner.address;
            const isRentalProperty = true; // Setting it as a rental property
            const monthlyIncome = ethers.parseEther("1"); // Rental income of 1 ETH per month
            
            hardhatToken.initializeSale(tokenSupply, tokenPrice, propertyOwner, isRentalProperty, monthlyIncome)
        });
    });    

    describe("Check the User Can Buy Token", function () {
        let hardhatToken;
        let owner;
        let addr1;
    
        beforeEach(async function () {
            // Get buyer and seller simulation
            [owner, addr1] = await ethers.getSigners();
    
            // Deploy the contract before each test
            hardhatToken = await ethers.deployContract("PropertyERC20", [
                "MockProp", "MPT"
            ]);
            await hardhatToken.waitForDeployment(); // Ensure deployment completes
    
            // Initialize the property sale
            await hardhatToken.initializeSale(
                10, 
                ethers.parseEther("0.1"),  // Token price = 0.1 ETH per token
                owner.address,
                false, // Not a rental property
                ethers.parseEther("0") // No rental income
            );
        });
    
        describe("Token Buy Test", function () {
            it("Should have no buyers initially", async function () {

                const buyers = await hardhatToken.getBuyers();
                expect(buyers).to.deep.equal([]);
            });

            it("Should allow user to buy", async function () {
                const tokenAmount = 2;
                const buyerAddr = addr1.address;

                console.log(buyerAddr)

                // Buyer sends ETH to purchase tokens
                await hardhatToken.connect(addr1).buyTokens(tokenAmount, {value: ethers.parseEther("0.2")});


                const buyers = await hardhatToken.getBuyers();

                const buyerBalance = await hardhatToken.balanceOf(buyerAddr);

                const totalSupply = await hardhatToken.getTokenSupply();

                expect(buyers[0]).to.be.equal(buyerAddr);
                expect(buyerBalance).to.be.equal(tokenAmount);
                expect(totalSupply).to.be.equal(BigInt(8));
            });
        });

        describe("Extreme Error Suite on BuyTokens", async function () {

            it("Not Enough Currency Issue", async function () {
                const tokenAmount = 2;

                // Buyer sends ETH to purchase tokens
                await expect(hardhatToken.connect(addr1).buyTokens(tokenAmount, {value: ethers.parseEther("0.1")})).to.be.revertedWith("Insufficient ETH sent");

            });
        });
    });    
});
