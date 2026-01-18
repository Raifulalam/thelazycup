import Order from "../models/order.model.js";

/**
 * Create a new order
 */
export const createOrder = async (req, res) => {
    try {
        const { customerId, items, totalAmount } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const order = await Order.create({
            customerId,
            items,
            totalAmount,
            status: "PLACED",
            paymentStatus: "PENDING",
        });

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Get all orders (Admin)
 */
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("customerId", "name email")
            .sort({ createdAt: -1 });
        res.json({ orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Get orders for a specific user
 */
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ customerId: userId })
            .populate("items.productId", "name price category")
            .sort({ createdAt: -1 });

        res.json({ orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * Update order status (Admin)
 */
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status, paymentStatus } = req.body;

        // Validate inputs
        const validStatuses = ["PLACED", "PREPARING", "READY", "COMPLETED", "CANCELLED"];
        const validPayments = ["PENDING", "PAID", "FAILED"];

        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid order status" });
        }

        if (paymentStatus && !validPayments.includes(paymentStatus)) {
            return res.status(400).json({ message: "Invalid payment status" });
        }

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (status) order.status = status;
        if (paymentStatus) order.paymentStatus = paymentStatus;

        await order.save();
        res.json({ message: "Order updated successfully", order });
    } catch (err) {
        console.error("Error updating order:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order deleted successfully" });
    } catch (err) {
        console.error("Error deleting order:", err);
        res.status(500).json({ message: "Server error" });
    }
};



