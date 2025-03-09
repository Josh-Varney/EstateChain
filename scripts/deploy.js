// import { ethers } from "ethers";

const { ethers } = require("hardhat");
const { spawn } = require('child_process');

async function main() {
    const [owner] = await ethers.getSigners();

    const MODULE_NAME = "New PROP TEST"
    const PROPERTY_NAME = "Test JV 2"
    const PROPERTY_ABR = "TJV2"

    // Property InitializeSale()
    const PROPERTY_TOKEN_SUPPLY = 1000
    const PROPERTY_TOKEN_PRICE = ethers.parseEther("0.1");
    const PROPERTY_OWNER = owner.address;
    const PROPERTY_IS_RENTAL = true;
    const PROPEPRTY_MONTHLY_INCOME = ethers.parseEther("1.0");


    const envVars = `
        MODULE_NAME="${MODULE_NAME}" 
        PROPERTY_TOKEN_SUPPLY=${PROPERTY_TOKEN_SUPPLY} 
        PROPERTY_TOKEN_PRICE=${PROPERTY_TOKEN_PRICE} 
        PROPERTY_OWNER=${PROPERTY_OWNER} 
        PROPERTY_IS_RENTAL=${PROPERTY_IS_RENTAL} 
        PROPERTY_MONTHLY_INCOME=${PROPEPRTY_MONTHLY_INCOME} 
        PROPERTY_NAME="${PROPERTY_NAME}" 
        PROPERTY_ABR="${PROPERTY_ABR}"`;

      const deployProcess = spawn('npx', [
        'hardhat',
        'ignition',
        'deploy',
        './ignition/modules/TokenOwnership.js',
        '--network',
        'holesky'
      ], { env: process.env });


}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });