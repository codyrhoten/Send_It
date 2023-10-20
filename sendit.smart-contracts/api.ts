import { ethers } from 'ethers';

// Replace with your contract address and ABI
const Orders = require('../artifacts/contracts/Orders.sol/Orders.json');
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

// Replace with our own provider
// const provider = new ethers.providers.Web3Provider(ethereum);

// Use wallet signer's address to send transactions
// const signer = provider.getSigner();
const signer = null;

// Create a contract instance
const contract = new ethers.Contract(contractAddress, Orders.abi, signer);


// Create a new order
export async function createOrder(
    _receiver: string,
    _amount: number,
    _fromCurrency: string,
    _toCurrency: string,
    _locationId: string
): Promise<void> {
    try {
        const tx = await contract.createOrder(_receiver, _amount, _fromCurrency, _toCurrency, _locationId);
        await tx.wait();
    } catch (error: any) {
        throw new Error(`Error creating order: ${error.message}`);
    }
}

// Assign a courier to an order
export async function assignCourier(_orderId: number, _courier: string): Promise<void> {
    try {
        const tx = await contract.assignCourier(_orderId, _courier);
        await tx.wait();
    } catch (error: any) {
        throw new Error(`Error assigning courier: ${error.message}`);
    }
}

// Complete an order (for courier) - changes order status to OrderStatus.Completed
export async function completeOrder(_orderId: number): Promise<void> {
    try {
        const tx = await contract.completeOrder(_orderId);
        await tx.wait();
    } catch (error: any) {
        throw new Error(`Error completing order: ${error.message}`);
    }
}

// Cancel an order (for sender or courier) - changes order status to OrderStatus.Canceled
export async function cancelOrder(_orderId: number): Promise<void> {
    try {
        const tx = await contract.cancelOrder(_orderId);
        await tx.wait();
    } catch (error: any) {
        throw new Error(`Error canceling order: ${error.message}`);
    }
}

// Get order details by orderId
export async function getOrderDetails(_orderId: number): Promise<any> {
    try {
        const order = await contract.getOrder(_orderId);
        return order;
    } catch (error: any) {
        throw new Error(`Error getting order details: ${error.message}`);
    }
}

// Get all orders that have OrderStatus.Created
export async function getCreatedOrders(): Promise<any[]> {
    try {
        const orders = await contract.getCreatedOrders();
        return orders;
    } catch (error: any) {
        throw new Error(`Error getting created orders: ${error.message}`);
    }
}
