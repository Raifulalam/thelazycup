'use client';
import api from "@/lib/api";

export default function ProductCard({ product, onEdit, onDelete }: any) {
    const handleDelete = async () => {
        if (!confirm("Delete this product?")) return;
        await api.delete(`/products/${product._id}`);
        onDelete();
    };

    const toggleAvailability = async () => {
        await api.patch(`/products/${product._id}`, {
            isAvailable: !product.isAvailable
        });
        onDelete();
    };

    return (
        <div className="bg-gray-900 p-4 rounded-xl">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p>Rs. {product.price}</p>
            <p className="text-sm text-gray-400">{product.category}</p>

            <p className={`mt-2 ${product.isAvailable ? "text-green-400" : "text-red-400"}`}>
                {product.isAvailable ? "Available" : "Unavailable"}
            </p>

            <div className="flex gap-3 mt-4">
                <button
                    onClick={() => onEdit(product)}
                    className="bg-blue-500 px-3 py-1 rounded"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 px-3 py-1 rounded"
                >
                    Delete
                </button>
                <button
                    onClick={toggleAvailability}
                    className="bg-yellow-500 px-3 py-1 rounded"
                >
                    Toggle
                </button>
            </div>
        </div>
    );
}
