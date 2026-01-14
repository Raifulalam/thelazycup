'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '../../context/Authcontext'; // ✅ ADD THIS

export default function LoginForm() {
    const router = useRouter();
    const { login } = useAuth(); // ✅ GET LOGIN FUNCTION

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await api.post('/auth/login', {
                email,
                password
            });

            // 🔥 THIS IS THE MAGIC (UPDATES NAVBAR)
            login(res.data.user, res.data.token);
            localStorage.setItem("token", res.data.token);
            console.log('LOGIN RESPONSE:', res.data);


            // ✅ Redirect
            router.push('/');
        } catch (err) {
            setError(
                err.response?.data?.message || 'Invalid email or password'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1f1208] px-6">
            <form
                onSubmit={handleLogin}
                className="bg-gray-900 p-8 rounded-3xl shadow-lg w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-amber-400 mb-6 text-center">
                    Login
                </h2>

                {error && (
                    <p className="bg-red-500/20 text-red-400 p-2 rounded mb-4 text-center">
                        {error}
                    </p>
                )}

                <label className="block mb-2 text-gray-300 font-medium">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 rounded-xl bg-gray-800 text-white"
                    required
                />

                <label className="block mb-2 text-gray-300 font-medium">
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 rounded-xl bg-gray-800 text-white"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-400 py-3 rounded-2xl font-semibold"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <div className="mt-4 text-center text-gray-400 text-sm">
                    <Link href="/forgot-password">Forgot Password?</Link> |{' '}
                    <Link href="/register">Register</Link>
                </div>
            </form>
        </div>
    );
}
