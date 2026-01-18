'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useParams } from 'next/navigation';

interface Feedback {
    user?: string;
    rating: number;
    message: string;
    createdAt?: string;
}

interface FeedbackResponse {
    submitted: boolean;
    feedback: Feedback[];
}

export default function ProductFeedbackPage() {
    const params = useParams<{ products: string }>();
    const productId = params?.products;

    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!productId) {
            setLoading(false);
            return;
        }

        const fetchFeedback = async () => {
            try {
                const res = await api.get<FeedbackResponse>(
                    `/${productId}/feedback`
                );

                setSubmitted(res.data.submitted);
                setFeedbacks(res.data.feedback || []);
            } catch (error) {
                console.error('Failed to fetch feedback', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, [productId]);

    if (loading) {
        return (
            <p className="text-center text-gray-400 py-10">
                Loading feedback...
            </p>
        );
    }

    return (
        <div className="min-h-screen bg-[#1f1208] text-white px-4 sm:px-6 md:px-10 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl sm:text-3xl md:text-4xl text-amber-400 font-bold mb-6 text-center">
                    ⭐ Product Feedback
                </h1>

                {!submitted || feedbacks.length === 0 ? (
                    <p className="text-gray-400 text-center">
                        No feedback yet.
                    </p>
                ) : (
                    <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
    ">
                        {feedbacks.map((fb, i) => (
                            <div
                                key={i}
                                className="
                    bg-gray-900
                    p-5
                    rounded-xl
                    shadow-md
                    hover:shadow-lg
                    transition
                "
                            >
                                {/* Header */}
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-semibold text-white">
                                            {fb.user || 'Anonymous'}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {fb.createdAt
                                                ? new Date(fb.createdAt).toLocaleDateString()
                                                : ''}
                                        </p>
                                    </div>

                                    <span className="text-yellow-400 text-sm">
                                        {'★'.repeat(fb.rating)}
                                    </span>
                                </div>

                                {/* Message */}
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {fb.message}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}
