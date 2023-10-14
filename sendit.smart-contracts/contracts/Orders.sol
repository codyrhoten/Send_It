// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract OrderContract {
    enum OrderStatus {
        Open,
        Filled,
        Canceled
    }

    struct Order {
        address user;
        uint256 amount;
        OrderStatus status;
    }

    mapping(uint256 => Order) public orders;
    uint256 public orderCount;

    event OrderPlaced(
        uint256 indexed orderId,
        address indexed user,
        uint256 amount
    );
    event OrderFilled(uint256 indexed orderId);
    event OrderCanceled(uint256 indexed orderId);

    function placeOrder(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0");
        orders[orderCount] = Order(msg.sender, _amount, OrderStatus.Open);
        emit OrderPlaced(orderCount, msg.sender, _amount);
        orderCount++;
    }

    function fillOrder(uint256 _orderId) external {
        require(_orderId < orderCount, "Invalid order ID");
        Order storage order = orders[_orderId];
        require(order.status == OrderStatus.Open, "Order is not open");
        require(msg.sender != order.user, "Cannot fill your own order");
        order.status = OrderStatus.Filled;
        emit OrderFilled(_orderId);
    }

    function cancelOrder(uint256 _orderId) external {
        require(_orderId < orderCount, "Invalid order ID");
        Order storage order = orders[_orderId];
        require(order.user == msg.sender, "Only the order owner can cancel");
        require(order.status == OrderStatus.Open, "Order is not open");
        order.status = OrderStatus.Canceled;
        emit OrderCanceled(_orderId);
    }
}
