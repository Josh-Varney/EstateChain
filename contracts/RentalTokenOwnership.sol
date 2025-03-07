// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract RentalPropertyERC20 is ERC20, ReentrancyGuard {
    // Property & Sale Details 
    uint256 public propertyTotalSupply; 
    uint256 public tokenPrice;
    address public propertyOwner;
    uint256 public monthlyIncome;
    uint256 public lastIncomeDistribution;

    mapping(address => uint256) public buyerTokens;

    address[] public buyers;

    // Sets the initial parameters and mints the tokens
    constructor(
        string memory _name, 
        string memory _symbol, 
        uint256 _totalSupply, 
        uint256 _tokenPrice, 
        address _propertyOwner,
        uint256 _monthlyIncome  // Fixed amount of income to distribute
    ) 
        ERC20(_name, _symbol)
    {
        propertyTotalSupply = _totalSupply * (10 ** uint256(decimals()));  
        tokenPrice = _tokenPrice;                                       
        propertyOwner = _propertyOwner;                                    
        monthlyIncome = _monthlyIncome;                        
        lastIncomeDistribution = block.timestamp;                         

        // Mint the total supply of tokens to the contract itself
        _mint(address(this), propertyTotalSupply);
    }

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
}