import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, index: true },

        price: { type: Number, required: true },

        category: {
            type: String,
            enum: ["COFFEE", "TEA", "SNACK", "HOOKHA", "OTHERS"],
            index: true
        },

        isAvailable: { type: Boolean, default: true },

        image: String,
        description: { type: String, required: true },
    },
    { timestamps: true }
);

// 🔥 Compound index for menu filtering
productSchema.index({ category: 1, isAvailable: 1 });

export default mongoose.model("Product", productSchema);
