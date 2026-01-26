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
            // ☕ COFFEE
            {
                name: "Espresso Coffee",
                price: 120,
                category: "COFFEE",
                isAvailable: true,
                image: "espresso.jpg",
                description: "Strong and rich espresso made from freshly ground premium coffee beans."
            },
            {
                name: "Cappuccino",
                price: 150,
                category: "COFFEE",
                isAvailable: true,
                image: "cappuccino.jpg",
                description: "Classic cappuccino with perfect balance of espresso, steamed milk, and foam."
            },
            {
                name: "Cold Coffee",
                price: 180,
                category: "COFFEE",
                isAvailable: true,
                image: "cold-coffee.jpg",
                description: "Chilled coffee blended with milk and ice for a refreshing taste."
            },

            // 🍵 TEA
            {
                name: "Milk Tea",
                price: 50,
                category: "TEA",
                isAvailable: true,
                image: "milk-tea.jpg",
                description: "Traditional milk tea brewed with strong tea leaves and fresh milk."
            },
            {
                name: "Black Tea",
                price: 40,
                category: "TEA",
                isAvailable: true,
                image: "black-tea.jpg",
                description: "Pure black tea served without milk for a bold and authentic flavor."
            },
            {
                name: "Green Tea",
                price: 60,
                category: "TEA",
                isAvailable: true,
                image: "green-tea.jpg",
                description: "Light and healthy green tea known for its refreshing and calming effect."
            },

            // 🥪 SNACK
            {
                name: "Egg Omelet",
                price: 90,
                category: "SNACK",
                isAvailable: true,
                image: "egg-omelet.jpg",
                description: "Fluffy omelet made with fresh eggs and mild spices."
            },
            {
                name: "Bread Egg",
                price: 80,
                category: "SNACK",
                isAvailable: true,
                image: "bread-egg.jpg",
                description: "Toasted bread topped with seasoned egg mixture, perfect for quick bites."
            },
            {
                name: "Veg Sandwich",
                price: 100,
                category: "SNACK",
                isAvailable: true,
                image: "veg-sandwich.jpg",
                description: "Fresh vegetable sandwich layered with butter and classic café seasoning."
            },
            {
                name: "Chicken Burger",
                price: 160,
                category: "SNACK",
                isAvailable: true,
                image: "chicken-burger.jpg",
                description: "Juicy chicken patty burger served with fresh lettuce and sauces."
            },
            {
                name: "Veg Burger",
                price: 140,
                category: "SNACK",
                isAvailable: true,
                image: "veg-burger.jpg",
                description: "Crispy veg patty burger packed with flavors and fresh veggies."
            },
            {
                name: "Veg Noodles",
                price: 130,
                category: "SNACK",
                isAvailable: true,
                image: "veg-noodles.jpg",
                description: "Stir-fried noodles tossed with fresh vegetables and light spices."
            },
            {
                name: "Chicken Noodles",
                price: 160,
                category: "SNACK",
                isAvailable: true,
                image: "chicken-noodles.jpg",
                description: "Hot and spicy noodles cooked with tender chicken and vegetables."
            },

            // 💨 HOOKHA
            {
                name: "Hookah Mint",
                price: 350,
                category: "HOOKHA",
                isAvailable: true,
                image: "hookah-mint.jpg",
                description: "Smooth mint-flavored hookah for a cool and refreshing experience."
            },
            {
                name: "Hookah Double Apple",
                price: 400,
                category: "HOOKHA",
                isAvailable: true,
                image: "hookah-double-apple.jpg",
                description: "Classic double apple flavor with a rich and long-lasting aroma."
            },
            {
                name: "Hookah Pan",
                price: 380,
                category: "HOOKHA",
                isAvailable: true,
                image: "hookah-pan.jpg",
                description: "Sweet pan-flavored hookah offering a traditional taste."
            },

            // 🧃 OTHERS
            {
                name: "Milk Glass",
                price: 40,
                category: "OTHERS",
                isAvailable: true,
                image: "milk.jpg",
                description: "Fresh and chilled milk served plain and healthy."
            },
            {
                name: "Soft Drink",
                price: 50,
                category: "OTHERS",
                isAvailable: true,
                image: "soft-drink.jpg",
                description: "Cold and refreshing soft drink to pair with your snacks."
            },
            {
                name: "Cigarette",
                price: 20,
                category: "OTHERS",
                isAvailable: true,
                image: "cigarette.jpg",
                description: "Single cigarette available for adult customers only."
            },
            {
                name: "Mineral Water",
                price: 30,
                category: "OTHERS",
                isAvailable: true,
                image: "water.jpg",
                description: "Packaged mineral water for safe and clean drinking."
            }
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
