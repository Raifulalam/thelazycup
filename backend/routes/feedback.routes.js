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


export default router;
