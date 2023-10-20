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
        uint256 orderId;
        address sender;
        address receiver;
        address courier;
        uint256 amount;
        string fromCurrency;
        string toCurrency;
        string locationId;
        OrderStatus status;
    }

    Order[] public orders;

    event OrderCreated(
        uint256 indexed orderId,
        address sender,
        address receiver,
        uint256 amount,
        string fromCurrency,
        string toCurrency
    );

    event OrderInProgress(
        uint256 indexed orderId, 
        address courier
    );

    event OrderCompleted(
        uint256 indexed orderId,
        address sender,
        address receiver,
        uint256 amount,
        string fromCurrency,
        string toCurrency
    );

    event OrderCanceled(
        uint256 indexed orderId,
        address sender,
        address receiver,
        uint256 amount,
        string fromCurrency,
        string toCurrency
    );

    function createOrder(
        address _receiver,
        uint256 _amount,
        string memory _fromCurrency,
        string memory _toCurrency,
        string memory _locationId
    ) external {
        require(
            _amount > 0, 
            "Amount must be greater than zero."
        );
        require(
            _receiver != msg.sender, 
            "Receiver cannot be the same as the sender."
        );

        uint256 _orderId = orders.length + 1;

        Order memory newOrder = Order({
            orderId: _orderId,
            sender: msg.sender,
            receiver: _receiver,
            courier: address(0),
            amount: _amount,
            fromCurrency: _fromCurrency,
            toCurrency: _toCurrency,
            locationId: _locationId,
            status: OrderStatus.Created
        });

        orders.push(newOrder);

        emit OrderCreated(
            _orderId,
            msg.sender,
            _receiver,
            _amount,
            _fromCurrency,
            _toCurrency
        );
    }

    function assignCourier(uint256 _orderId, address _courier) external {
        Order storage order = orders[_orderId - 1];

        require(
            _orderId - 1 < orders.length, 
            "That order doesn't exist."
        );
        require(
            order.status == OrderStatus.Created,
            "This order is already either in progress, complete or canceled."
        );
        require(
            msg.sender == order.sender,
            "Only the sender can assign a courier."
        );

        order.courier = _courier;
        order.status = OrderStatus.InProgress;

        emit OrderInProgress(_orderId, _courier);
    }

    function completeOrder(uint256 _orderId) external {
        require(_orderId - 1 < orders.length, "Order doesn't exist.");

        Order storage order = orders[_orderId - 1];
        
        require(
            order.status == OrderStatus.InProgress,
            "Order must be in progress to complete."
        );
        require(
            msg.sender == order.courier,
            "Only the courier can complete the order."
        );

        order.status = OrderStatus.Completed;
        
        emit OrderCompleted(
            _orderId,
            order.sender,
            order.receiver,
            order.amount,
            order.fromCurrency,
            order.toCurrency
        );
    }

    function cancelOrder(uint256 _orderId) external {
        Order storage order = orders[_orderId - 1];

        require(
            msg.sender == order.sender || msg.sender == order.courier, 
            "Only the creator of this order or the selected courier can cancel this order."
        );
        require(
            order.status != OrderStatus.Completed, 
            "This order has already been completed."
        );
        require(
            order.status != OrderStatus.Canceled, 
            "This order has already been canceled."
        );

        order.status = OrderStatus.Canceled;
        
        emit OrderCanceled(
            _orderId,
            order.sender,
            order.receiver,
            order.amount,
            order.fromCurrency,
            order.toCurrency
        );
    }

    function getOrder(uint256 _orderId) public view returns (Order memory) {
        require(_orderId - 1 < orders.length, "That order doesn't exist");

        return orders[_orderId - 1];
    }

    function getCreatedOrders() public view returns (Order[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].status == OrderStatus.Created) {
                count++;
            }
        }

        Order[] memory createdOrders = new Order[](count);
        count = 0;

        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].status == OrderStatus.Created) {
                createdOrders[count] = orders[i];
                count++;
            }
        }

        return createdOrders;
    }
}