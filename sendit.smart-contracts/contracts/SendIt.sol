// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9

// Import the ERC-20 interface
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SendIt is Ownable {
    address public usdcContractAddress; // Address of the USDC contract
    uint256 public requiredAllowance;

    // Initialize the contract with the owner and USDC contract address
    constructor(address _usdcContractAddress, uint256 _requiredAllowance) {
        usdcContractAddress = _usdcContractAddress;
        requiredAllowance = _requiredAllowance;
    }

    // Function to initiate the transfer with auto-approval
    function initiateTransfer(address _receiver, uint256 _amount) external {
        // Check the user's current allowance for this contract
        IERC20 usdcToken = IERC20(usdcContractAddress);
        uint256 allowance = usdcToken.allowance(msg.sender, address(this));

        if (allowance < requiredAllowance) {
            // The user has not approved the contract for the required allowance
            // Initiate an approval request
            usdcToken.approve(address(this), requiredAllowance);
        }

        // Now, execute the transfer
        usdcToken.transferFrom(msg.sender, _receiver, _amount);
    }
}
