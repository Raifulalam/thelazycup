import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },

        email: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        password: { type: String, required: true },

        role: {
            type: String,
            enum: ["ADMIN", "STAFF", "CUSTOMER"],
            default: "CUSTOMER"
        },

        isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
);

// 🔥 Performance Index
userSchema.index({ email: 1 });
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;