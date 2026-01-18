import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import orderRoutes from "./routes/order.routes.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();

connectDB();
// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

// Rate limiting
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100
    })
);


// Routes
app.get("/", (req, res) => {
    res.send("Coffee Shop Backend Running ☕");
});
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", feedbackRoutes);

app.use("/api/contact", contactRoutes);


// Start server

app.listen(process.env.PORT || 5000, () =>
    console.log("Server running")
);
