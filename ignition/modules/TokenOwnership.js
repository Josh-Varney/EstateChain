const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require('dotenv').config();
const { ethers } = require('ethers');

// Deploy the SMART Contract
const TokenModule = buildModule(process.env.MODULE_NAME, (m) => {

  // Contract Params from .env
  const PROPERTY_NAME = process.env.PROPERTY_NAME;
  const PROPERTY_ABR = process.env.PROPERTY_ABR;
  const PROPERTY_TOKEN_SUPPLY = process.env.PROPERTY_TOKEN_SUPPLY;
  const PROPERTY_TOKEN_PRICE = process.env.PROPERTY_TOKEN_PRICE;
  const PROPERTY_OWNER = process.env.PROPERTY_OWNER;
  const PROPERTY_IS_RENTAL = process.env.PROPERTY_IS_RENTAL;
  const PROPERTY_MONTHLY_INCOME = process.env.PROPERTY_MONTHLY_INCOME;

  // Ensure required parameters are set
  if (!PROPERTY_NAME || !PROPERTY_ABR || !PROPERTY_TOKEN_SUPPLY || !PROPERTY_TOKEN_PRICE || !PROPERTY_OWNER || !PROPERTY_IS_RENTAL || !PROPERTY_MONTHLY_INCOME) {
    throw new Error("Missing environment variables.");
  }

  console.log(`Deploying PropertyERC20 with name: ${PROPERTY_NAME} and abbreviation: ${PROPERTY_ABR}`);

  // Deploy the PropertyERC20 contract
  const token = m.contract("PropertyERC20", [PROPERTY_NAME, PROPERTY_ABR]);

  // Initialize the contract after deployment
  m.call(token, "initializeSale", [
    PROPERTY_TOKEN_SUPPLY,
    ethers.parseEther(PROPERTY_TOKEN_PRICE),
    PROPERTY_OWNER,
    PROPERTY_IS_RENTAL,
    ethers.parseEther(PROPERTY_MONTHLY_INCOME)
  ]);

  return { token };
});

module.exports = TokenModule;
