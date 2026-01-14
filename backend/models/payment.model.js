import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            index: true
        },

        method: {
            type: String,
            enum: ["ESEWA", "CARD", "CASH"]
        },

        transactionId: { type: String, index: true },

        amount: Number,

        status: {
            type: String,
            enum: ["SUCCESS", "FAILED", "PENDING"],
            index: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
