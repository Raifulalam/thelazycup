import express from "express";
import {
    createOrder,
    getAllOrders,
    getUserOrders,
    updateOrderStatus,
    deleteOrder,

} from "../controllers/order.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// Place a new order
router.post("/", protect, createOrder);

// Get all orders (admin)
router.get("/", protect, getAllOrders);

// Get orders for a specific user
router.get("/user/:userId", protect, getUserOrders);

// Update order status or payment
router.patch("/:orderId", updateOrderStatus);
router.delete("/:orderId", deleteOrder);


export default router;
