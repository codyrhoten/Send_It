// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Orders {
    enum OrderStatus {
        Created,
        InProgress,
        Completed,
        Canceled
    }

    struct Order {
        address sender;
        address receiver;
        address courier;
        uint256 amount;
        string fromCurrency;
        address toCurrency;
        OrderStatus status;
    }

    Order[] public orders;
    mapping(address => uint[]) public senderToOrders;
    mapping(address => uint[]) public courierToOrders;

    event OrderCreated(
        uint indexed orderId,
        address sender,
        address receiver,
        uint256 amount,
        string fromCurrency,
        address toCurrency
    );
    event OrderInProgress(uint indexed orderId, address courier);
    event OrderCompleted(
        uint indexed orderId,
        address sender,
        address receiver,
        uint256 amount,
        string fromCurrency,
        address toCurrency
    );
    event OrderCanceled(
        uint indexed orderId,
        address sender,
        address receiver,
        uint256 amount,
        string fromCurrency,
        address toCurrency
    );

    function createOrder(
        address _receiver,
        uint256 _amount,
        string memory _fromCurrency,
        address _toCurrency
    ) external {
        require(_amount > 0, "Amount must be greater than zero");

        Order memory newOrder = Order({
            sender: msg.sender,
            receiver: _receiver,
            courier: address(0),
            amount: _amount,
            fromCurrency: _fromCurrency,
            toCurrency: _toCurrency,
            status: OrderStatus.Created
        });

        // A Chainlink oracle could exchange the cash amount for the USDC amount and store that 
        // # in the order. Later in completeOrder() a transfer to escrow can include that # + fee

        orders.push(newOrder);
        uint orderId = orders.length + 1;
        senderToOrders[msg.sender].push(orderId);

        emit OrderCreated(
            orderId,
            msg.sender,
            _receiver,
            _amount,
            _fromCurrency,
            _toCurrency
        );
    }

    function assignCourier(uint256 _orderId, address _courier) external {
        Order storage order = orders[_orderId - 1];
        require(_orderId < orders.length, "Order doesn't exist");
        require(
            order.status == OrderStatus.Created,
            "Order not in created status"
        );
        require(
            msg.sender == order.sender,
            "Only the sender can assign a courier"
        );

        order.courier = _courier;
        order.status = OrderStatus.InProgress;
        courierToOrders[_courier].push(_orderId);

        emit OrderInProgress(_orderId, _courier);
    }

    function completeOrder(uint _orderId) external {
        require(_orderId < orders.length, "Order doesn't exist.");
        Order storage order = orders[_orderId - 1];
        require(
            order.status == OrderStatus.InProgress,
            "Order must be in progress to complete"
        );
        require(
            msg.sender == order.courier,
            "Only the courier can complete the order"
        );

        orders[_orderId].status = OrderStatus.Completed;
        emit OrderCompleted(
            _orderId,
            order.sender,
            order.receiver,
            order.amount,
            order.fromCurrency,
            order.toCurrency
        );

        // Transer funds from sender to either this or an escrow contract where it can hold the 
        // courier's coins till they deposit their cash & send the intended amount to the 
        // receiver's wallet.
    }

    function cancelOrder(uint _orderId) external returns (Order memory) {
        orders[_orderId - 1].status = OrderStatus.Canceled;
        // This will return a tuple that frontends can't handle
        return orders[_orderId - 1];
    }

    function getOrder(uint _orderId) public view returns (Order memory) {
        // This will return a tuple that frontends can't handle
        return orders[_orderId];
    }
}
