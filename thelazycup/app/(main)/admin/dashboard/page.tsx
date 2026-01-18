"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { useAuth } from "@/app/context/Authcontext";

type Product = {
    _id: string;
    name: string;
    price: number;
    category: string;
};

type Order = {
    _id: string;
    totalAmount: number;
    status: string;
    createdAt: string;
};

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const orderRes = await api.get("/orders");
                const productRes = await api.get("/products/menu");

                setProducts(productRes.data || []);
                setOrders(orderRes.data.orders || []);
            } catch (err) {
                setMessage(
                    err.response?.data?.message || "Failed to fetch admin data"
                );

            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    /* 🔢 Revenue */
    const totalRevenue = orders.reduce(
        (sum, o) => sum + (o.totalAmount || 0),
        0
    );

    /* 📅 Filter today's orders */
    const today = new Date().toISOString().split("T")[0];

    const todayOrders = orders.filter(order =>
        order.createdAt?.startsWith(today)
    );

    /* 📦 Top 8 products */
    const topProducts = products.slice(0, 8);
    if (!user || user.role !== 'ADMIN') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1f1208] px-6 py-12">
                <p className="text-red-500 text-lg">Access Denied. Admins Only.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1f1208] px-4 sm:px-6 py-6 text-white">
            {/* Header */}
            <h1 className="text-2xl sm:text-4xl font-bold text-amber-400 mb-6">
                🛠 Admin Dashboard
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                <StatCard title="Products" value={products.length} />
                <StatCard title="Orders" value={orders.length} />
                <StatCard title="Revenue" value={`Rs.${totalRevenue}`} />
            </div>

            {loading ? (
                <p className="text-gray-300 text-sm">Loading admin data...</p>
            ) : (
                <>
                    {/* 📦 Products (Top 8) */}
                    <section className="mb-10">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg sm:text-xl font-semibold text-amber-400">
                                📦 Top Products
                            </h2>
                            <Link
                                href="/admin/products"
                                className="text-xs sm:text-sm text-amber-400 hover:underline"
                            >
                                View All →
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-xs sm:text-sm text-gray-300">
                                <thead className="bg-gray-800 text-amber-400">
                                    <tr>
                                        <th className="p-2 text-left">Name</th>
                                        <th className="p-2 text-center">Category</th>
                                        <th className="p-2 text-center">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topProducts.map(p => (
                                        <tr
                                            key={p._id}
                                            className="border-b border-gray-800 hover:bg-gray-800"
                                        >
                                            <td className="p-2">{p.name}</td>
                                            <td className="p-2 text-center">{p.category}</td>
                                            <td className="p-2 text-center">Rs.{p.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 🧾 Orders (Today Only) */}
                    <section>
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg sm:text-xl font-semibold text-amber-400">
                                🧾 Today’s Orders
                            </h2>
                            <Link
                                href="/admin/orders"
                                className="text-xs sm:text-sm text-amber-400 hover:underline"
                            >
                                View All →
                            </Link>
                        </div>

                        {todayOrders.length === 0 ? (
                            <p className="text-gray-400 text-sm">
                                No orders placed today.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {todayOrders.map(o => (
                                    <div
                                        key={o._id}
                                        className="bg-gray-900 p-3 rounded-lg flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="text-xs sm:text-sm text-gray-200">
                                                Order #{o._id.slice(-6)}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Status: {o.status}
                                            </p>
                                        </div>
                                        <p className="text-sm sm:text-base text-amber-400 font-semibold">
                                            Rs.{o.totalAmount}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </>
            )}
        </div>
    );
}

/* Reusable Stat Card */
function StatCard({ title, value }: { title: string; value: any }) {
    return (
        <div className="bg-gray-900 p-4 rounded-xl shadow-md">
            <p className="text-xs sm:text-sm text-gray-400">{title}</p>
            <p className="text-lg sm:text-2xl font-bold text-amber-400">
                {value}
            </p>
        </div>
    );
}
