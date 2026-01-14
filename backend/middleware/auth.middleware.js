import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 🔥 Fetch full user (remove password)
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // 🔥 Attach FULL user info
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token failed" });
    }
};

export default protect;
