'use client';
import { useEffect, useState } from "react";
import api from "@/lib/api";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import { useAuth } from "@/app/context/Authcontext";
export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editProduct, setEditProduct] = useState<any>(null);
    const { user } = useAuth();
    const [message, setMessage] = useState("");

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/products/paginated?page=${page}&search=${search}`);
            setProducts(res.data.products);
        } catch (err: any) {
            const message =
                err?.response?.data?.message || "Failed to fetch admin data";
            setMessage(message);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, search]);
    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1f1208] px-6 py-12">
                <p className="text-red-500 text-lg">Access Denied. Admins Only.</p>
            </div>
        );
    }
    return (
        <div className="p-8 text-white">
            <div className="flex justify-between mb-6">
                <input
                    placeholder="Search product..."
                    className="p-2 rounded bg-gray-800"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-amber-500 px-4 py-2 rounded"
                >
                    + Add Product
                </button>
            </div>

            {loading && <p>Loading...</p>}

            <div className="grid md:grid-cols-3 gap-6">
                {products.map(product => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onEdit={setEditProduct}
                        onDelete={fetchProducts}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex gap-4 justify-center mt-8">
                <button onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
                <span>Page {page}</span>
                <button onClick={() => setPage(p => p + 1)}>Next</button>
            </div>

            {(showForm || editProduct) && (
                <ProductForm
                    product={editProduct}
                    onClose={() => {
                        setShowForm(false);
                        setEditProduct(null);
                        fetchProducts();
                    }}
                />
            )}
        </div>
    );
}
