'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function OrderPage() {
    // Simulated cart items
    const [cartItems, setCartItems] = useState([
        { name: 'Espresso', price: 3.0, quantity: 1 },
        { name: 'Latte', price: 4.5, quantity: 2 },
    ]);

    const [customer, setCustomer] = useState({
        name: '',
        phone: '',
        address: '',
    });

    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCustomer(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const handleCheckout = () => {
        if (!customer.name || !customer.phone || !customer.address) {
            alert("Please fill in all details!");
            return;
        }

        console.log("Order placed:", { customer, cartItems, total: totalPrice });

        setOrderPlaced(true);
        setCartItems([]);
        setCustomer({ name: '', phone: '', address: '' });

        setTimeout(() => setOrderPlaced(false), 3000);
    };

    return (
        <div className="min-h-screen bg-[#1f1208] py-12 px-6 md:px-12 text-white">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-400 text-center mb-12">
                🛒 Your Order
            </h1>

            {cartItems.length === 0 ? (
                <div className="text-center text-gray-400">
                    Your cart is empty. <Link href="/menu" className="text-amber-400 underline">Browse Menu</Link>
                </div>
            ) : (
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
                    {/* Cart Items */}
                    <div className="bg-gray-900 p-6 rounded-3xl shadow-lg">
                        <h2 className="text-2xl font-semibold text-amber-400 mb-6">Cart Items</h2>
                        <ul className="space-y-4">
                            {cartItems.map((item, index) => (
                                <li key={index} className="flex justify-between items-center bg-gray-800 p-4 rounded-2xl">
                                    <div>
                                        <p className="text-gray-200 font-medium">{item.name}</p>
                                        <p className="text-gray-400 text-sm">
                                            ${item.price.toFixed(2)} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 text-gray-200 font-semibold text-lg">
                            Total: <span className="text-amber-400">${totalPrice.toFixed(2)}</span>
                        </p>
                    </div>

                    {/* Customer Form */}
                    <div className="bg-gray-900 p-6 rounded-3xl shadow-lg space-y-5">
                        <h2 className="text-2xl font-semibold text-amber-400 mb-4">Customer Information</h2>

                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col">
                                <label className="mb-1 text-gray-300 font-medium">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={customer.name}
                                    onChange={handleInputChange}
                                    placeholder="Your full name"
                                    className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-amber-400 transition"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-1 text-gray-300 font-medium">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={customer.phone}
                                    onChange={handleInputChange}
                                    placeholder="Your phone number"
                                    className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-amber-400 transition"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-1 text-gray-300 font-medium">Delivery Address</label>
                                <textarea
                                    name="address"
                                    value={customer.address}
                                    onChange={handleInputChange}
                                    placeholder="Your delivery address"
                                    className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-amber-400 resize-none transition"
                                    rows={3}
                                ></textarea>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="mt-6 w-full bg-amber-400 text-black py-3 rounded-2xl font-semibold hover:bg-amber-500 transition-all shadow-md hover:shadow-lg active:scale-95"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            )}

            {/* Success Toast */}
            {orderPlaced && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-amber-400 text-black px-6 py-3 rounded-2xl shadow-lg font-semibold animate-bounce">
                    🎉 Order placed successfully! We will contact you soon.
                </div>
            )}
        </div>
    );
}
