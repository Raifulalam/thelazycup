'use client';
import React, { useState } from 'react';

export default function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Contact Form:', form);
        alert('Message sent! We will contact you soon.');
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1f1208] px-6 py-12">
            <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-3xl shadow-lg w-full max-w-lg space-y-5">
                <h2 className="text-3xl font-bold text-amber-400 text-center">Contact Us</h2>

                <div className="flex flex-col">
                    <label className="mb-1 text-gray-300 font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-amber-400"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 text-gray-300 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-amber-400"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 text-gray-300 font-medium">Message</label>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Your message..."
                        rows={5}
                        className="p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-amber-400 resize-none"
                        required
                    ></textarea>
                </div>

                <button type="submit" className="w-full bg-amber-400 text-black py-3 rounded-2xl font-semibold hover:bg-amber-500 transition-all">
                    Send Message
                </button>
            </form>
        </div>
    );
}
