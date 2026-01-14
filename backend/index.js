import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

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

// Start server

app.listen(process.env.PORT || 5000, () =>
    console.log("Server running")
);
