'use client';

import React, { useState } from "react";

export default function Menu() {
    const menuItems = [
        { name: 'Espresso', price: 3.0, description: 'Strong and bold coffee shot.', category: 'coffee' },
        { name: 'Cappuccino', price: 4.0, description: 'Classic Italian coffee with milk foam.', category: 'coffee' },
        { name: 'Latte', price: 4.5, description: 'Smooth and creamy coffee.', category: 'coffee' },
        { name: 'Mocha', price: 5.0, description: 'Chocolate flavored coffee.', category: 'coffee' },
        { name: 'Milk Tea', price: 2.5, description: 'Hot milk tea.', category: 'tea' },
        { name: 'Green Tea', price: 2.0, description: 'Refreshing green tea.', category: 'tea' },
        { name: 'Lemon Tea', price: 2.2, description: 'Fresh lemon tea.', category: 'lemon-tea' },
        { name: 'Mint Hookah', price: 6.0, description: 'Cool mint flavor.', category: 'hookah' },
        { name: 'Apple Hookah', price: 6.5, description: 'Sweet apple flavor.', category: 'hookah' },
    ];

    const categories = [
        { label: 'All', value: 'all' },
        { label: '☕ Coffee', value: 'coffee' },
        { label: '🍵 Tea', value: 'tea' },
        { label: '🍋 Lemon Tea', value: 'lemon-tea' },
        { label: '💨 Hookah', value: 'hookah' },
    ];

    const [activeCategory, setActiveCategory] = useState('all');
    const [cartItems, setCartItems] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    const filteredItems =
        activeCategory === 'all'
            ? menuItems
            : menuItems.filter(item => item.category === activeCategory);

    const addToCart = (item) => {
        setCartItems(prev => [...prev, item]);
        setCartOpen(true);
    };

    const removeFromCart = (index) => {
        setCartItems(prev => prev.filter((_, i) => i !== index));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handleCheckout = () => {
        if (cartItems.length === 0) return;

        // Simulate sending order to backend or payment processing
        console.log("Order placed:", cartItems, "Total:", totalPrice);

        // Show success message
        setCheckoutSuccess(true);

        // Clear cart
        setCartItems([]);
        setCartOpen(false);

        // Auto-hide success after 3 seconds
        setTimeout(() => setCheckoutSuccess(false), 3000);
    };

    return (
        <div className="min-h-screen bg-[#1f1208] py-12 px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-400 text-center mb-10">
                ☕ Our Menu
            </h1>

            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map(cat => (
                    <button
                        key={cat.value}
                        onClick={() => setActiveCategory(cat.value)}
                        className={`px-5 py-2 rounded-full font-medium text-sm transition
              ${activeCategory === cat.value
                                ? 'bg-amber-400 text-black shadow-md'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Menu Items */}
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {filteredItems.map((item, index) => (
                    <li
                        key={index}
                        className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-xl font-semibold text-amber-400 flex justify-between items-center mb-3">
                                {item.name} <span className="text-gray-200 text-lg">${item.price.toFixed(2)}</span>
                            </h2>
                            <p className="text-gray-300">{item.description}</p>
                        </div>
                        <button
                            onClick={() => addToCart(item)}
                            className="mt-6 w-full bg-amber-500 text-black py-2.5 rounded-xl font-semibold hover:bg-amber-600 active:scale-95 transition-all"
                        >
                            Add to Cart
                        </button>
                    </li>
                ))}
            </ul>

            {/* Cart Sidebar */}
            {cartOpen && (
                <div className="fixed top-0 right-0 h-full w-80 bg-gray-800 shadow-xl p-6 z-50 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-amber-400">🛒 Cart</h2>
                        <button
                            onClick={() => setCartOpen(false)}
                            className="text-gray-300 hover:text-white text-2xl"
                        >
                            ✕
                        </button>
                    </div>

                    {cartItems.length === 0 ? (
                        <p className="text-gray-300">Your cart is empty.</p>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map((item, index) => (
                                <li key={index} className="flex justify-between items-center bg-gray-900 p-3 rounded-lg">
                                    <div>
                                        <p className="text-gray-200 font-medium">{item.name}</p>
                                        <p className="text-gray-400 text-sm">${item.price.toFixed(2)}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(index)}
                                        className="text-red-500 hover:text-red-400 font-bold text-lg"
                                    >
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    {cartItems.length > 0 && (
                        <div className="mt-6">
                            <p className="text-gray-200 font-semibold text-lg">
                                Total: ${totalPrice.toFixed(2)}
                            </p>
                            <button
                                onClick={handleCheckout}
                                className="mt-4 w-full bg-amber-400 text-black py-2.5 rounded-xl font-semibold hover:bg-amber-500 transition-all"
                            >
                                Checkout
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Cart Floating Button */}
            {cartItems.length > 0 && !cartOpen && (
                <button
                    onClick={() => setCartOpen(true)}
                    className="fixed bottom-6 right-6 bg-amber-500 text-black px-6 py-3 rounded-full shadow-lg hover:bg-amber-600 transition-all"
                >
                    🛒 {cartItems.length} Items
                </button>
            )}

            {/* Success Toast */}
            {checkoutSuccess && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-amber-400 text-black px-6 py-3 rounded-xl shadow-lg font-semibold animate-bounce">
                    🎉 Order placed successfully!
                </div>
            )}
        </div>
    );
}
