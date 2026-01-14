import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            index: true
        },

        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },
                name: String,
                price: Number,
                quantity: Number
            }
        ],

        totalAmount: { type: Number, required: true },

        status: {
            type: String,
            enum: ["PLACED", "PREPARING", "READY", "COMPLETED", "CANCELLED"],
            default: "PLACED",
            index: true
        },

        paymentStatus: {
            type: String,
            enum: ["PENDING", "PAID", "FAILED"],
            default: "PENDING",
            index: true
        }
    },
    { timestamps: true }
);

// 🔥 Critical Indexes
orderSchema.index({ createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model("Order", orderSchema);
