import mongoose from "mongoose";

const auditSchema = new mongoose.Schema(
    {
        action: String,
        userId: mongoose.Schema.Types.ObjectId,
        details: Object
    },
    { timestamps: true }
);

auditSchema.index({ createdAt: -1 });

export default mongoose.model("AuditLog", auditSchema);
