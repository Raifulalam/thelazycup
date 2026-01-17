import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const { category } = req.query;

        const filter = { isAvailable: true };
        if (category && category !== "ALL") {
            filter.category = category;
        }

        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products" });
    }
};
