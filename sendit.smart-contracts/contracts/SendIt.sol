// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

// Import the ERC-20 interface
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract SendIt is Ownable {
    mapping(address => bool) public allowedTokens;

    constructor(address initialOwner) Ownable(initialOwner) {
    }
    
    function transferFunds(
        address _receiver,
        uint256 _amount,
        address tokenAddress
    ) external {
        // Check the user's current allowance for this contract
        IERC20 token = IERC20(tokenAddress);
        require(
            token.allowance(msg.sender, address(this)) >= _amount,
            "Insufficient allowance. Please approve more funds."
        );

        token.transferFrom(msg.sender, _receiver, _amount);
    }
}
