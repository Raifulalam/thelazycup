import Product from "../models/product.model.js";

const ITEMS_PER_PAGE = 10;

/* =========================
   GET ALL PRODUCTS (FILTER)
========================= */
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

/* =========================
   PAGINATED PRODUCTS
========================= */
export const getProductsPaginated = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const { category } = req.query;

        const filter = { isAvailable: true };
        if (category && category !== "ALL") {
            filter.category = category;
        }

        const totalItems = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);

        res.json({
            products,
            currentPage: page,
            totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE),
            totalItems,
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch products" });
    }
};

/* =========================
   GET PRODUCT BY ID
========================= */
export const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId);
        if (!product || !product.isAvailable) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch product" });
    }
};

/* =========================
   SEARCH PRODUCTS
========================= */
export const searchProducts = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const regex = new RegExp(query, "i");

        const products = await Product.find({
            isAvailable: true,
            name: { $regex: regex },
        }).sort({ createdAt: -1 });

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Failed to search products" });
    }
};

/* =========================
   ADD PRODUCT
========================= */
export const addProduct = async (req, res) => {
    try {
        const { name, price, category, image } = req.body;

        if (!name || !price || !category) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const product = await Product.create({
            name,
            price,
            category,
            image,
            isAvailable: true,
        });

        res.status(201).json({
            message: "Product added successfully",
            product,
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to add product" });
    }
};

/* =========================
   UPDATE PRODUCT
========================= */
export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const { name, price, category, image, isAvailable } = req.body;

        if (name !== undefined) product.name = name;
        if (price !== undefined) product.price = price;
        if (category !== undefined) product.category = category;
        if (image !== undefined) product.image = image;
        if (isAvailable !== undefined) product.isAvailable = isAvailable;

        await product.save();

        res.json({
            message: "Product updated successfully",
            product,
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to update product" });
    }
};

/* =========================
   DELETE PRODUCT
========================= */
export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.deleteOne();

        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete product" });
    }
};
