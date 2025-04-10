import { ethers } from "hardhat";
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

            it("Not Enough PropertyTokens Available", async function (){
                const tokenAmount = 11;
                await expect(hardhatToken.connect(addr1).buyTokens(tokenAmount, {value: ethers.parseEther("1.1")})).to.be.revertedWith("Not enough tokens available");
            });

            it ("Tokens have run empty", async function (){
                const tokenAmount = 10;
                await hardhatToken.connect(addr1).buyTokens(tokenAmount, {value: ethers.parseEther("1.0")});
                await expect(hardhatToken.connect(addr1).buyTokens(tokenAmount, {value: ethers.parseEther("1.1")})).to.be.revertedWith("Insufficient Tokens Left");
            });

            it("Owner balance", async function () {
                const tokenAmount = 10;
                const ownerAddr = owner.address;
            
                // Get initial ETH balance of the owner
                const initialOwnerBalance = await ethers.provider.getBalance(ownerAddr);
            
                // // Buyer purchases tokens, sending 1.1 ETH
                await hardhatToken.connect(addr1).buyTokens(tokenAmount, { value: ethers.parseEther("1.0") });
            
                // // Get new ETH balance of the owner
                const finalOwnerBalance = await ethers.provider.getBalance(ownerAddr);

                expect(parseFloat(ethers.formatEther(finalOwnerBalance))).to.be.greaterThan(parseFloat(ethers.formatEther(initialOwnerBalance)));
            });           
        });
    });    

    describe("Test Distibution of Rental Income", function () {
        let hardhatToken, hardhatTokenTest, owner, buyer1, buyer2, buyer3;
        
        beforeEach(async function () {
            [owner, buyer1, buyer2, buyer3] = await ethers.getSigners();

            hardhatToken = await ethers.deployContract("PropertyERC20", [
                "MockProp", "MPT"
            ]);
            await hardhatToken.waitForDeployment();
            
            hardhatToken.initializeSale(
                10, 
                ethers.parseEther("1"), 
                owner.address, 
                true, 
                ethers.parseEther("10"),
            );
        });
    
        it("Should distribute rental income correctly 1.0", async function () {
            // Get initial balances
            const balance_owner_1 = await ethers.provider.getBalance(owner);
            // Set and Check Timestamp to one to distribute rental income
            await hardhatToken.setLastIncomeDistribution(0);
            const timestampBigInt = await hardhatToken.getLastIncomeDistribution();
            const timestamp = Number(timestampBigInt); // Convert to a regular number
            const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds

            // Buyers need to purchase tokens 
            await hardhatToken.connect(buyer1).buyTokens(2, { value: ethers.parseEther("2") });
            await hardhatToken.connect(buyer2).buyTokens(8, { value: ethers.parseEther("8") });

            // Buyers after token transaction
            const balance_buyer_1_a = await ethers.provider.getBalance(buyer1);
            const balance_buyer_2_a = await ethers.provider.getBalance(buyer2);
            console.log("Buyer 1 before Transaction: ", balance_buyer_1_a);
            console.log("Buyer 2 before Transaction: ", balance_buyer_2_a);


            // Call the distributeIncome function
            await hardhatToken.connect(owner).distributeIncome( { value: ethers.parseEther("10") });
    
            // Get new balances
            const finalBalance1 = await ethers.provider.getBalance(buyer1.address);
            const finalBalance2 = await ethers.provider.getBalance(buyer2.address); 

            // // Check if the correct amount was received
            console.log("Buyer 1 after Transaction: ", finalBalance1);
            console.log("Buyer 2 after Transaction: ", finalBalance2);

            await expect(parseFloat(ethers.formatEther(finalBalance1))).to.be.greaterThan(parseFloat(ethers.formatEther(balance_buyer_1_a)));
            await expect(parseFloat(ethers.formatEther(finalBalance2))).to.be.greaterThan(parseFloat(ethers.formatEther(balance_buyer_2_a)));
        });

        it("Should distribute rental income correctly 2.0", async function () {
            // Get initial balances
            const balance_owner_1 = await ethers.provider.getBalance(owner);
            // Set and Check Timestamp to one to distribute rental income
            await hardhatToken.setLastIncomeDistribution(0);
            const timestampBigInt = await hardhatToken.getLastIncomeDistribution();
            const timestamp = Number(timestampBigInt); // Convert to a regular number
            const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds

            // Buyers need to purchase tokens 
            await hardhatToken.connect(buyer1).buyTokens(3, { value: ethers.parseEther("3") });
            await hardhatToken.connect(buyer2).buyTokens(7, { value: ethers.parseEther("7") });

            // Buyers after token transaction
            const balance_buyer_1_a = await ethers.provider.getBalance(buyer1);
            const balance_buyer_2_a = await ethers.provider.getBalance(buyer2);
            console.log("Buyer 1 before Transaction: ", balance_buyer_1_a);
            console.log("Buyer 2 before Transaction: ", balance_buyer_2_a);


            // Call the distributeIncome function
            await hardhatToken.connect(owner).distributeIncome( { value: ethers.parseEther("10") });
    
            // Get new balances
            const finalBalance1 = await ethers.provider.getBalance(buyer1.address);
            const finalBalance2 = await ethers.provider.getBalance(buyer2.address); 

            // // Check if the correct amount was received
            console.log("Buyer 1 after Transaction: ", finalBalance1);
            console.log("Buyer 2 after Transaction: ", finalBalance2);

            await expect(parseFloat(ethers.formatEther(finalBalance1))).to.be.greaterThan(parseFloat(ethers.formatEther(balance_buyer_1_a)));
            await expect(parseFloat(ethers.formatEther(finalBalance2))).to.be.greaterThan(parseFloat(ethers.formatEther(balance_buyer_2_a)));
        });

        it("Should distribute rental income correctly 3.0", async function () {
            // Get initial balances
            const balance_owner_1 = await ethers.provider.getBalance(owner);
            // Set and Check Timestamp to one to distribute rental income
            await hardhatToken.setLastIncomeDistribution(0);
            const timestampBigInt = await hardhatToken.getLastIncomeDistribution();
            const timestamp = Number(timestampBigInt); // Convert to a regular number
            const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds

            // Buyers need to purchase tokens 
            await hardhatToken.connect(buyer1).buyTokens(1, { value: ethers.parseEther("1") });
            await hardhatToken.connect(buyer2).buyTokens(3, { value: ethers.parseEther("3") });
            await hardhatToken.connect(buyer2).buyTokens(6, { value: ethers.parseEther("6") });

            // Buyers after token transaction
            const balance_buyer_1_a = await ethers.provider.getBalance(buyer1);
            const balance_buyer_2_a = await ethers.provider.getBalance(buyer2);
            const balance_buyer_3_a = await ethers.provider.getBalance(buyer3);

            // Call the distributeIncome function
            await hardhatToken.connect(owner).distributeIncome( { value: ethers.parseEther("10") });
    
            // Get new balances
            const finalBalance1 = await ethers.provider.getBalance(buyer1.address);
            const finalBalance2 = await ethers.provider.getBalance(buyer2.address); 
            const finalBalance3 = await ethers.provider.getBalance(buyer3.address);

            // // Check if the correct amount was received
            console.log("Buyer 1 after Transaction: ", finalBalance1);
            console.log("Buyer 2 after Transaction: ", finalBalance2);

            await expect(parseFloat(ethers.formatEther(finalBalance1))).to.be.greaterThan(parseFloat(ethers.formatEther(balance_buyer_1_a)));
            await expect(parseFloat(ethers.formatEther(finalBalance2))).to.be.greaterThan(parseFloat(ethers.formatEther(balance_buyer_2_a)));
            await expect(parseFloat(ethers.formatEther(finalBalance3))).to.be.greaterThan(parseFloat(ethers.formatEther(balance_buyer_3_a)));
        });

        it("Should distribute rental income correctly 4.0", async function () {
            // Get initial balances
            const balance_owner_1 = await ethers.provider.getBalance(owner);
            // Set and Check Timestamp to one to distribute rental income
            await hardhatToken.setLastIncomeDistribution(0);
            const timestampBigInt = await hardhatToken.getLastIncomeDistribution();
            const timestamp = Number(timestampBigInt); // Convert to a regular number
            const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds

            // Buyers need to purchase tokens 
            await hardhatToken.connect(buyer1).buyTokens(10, { value: ethers.parseEther("10") });

            // Buyers after token transaction
            const balance_buyer_1_a = await ethers.provider.getBalance(buyer1);

            // Call the distributeIncome function
            await hardhatToken.connect(owner).distributeIncome( { value: ethers.parseEther("10") });
    
            // Get new balances
            const finalBalance1 = await ethers.provider.getBalance(buyer1.address);

            // // Check if the correct amount was received
            console.log("Buyer 1 after Transaction: ", finalBalance1);

            await expect(parseFloat(ethers.formatEther(finalBalance1))).to.be.greaterThan(parseFloat(ethers.formatEther(balance_buyer_1_a)));
        });
    
        it("Should not allow non-owners to distribute income", async function () {
            await expect(hardhatToken.connect(buyer1).distributeIncome()).to.be.revertedWith("Only the property owner can distribute income");
        });

        it("Should not be distributed at this time", async function () {
            await expect(hardhatToken.connect(owner).distributeIncome()).to.be.rejectedWith("Monthly income distribution is not due yet");
        });

        it("Should have the correct amount of ETH for distribution", async function () {
            // Set Timestamp overide
            await hardhatToken.setLastIncomeDistribution(0);
            await expect(hardhatToken.distributeIncome({ value: ethers.parseEther("0.1") }))
                .to.be.revertedWith("Not enough ETH sent for distribution");
        });

        it("Should be a rental property to distribute income", async function () {
            [owner, buyer1, buyer2] = await ethers.getSigners();

            hardhatTokenTest = await ethers.deployContract("PropertyERC20", [
                "MockProp", "MPT"
            ]);
            await hardhatTokenTest.waitForDeployment();
            
            hardhatTokenTest.initializeSale(
                10, 
                1, 
                owner.address, 
                false, 
                0,
            );

            await expect(hardhatTokenTest.connect(owner).distributeIncome()).to.be.rejectedWith("This is not a rental property");
        });
    });
    

});
