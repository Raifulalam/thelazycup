'use client';
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Page Not Found - Coffee Break",
    description: "The page you are looking for is taking a coffee break.",
};
import "./globals.css"
export default function NotFound() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-6">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
                <h1 className="text-4xl font-bold text-yellow-800 mb-4">☕ Oops! Page Not Found</h1>
                <p className="text-gray-700 mb-6">
                    Looks like the page you are looking for took a coffee break.
                    Please check the URL or head back to our homepage.
                </p>
                <a
                    href="/"
                    className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition"
                >
                    Back to Home
                </a>
            </div>
            <img
                src="/images/coffee-cup.png"
                alt="Coffee Cup"
                className="mt-8 w-32 animate-bounce"
            />
        </div>
    );
}
