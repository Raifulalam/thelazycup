'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import api from "@/lib/api";
import { toast } from 'react-hot-toast';

export default function RegisterForm() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await api.post("/auth/register", form);

            localStorage.setItem("token", res.data.token);

            toast.success("Registration successful!")
            setForm({ name: "", email: "", password: "" });
            window.location.href = "/login";
        } catch (error) {
            setMessage(
                error.response?.data?.message

            );
            toast.error(" Registration failed")
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1f1208] px-6">
            <form
                onSubmit={handleRegister}
                className="bg-gray-900 p-8 rounded-3xl shadow-lg w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-amber-400 mb-6 text-center">Register</h2>

                <label className="block mb-2 text-gray-300 font-medium">Full Name</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-amber-400"
                    placeholder="John Doe"
                    required
                />

                <label className="block mb-2 text-gray-300 font-medium">Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-amber-400"
                    placeholder="you@example.com"
                    required
                />

                <label className="block mb-2 text-gray-300 font-medium">Password</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full p-3 mb-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-amber-400"
                    placeholder="********"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-amber-400 text-black py-3 rounded-2xl font-semibold hover:bg-amber-500 transition-all"
                >
                    {loading ? "Registering..." : "Register"}
                </button>



                <div className="mt-4 text-center text-gray-400 text-sm">
                    Already have an account? <Link href="/login" className="hover:text-amber-400">Login</Link>
                </div>

            </form>
        </div>
    );
}
