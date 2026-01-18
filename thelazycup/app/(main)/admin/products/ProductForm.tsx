'use client';
import { useState } from "react";
import api from "@/lib/api";

export default function ProductForm({ product, onClose }: any) {
    const [form, setForm] = useState({
        name: product?.name || "",
        price: product?.price || "",
        category: product?.category || "",
        image: product?.image || ""
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (product) {
            await api.patch(`/products/${product._id}`, form);
        } else {
            await api.post(`/products`, form);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 p-6 rounded-xl w-96"
            >
                <h2 className="text-xl mb-4">
                    {product ? "Update Product" : "Add Product"}
                </h2>

                <input
                    placeholder="Name"
                    className="w-full mb-3 p-2 bg-gray-800 rounded"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />

                <input
                    placeholder="Price"
                    type="number"
                    className="w-full mb-3 p-2 bg-gray-800 rounded"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                />

                <input
                    placeholder="Category"
                    className="w-full mb-3 p-2 bg-gray-800 rounded"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                />

                <input
                    placeholder="Image URL"
                    className="w-full mb-3 p-2 bg-gray-800 rounded"
                    value={form.image}
                    onChange={e => setForm({ ...form, image: e.target.value })}
                />

                <div className="flex justify-between">
                    <button type="submit" className="bg-amber-500 px-4 py-2 rounded">
                        Save
                    </button>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
