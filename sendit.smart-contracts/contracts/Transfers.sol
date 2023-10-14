// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TransferContract {
    mapping(address => uint256) public balances;

    event FundsTransferred(address indexed from, address indexed to, uint256 amount);

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function transferFunds(address _to, uint256 _amount) external {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        emit FundsTransferred(msg.sender, _to, _amount);
    }

    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }
}
