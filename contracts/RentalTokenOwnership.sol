// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract PropertyERC20 is ERC20, ReentrancyGuard {
    // --- Property Token Sale Details ---
    uint256 public propertyTotalSupply; 
    uint256 public tokenPrice;
    address public propertyOwner;

    mapping(address => uint256) public buyerTokens;
    address[] public buyers;

    // --- Rental Income Distribution Details ---
    uint256 public monthlyIncome;
    uint256 public lastIncomeDistribution;

    // --- Property Type Flag ---
    bool public isRentalProperty;  // Flag to determine if this is a rental property or a one-time sale

    // --- Constructor ---
    constructor(
        string memory _name, 
        string memory _symbol
    ) 
        ERC20(_name, _symbol)
    {}

    // --- Property Token Sale Initialization ---
    function initializeSale(
        uint256 _totalSupply, 
        uint256 _tokenPrice, 
        address _propertyOwner,
        bool _isRentalProperty,  // Flag to specify if this is a rental property or a regular sale
        uint256 _monthlyIncome   // Monthly rental income (if it's a rental property)
    ) external {
        require(propertyTotalSupply == 0, "Sale already initialized"); // Ensure sale is only initialized once
        
        propertyTotalSupply = _totalSupply;  // Keep it as whole numbers

        require(propertyTotalSupply > 0, "Property Token Supply must be greater than 0");
        require(propertyTotalSupply <= 10**24, "Total supply is too large");


        tokenPrice = _tokenPrice;            

        require(_tokenPrice > 0, "Token price must be greater than zero");
                           
        propertyOwner = _propertyOwner;          

        require(_propertyOwner != address(0), "Invalid property owner address");
                          
        isRentalProperty = _isRentalProperty;  // Set the flag to indicate if this is a rental property
        
        _mint(address(this), propertyTotalSupply);

        // If the property is a rental, initialize the rental income
        if (isRentalProperty) {
            require(_monthlyIncome > 0, "Rental income must be greater than zero");
            initializeRentalIncome(_monthlyIncome);
        }
    }

    // --- Rental Income Distribution Initialization ---
    function initializeRentalIncome(uint256 _monthlyIncome) internal {
        require(isRentalProperty, "This is not a rental property"); // Ensure the property is a rental property
        require(monthlyIncome == 0, "Sale already initialized"); // Ensure rental income is only initialized once
        monthlyIncome = _monthlyIncome;
        lastIncomeDistribution = block.timestamp;
    }

    // --- Property Token Sale Module ---

    // Buy tokens function
    function buyTokens(uint256 _tokenAmount) external payable nonReentrant {
        uint256 totalCost = _tokenAmount * tokenPrice;

        require(propertyTotalSupply > 0, "Insufficient Tokens Left");
        require(msg.value >= totalCost, "Insufficient ETH sent");
        require(propertyTotalSupply >= _tokenAmount, "Not enough tokens available");

        // Calculate the excess ETH if buyer sent more than require
        // Transfer tokens to the buyer (from contract)
        _transfer(address(this), msg.sender, _tokenAmount);
        

        // Update the buyer's token contribution
        buyerTokens[msg.sender] += _tokenAmount;

        // Now simply subtract whole numbers
        propertyTotalSupply -= _tokenAmount;


        // Transfer ETH to the property owner
        payable(propertyOwner).transfer(msg.value);

        // Add the buyer's address to the buyers array if they haven't bought before
        if (buyerTokens[msg.sender] == _tokenAmount) {
            buyers.push(msg.sender);
        }
    }

    // --- Rental Income Distribution Module ---

    // Function to distribute fixed monthly income to buyers based on their token holdings
    function distributeIncome() external payable nonReentrant {
        require(isRentalProperty, "This is not a rental property");  
        require(msg.sender == propertyOwner, "Only the property owner can distribute income");
        require(block.timestamp >= lastIncomeDistribution + 30 days, "Monthly income distribution is not due yet");
        require(msg.value >= monthlyIncome, "Not enough ETH sent for distribution");


        uint256 totalTokenSupply = propertyTotalSupply;

        require(totalTokenSupply > 0, "Total token supply cannot be zero");

        uint256 totalIncomeForBuyers = msg.value; // Use the ETH sent by the owner

        // Distribute income to buyers based on their token holdings
        for (uint256 i = 0; i < buyers.length; i++) {
            address buyer = buyers[i];
            uint256 buyerShare = (buyerTokens[buyer] * totalIncomeForBuyers) / totalTokenSupply;
            payable(buyer).transfer(buyerShare);
        }

        // Update the last income distribution timestamp
        lastIncomeDistribution = block.timestamp;
    }

    // --- View Functions (Property Token Sale) ---
    function getBuyers() external view returns (address[] memory) {
        return buyers;
    }

    function getTokensBought(address buyer) external view returns (uint256) {
        return buyerTokens[buyer];
    }

    function ownerOf() external view returns (address) {
        return propertyOwner;
    }

    // --- View Functions (Rental Income Distribution) ---
    function getMonthlyIncome() external view returns (uint256) {
        return monthlyIncome;
    }

    function getLastIncomeDistribution() external view returns (uint256) {
        return lastIncomeDistribution;
    }

    function getIsRentalProperty() external view returns (bool) {
        return isRentalProperty;
    }

    function getTokenSupply() external view returns (uint256) {
        return propertyTotalSupply;
    }

    function getWhatRentalIncome() external view returns (uint256) {
        require(isRentalProperty, "This is not a rental property");
        return monthlyIncome;
    }

    // Temporary
    function setLastIncomeDistribution(uint256 _timestamp) external {
        require(msg.sender == propertyOwner, "Only the owner can set this");
        lastIncomeDistribution = _timestamp;
    }

    // --- Admin Functions (Rental Income) ---
    function setMonthlyIncome(uint256 _newMonthlyIncome) external {
        require(msg.sender == propertyOwner, "Only the property owner can set the income");
        require(isRentalProperty, "This is not a rental property");
        monthlyIncome = _newMonthlyIncome;
    }
}
