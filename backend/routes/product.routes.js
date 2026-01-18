import express from "express";
import {
    getProducts,
    getProductById as ProductById,
    getProductsPaginated,
    updateProduct,
    deleteProduct,
    addProduct
} from "../controllers/product.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/menu", getProducts);
router.get("/paginated", protect, getProductsPaginated);
router.get("/:productId", protect, ProductById);
router.patch("/:productId", protect, updateProduct);
router.delete("/:productId", protect, deleteProduct);
router.post("/", protect, addProduct);



export default router;
