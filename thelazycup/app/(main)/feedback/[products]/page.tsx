'use client';
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useParams } from "next/navigation";

export default function ProductFeedbackPage() {
    const { productId } = useParams();
    const [feedbacks, setFeedbacks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/feedback/product/${productId}`)
            .then(res => setFeedbacks(res.data))
            .finally(() => setLoading(false));
    }, [productId]);

    if (loading) return <p className="text-center text-gray-400">Loading feedback...</p>;

    return (
        <div className="min-h-screen bg-[#1f1208] text-white p-8">
            <h1 className="text-3xl text-amber-400 font-bold mb-6">
                ⭐ Product Feedback
            </h1>

            {feedbacks.length === 0 ? (
                <p className="text-gray-400">No feedback yet.</p>
            ) : (
                <div className="space-y-4">
                    {feedbacks.map((fb, i) => (
                        <div key={i} className="bg-gray-900 p-4 rounded-xl">
                            <div className="flex justify-between">
                                <span className="font-semibold">{fb.user}</span>
                                <span className="text-yellow-400">
                                    {"★".repeat(fb.rating)}
                                </span>
                            </div>
                            <p className="text-gray-300 mt-2">{fb.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
