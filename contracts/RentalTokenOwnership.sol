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
        
        propertyTotalSupply = _totalSupply * (10 ** uint256(decimals()));  
        tokenPrice = _tokenPrice;                                       
        propertyOwner = _propertyOwner;                                    
        isRentalProperty = _isRentalProperty;  // Set the flag to indicate if this is a rental property
        
        _mint(address(this), propertyTotalSupply);

        // If the property is a rental, initialize the rental income
        if (isRentalProperty) {
            require(_monthlyIncome > 0, "Rental income must be greater than zero");
            initializeRentalIncome(_monthlyIncome);
        }
    }

    // --- Rental Income Distribution Initialization ---
    function initializeRentalIncome(uint256 _monthlyIncome) public {
        require(isRentalProperty, "This is not a rental property"); // Ensure the property is a rental property
        require(monthlyIncome == 0, "Rental income already initialized"); // Ensure rental income is only initialized once
        monthlyIncome = _monthlyIncome;
        lastIncomeDistribution = block.timestamp;
    }

    // --- Property Token Sale Module ---

    // Buy tokens function
    function buyTokens(uint256 _tokenAmount) external payable nonReentrant {
        uint256 totalCost = _tokenAmount * tokenPrice;
        require(msg.value >= totalCost, "Insufficient ETH sent");

        // Refund excess ETH if buyer sent too much
        if (msg.value > totalCost) {
            uint256 excess = msg.value - totalCost;
            payable(msg.sender).transfer(excess); // Refund excess ETH
        }

        // Transfer tokens to the buyer (from contract)
        _transfer(address(this), msg.sender, _tokenAmount);

        // Update the buyer's token contribution
        buyerTokens[msg.sender] += _tokenAmount;

        // Transfer ETH to the property owner
        payable(propertyOwner).transfer(msg.value);

        // Add the buyer's address to the buyers array if they haven't bought before
        if (buyerTokens[msg.sender] == _tokenAmount) {
            buyers.push(msg.sender);
        }
    }

    // --- Rental Income Distribution Module ---

    // Function to distribute fixed monthly income to buyers based on their token holdings
    function distributeIncome() external nonReentrant {
        require(isRentalProperty, "This is not a rental property");  // Ensure that this is a rental property
        require(msg.sender == propertyOwner, "Only the property owner can distribute income");
        require(block.timestamp >= lastIncomeDistribution + 30 days, "Monthly income distribution is not due yet");

        // Ensure there is enough ETH in the contract to distribute
        require(address(this).balance >= monthlyIncome, "Not enough ETH in the contract to distribute");

        uint256 totalTokenSupply = propertyTotalSupply; // Total token supply
        uint256 totalIncomeForBuyers = monthlyIncome;    // Total income to distribute to buyers

        // Distribute the income portion to buyers
        for (uint256 i = 0; i < buyers.length; i++) {
            address buyer = buyers[i];
            uint256 buyerShare = (buyerTokens[buyer] * totalIncomeForBuyers) / totalTokenSupply; // Calculate buyer's share based on their token holdings
            payable(buyer).transfer(buyerShare); // Send buyer their portion of the income
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

    // --- Admin Functions (Rental Income) ---
    function setMonthlyIncome(uint256 _newMonthlyIncome) external {
        require(msg.sender == propertyOwner, "Only the property owner can set the income");
        require(isRentalProperty, "This is not a rental property");
        monthlyIncome = _newMonthlyIncome;
    }
}
