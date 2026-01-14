import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            unique: true
        },

        stock: { type: Number, default: 0 },

        threshold: { type: Number, default: 5 }
    },
    { timestamps: true }
);

export default mongoose.model("Inventory", inventorySchema);
