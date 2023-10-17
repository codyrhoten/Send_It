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
        string locationId;
        OrderStatus status;
    }

    Order[] public orders;
    mapping(address => uint256[]) public senderToOrders;
    mapping(address => uint256[]) public courierToOrders;

    event OrderCreated(
        uint256 indexed orderId,
        address sender,
        address receiver,
        uint256 amount,
        string fromCurrency,
        address toCurrency
    );
    event OrderInProgress(uint256 indexed orderId, address courier);
    event OrderCompleted(
        uint256 indexed orderId,
        address sender,
        address receiver,
        uint256 amount,
        string fromCurrency,
        address toCurrency
    );
    event OrderCanceled(
        uint256 indexed orderId,
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
        string memory _locationId
    ) external {
        require(_amount > 0, "Amount must be greater than zero");

        Order memory newOrder = Order({
            sender: msg.sender,
            receiver: _receiver,
            courier: address(0),
            amount: _amount,
            fromCurrency: _fromCurrency,
            toCurrency: _toCurrency,
            locationId: _locationId,
            status: OrderStatus.Created
        });

        // A Chainlink oracle could exchange the cash amount for the USDC amount and store that
        // # in the order. Later in completeOrder() a transfer to escrow can include that # + fee

        orders.push(newOrder);
        uint256 orderId = orders.length + 1;
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

    function completeOrder(uint256 _orderId) external {
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

    function cancelOrder(uint256 _orderId) external returns (Order memory) {
        orders[_orderId - 1].status = OrderStatus.Canceled;
        // This will return a tuple that frontends can't handle
        return orders[_orderId - 1];
    }

    function getOrder(uint256 _orderId) public view returns (Order memory) {
        // This will return a tuple that frontends can't handle
        return orders[_orderId];
    }

    // backend off-chain function
    // function isWithinRadius(bytes32 locationA, bytes32 locationB) internal pure returns (bool) {
        // Perform your off-chain calculations to determine if locationA and locationB are within the desired radius.
        // Return true if within radius, false otherwise.
        // This is where you would use your off-chain location data.
        // The actual implementation depends on your specific use case.
        // Here, we're using a placeholder function for demonstration purposes.
        // return true; // Modify this as needed
    // }

    function getCreatedOrders()
        public
        view
        returns (Order[] memory)
    {
        Order[] memory regionalOrders;
        uint256 orderCount = 0;

        for (uint256 i = 0; i < orders.length; i++) {
            // Perform off-chain calculations to determine if the order is within the desired radius.
            if (isWithinRadius(orders[i].locationID, _courierLocationID)) {
                orderCount++;
            }
        }

        // Create a new array of the correct size
        regionalOrders = new Order[](orderCount);
        orderCount = 0;

        for (uint256 i = 0; i < orders.length; i++) {
            // Add orders within the radius to the regionalOrders array
            if (isWithinRadius(orders[i].locationID, _courierLocationID)) {
                regionalOrders[orderCount] = orders[i];
                orderCount++;
            }
        }

        return regionalOrders;

        // USE THIS LOGIC BUT RETURN ORDERS AS ABOVE IN THIS FUNCTION
        uint256[] memory createdOrderIds;
        uint256 count = 0;

        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].status == OrderStatus.Created) {
                createdOrderIds[count] = orders[i].orderId;
                count++;
            }
        }

        // Create a new dynamic array with the correct length
        uint256[] memory result = new uint256[](count);

        // Copy the order IDs to the new array
        for (uint256 i = 0; i < count; i++) {
            result[i] = createdOrderIds[i];
        }

        return result;
    }
}
