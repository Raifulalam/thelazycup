'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Forgot Password Email:', email);
        alert('Password reset functionality will be connected to backend!');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1f1208] px-6">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 p-8 rounded-3xl shadow-lg w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-amber-400 mb-6 text-center">Forgot Password</h2>

                <label className="block mb-2 text-gray-300 font-medium">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-amber-400"
                    placeholder="you@example.com"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-amber-400 text-black py-3 rounded-2xl font-semibold hover:bg-amber-500 transition-all"
                >
                    Reset Password
                </button>

                <div className="mt-4 text-center text-gray-400 text-sm">
                    Remember your password? <Link href="/login" className="hover:text-amber-400">Login</Link>
                </div>
            </form>
        </div>
    );
}
