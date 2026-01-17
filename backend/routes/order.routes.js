import express from "express";
import {
    createOrder,
    getAllOrders,
    getUserOrders,
    updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

// Place a new order
router.post("/", createOrder);

// Get all orders (admin)
router.get("/", getAllOrders);

// Get orders for a specific user
router.get("/user/:userId", getUserOrders);

// Update order status or payment
router.patch("/:orderId", updateOrderStatus);


export default router;
