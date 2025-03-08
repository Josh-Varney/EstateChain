import hre, { ethers } from "hardhat";
import { expect } from "chai";

describe("PropertyERC20 Buyer", function () {
    let owner;
    let hardhatToken;

    beforeEach(async function () {
        // Get the signers (owner and others)
        [owner] = await ethers.getSigners();

        // Deploy the contract before each test
        hardhatToken = await ethers.deployContract("PropertyERC20", [
            "MockProp", "MPT"
        ]);
        await hardhatToken.waitForDeployment(); // Ensure deployment completes
    });

    // Your test cases go here
});
