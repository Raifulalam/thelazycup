'use client';

import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import { useAuth } from "@/app/context/Authcontext";
import { toast } from 'react-hot-toast';

export default function OrderPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { user } = useAuth();
    const [feedbackVisible, setFeedbackVisible] = useState<Record<string, boolean>>({});
    const [feedbackMessages, setFeedbackMessages] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState<Record<string, boolean>>({});
    const [ratings, setRatings] = useState<Record<string, number>>({});

    // Fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/orders/user/${user?.id}`);
                setOrders(res.data.orders || []);

            } catch (err) {
                setError("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };

        if (user?.id) fetchOrders();
    }, [user?.id]);

    if (loading)
        return <p className="text-center text-sm sm:text-base text-gray-400">Loading orders...</p>;

    if (error)
        return <p className="text-center text-sm sm:text-base text-red-500">{error}</p>;

    const toggleFeedback = (orderId: string) => {
        setFeedbackVisible(prev => ({
            ...prev,
            [orderId]: !prev[orderId]
        }));

        // clear old message
        setFeedbackMessages(prev => {
            const copy = { ...prev };
            delete copy[orderId];
            return copy;
        });
    };

    const handleRating = (orderId: string, value: number) => {
        setRatings(prev => ({
            ...prev,
            [orderId]: value
        }));
    };

    const handleFeedbackSubmit = async (orderId: string, message: string) => {
        const rating = ratings[orderId];

        if (!rating) {
            setFeedbackMessages(prev => ({ ...prev, [orderId]: "Please select a rating" }));
            return;
        }

        if (!message.trim()) {
            setFeedbackMessages(prev => ({ ...prev, [orderId]: "Please write feedback" }));
            return;
        }

        try {
            setSubmitting(prev => ({ ...prev, [orderId]: true }));

            await api.post(`/orders/${orderId}/feedback`, { message, rating });
            toast.success("Feedback submitted successfully")
            setFeedbackMessages(prev => ({
                ...prev,
                [orderId]: "✅ Feedback submitted successfully"
            }));

            setFeedbackVisible(prev => ({ ...prev, [orderId]: false }));

            setOrders(prev =>
                prev.map(order =>
                    order._id === orderId
                        ? { ...order, feedback: { message, rating } }
                        : order
                )
            );
        } catch (err: any) {
            setFeedbackMessages(prev => ({
                ...prev,
                [orderId]: err.response?.data?.message || "Failed to submit feedback"
            }));
            toast.error("Failed to submit feedback");
        } finally {
            setSubmitting(prev => ({ ...prev, [orderId]: false }));
        }
    };
    if (!user || user.role !== 'CUSTOMER') {
        toast.error("Please login again");
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1f1208] px-6 py-12">
                <p className="text-red-500 text-lg">Access Denied. Admins Only.</p>
            </div>
        );
    }
    const handlePayNow = () => {
        toast.success("Coming soon you may proceed with manual payment method");
        window.location.href = "/notfound";
    }
    return (
        <div className="min-h-screen bg-[#1f1208] py-6 px-3 sm:px-6 md:px-12 text-white">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-amber-400 text-center mb-8">
                🛒 Your Orders
            </h1>

            {orders.map(order => (
                <div
                    key={order._id}
                    className="bg-gray-900 p-4 sm:p-6 rounded-2xl shadow-lg my-6"
                >

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-3">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-amber-400">
                            Order #{order._id.slice(-6)}
                        </h2>
                        <span className="text-xs sm:text-sm text-gray-300">
                            {order.status}
                        </span>
                    </div>

                    {/* Items */}
                    <ul className="space-y-1 text-sm sm:text-base">
                        {order.items.map((item: any) => (
                            <li key={item._id} className="flex justify-between">
                                <span>{item.name} × {item.quantity}</span>
                                <span>Rs.{item.price * item.quantity}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Total */}
                    <div className="flex flex-col sm:flex-row sm:justify-between mt-3 gap-1 text-sm sm:text-base">
                        <p className="font-semibold">
                            Total:
                            <span className="ml-1 text-amber-400">
                                Rs.{order.totalAmount}
                            </span><br />
                            {order.paymentStatus !== "PAID" && (
                                <button className="text-sm sm:text-base bg-green-400 text-white px-3 py-1.5 sm:px-4 sm:py-1 rounded-full hover:bg-green-500" onClick={handlePayNow}>Pay now</button>
                            )}
                        </p>

                        <p className="font-semibold text-gray-200">
                            Payment:
                            <span className="ml-1 text-orange-300">
                                {order.paymentStatus}
                            </span>
                        </p>
                    </div>

                    {/* Feedback */}
                    {order.status === "COMPLETED" && (
                        <div className="mt-4">
                            {order.feedback?.message ? (
                                <div className="bg-gray-800 p-3 rounded-xl">
                                    <p className="text-xs sm:text-sm text-yellow-400 mb-1">
                                        ⭐ {order.feedback.rating} / 5
                                    </p>
                                    <p className="text-sm sm:text-base text-gray-300 italic">
                                        “{order.feedback.message}”
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() => toggleFeedback(order._id)}
                                        className="text-sm sm:text-base bg-amber-400 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hover:bg-amber-500"
                                    >
                                        {feedbackVisible[order._id] ? "Hide Feedback" : "Give Feedback"}
                                    </button>

                                    {feedbackVisible[order._id] && (
                                        <form
                                            className="mt-4"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                const message = (e.target as any).message.value;
                                                handleFeedbackSubmit(order._id, message);
                                            }}
                                        >
                                            {/* Stars */}
                                            <div className="flex gap-2 mb-3">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        disabled={submitting[order._id]}
                                                        onClick={() => handleRating(order._id, star)}
                                                        className={`text-xl sm:text-2xl ${(ratings[order._id] || 0) >= star
                                                            ? "text-yellow-400"
                                                            : "text-gray-500"
                                                            }`}
                                                    >
                                                        ★
                                                    </button>
                                                ))}
                                            </div>

                                            <textarea
                                                name="message"
                                                className="w-full p-2 text-sm sm:text-base rounded-lg bg-gray-800 text-white"
                                                placeholder="Write your feedback..."
                                            />

                                            <button
                                                type="submit"
                                                disabled={submitting[order._id]}
                                                className="mt-3 text-sm sm:text-base bg-amber-400 px-4 py-2 rounded-full hover:bg-amber-500 disabled:opacity-50"
                                            >
                                                {submitting[order._id] ? "Submitting..." : "Submit Feedback"}
                                            </button>
                                        </form>
                                    )}
                                </>
                            )}

                            {feedbackMessages[order._id] && (
                                <p className="mt-2 text-xs sm:text-sm text-green-400">
                                    {feedbackMessages[order._id]}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
