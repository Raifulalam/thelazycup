import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.model.js";

// Load environment variables
dotenv.config({ path: "../.env" });

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        // Delete existing products first (optional)
        await Product.deleteMany();
        console.log("✅ Existing products deleted");

        // Seed new products with description
        const products = [
            { name: "Espresso", price: 130, category: "COFFEE", description: "Strong and bold coffee shot, perfect for a quick energy boost." },
            { name: "Cappuccino", price: 140, category: "COFFEE", description: "Classic Italian coffee with steamed milk and frothy foam." },
            { name: "Latte", price: 450, category: "COFFEE", description: "Smooth and creamy coffee, perfect for a relaxing sip." },
            { name: "Mocha", price: 500, category: "COFFEE", description: "Chocolate flavored coffee for those who love a sweet touch." },
            { name: "Milk Tea", price: 25, category: "TEA", description: "Hot and comforting milk tea, a perfect start to your day." },
            { name: "Green Tea", price: 20, category: "TEA", description: "Refreshing and healthy green tea with a light aroma." },
            { name: "Lemon Tea", price: 22, category: "TEA", description: "Tangy and refreshing lemon tea, perfect for any time." },
            { name: "Mint Hookah", price: 450, category: "HOOKAH", description: "Cool mint flavor hookah, relaxing and smooth." },
            { name: "Apple Hookah", price: 465, category: "HOOKAH", description: "Sweet apple flavored hookah for a fruity experience." },
        ];

        await Product.insertMany(products);
        console.log(`✅ Seeded ${products.length} products successfully!`);

        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

seedProducts();
