// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Orders {
    enum OrderStatus { Created, InProgress, Completed, Canceled }

    struct Order {
        address sender;
        address courier;
        uint256 amount;
        OrderStatus status;
    }

    Order[] public orders;
    mapping(address => uint[]) public senderToOrders;
    mapping(address => uint[]) public courierToOrders;

    event OrderCreated(uint indexed orderId, address sender, uint256 amount);
    event OrderUpdated(uint indexed orderId, OrderStatus newStatus);
    event OrderCompleted(uint indexed orderId);

    function createOrder(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero");
        orders.push(Order(msg.sender, address(0), _amount, OrderStatus.Created));
        uint orderId = orders.length - 1;
        senderToOrders[msg.sender].push(orderId);
        emit OrderCreated(orderId, msg.sender, _amount);
    }

    function updateOrderStatus(uint _orderId, OrderStatus _newStatus) external {
        require(_orderId < orders.length, "Invalid order ID");
        require(msg.sender == orders[_orderId].sender, "Only the sender can update the order");
        require(_newStatus > orders[_orderId].status, "Order status can only be updated forward");

        orders[_orderId].status = _newStatus;
        emit OrderUpdated(_orderId, _newStatus);
    }

    function completeOrder(uint _orderId) external {
        require(_orderId < orders.length, "Invalid order ID");
        require(msg.sender == orders[_orderId].courier, "Only the courier can complete the order");
        require(orders[_orderId].status == OrderStatus.InProgress, "Order must be in progress to complete");

        orders[_orderId].status = OrderStatus.Completed;
        emit OrderCompleted(_orderId);
    }
}
