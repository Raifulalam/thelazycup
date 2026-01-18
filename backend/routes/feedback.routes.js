import express from "express";
import Order from "../models/order.model.js";
import protect from "../middleware/auth.middleware.js";
const auth = protect;
const router = express.Router();
router.use(protect); // optional auth middleware


router.post("/orders/:id/feedback", auth, async (req, res) => {
    try {
        const { message, rating } = req.body;

        const order = await Order.findById(req.params.id);
        if (!order)
            return res.status(404).json({ message: "Order not found" });

        // Prevent multiple feedbacks
        if (order.feedback?.message) {
            return res.status(400).json({ message: "Feedback already submitted" });
        }

        order.feedback = { message, rating };
        await order.save();

        res.json({ message: "Feedback saved successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
router.get("/orders/:Id/feedback", async (req, res) => {
    try {
        const { productId } = req.params;

        const order = await Order.findOne({
            "items.productId": productId
        });

        if (!order) {
            return res.status(404).json({
                submitted: false,
                message: "Order not found"
            });
        }

        // ✅ feedback is an ARRAY
        if (!order.feedback || order.feedback.length === 0) {
            return res.json({
                submitted: false
            });
        }

        // If feedback exists
        res.json({
            submitted: true,
            feedback: order.feedback,
            orderId: order._id,
            customerId: order.customerId
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
router.get("/:productId/feedback", async (req, res) => {
    try {
        const { productId } = req.params;

        // Find orders that include this product AND have feedback
        const orders = await Order.find({
            "items.productId": productId,
            "feedback.0": { $exists: true }
        })
            .populate("customerId", "name email")
            .sort({ createdAt: -1 });

        if (!orders.length) {
            return res.json({
                submitted: false,
                feedback: []
            });
        }

        // Extract feedback
        const feedback = orders.flatMap(order =>
            order.feedback.map(fb => ({
                orderId: order._id,
                user: order.customerId?.name || "Anonymous",
                message: fb.message,
                rating: fb.rating,
                createdAt: fb.createdAt
            }))
        );

        res.json({
            submitted: true,
            feedback
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;