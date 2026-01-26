"use client";
import { useAuth } from "@/app/context/Authcontext";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

type Product = {
    _id: string;
    name: string;
    price: number;
    description?: string;
    category: string;
};

export default function MenuPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [order, setOrder] = useState([]);

    const categories = [
        { label: "All", value: "all" },
        { label: "☕ Coffee", value: "coffee" },
        { label: "🍵 Tea", value: "tea" },
        { label: "🍋 Lemon Tea", value: "lemon-tea" },
        { label: "💨 Hookah", value: "hookah" }
    ];

    const [activeCategory, setActiveCategory] = useState("all");
    const [menuItems, setMenuItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const res = await api.get("/products/menu", {
                    params: {
                        category:
                            activeCategory === "all"
                                ? "ALL"
                                : activeCategory.toUpperCase().replace("-", "_")
                    }
                });
                setMenuItems(res.data);
            } catch (error) {
                console.error("Failed to load menu");
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, [activeCategory]);



    const addToCart = (item: Product) => {
        setCartItems(prev => [...prev, item]);
        toast.success("Item added sucessfully")

    };

    const removeFromCart = (index: number) => {
        setCartItems(prev => prev.filter((_, i) => i !== index));
        toast.success("Item removed sucessfully");
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handleCheckout = async () => {
        if (!user) {
            toast.error("You are not logged in!");
            return;
        }

        if (!cartItems.length) {
            toast.error("Your cart is empty");
            return;
        }

        const groupedItems = cartItems.reduce((acc: any[], item) => {
            const existing = acc.find(i => i.productId === item._id);

            if (existing) {
                existing.quantity += 1;
            } else {
                acc.push({
                    productId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: 1,
                });
            }

            return acc;
        }, []);

        const totalAmount = groupedItems.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
        );

        try {
            await api.post("/orders", {
                customerId: user.id,
                items: groupedItems,
                totalAmount,
            });

            toast.success("Order placed successfully 🎉");
            setCheckoutSuccess(true);
            setCartItems([]);
            setCartOpen(false);

            setTimeout(() => setCheckoutSuccess(false), 3000);

        } catch (error: any) {
            if (error.response?.status === 401) {
                toast.error("Session expired. Please login again");
            } else {
                toast.error("Failed to place order. Try again");
            }
        }
    };


    return (
        <div className="min-h-screen bg-[#1f1208] py-8 px-4 sm:px-6">
            {/* Heading */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-amber-400 text-center mb-8">
                ☕ Our Menu
            </h1>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
                {categories.map(cat => (
                    <button
                        key={cat.value}
                        onClick={() => setActiveCategory(cat.value)}
                        className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition
                        ${activeCategory === cat.value
                                ? "bg-amber-400 text-black"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Menu */}
            {loading ? (
                <p className="text-center text-gray-300 text-sm">Loading menu...</p>
            ) : (
                <ul className="grid gap-5 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                    {menuItems.map(item => (
                        <li
                            key={item._id}
                            className="bg-gray-900 p-4 sm:p-6 rounded-2xl shadow-md flex flex-col justify-between"
                        >

                            <div>

                                <h2 className="text-base sm:text-xl font-semibold text-amber-400 flex justify-between mb-2">
                                    {item.name}
                                    <span className="text-gray-200 text-sm sm:text-lg">
                                        Rs.{item.price.toFixed(2)}
                                    </span>
                                </h2>

                                {item.description && (
                                    <p className="text-gray-300 text-xs sm:text-sm">
                                        {item.description}
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={() => router.push(`/feedback/${item._id}`)}
                                className="text-xs sm:text-sm text-amber-400 mt-2 hover:underline"
                            >
                                View Feedback
                            </button>

                            <button
                                onClick={() => addToCart(item)}
                                className="mt-4 w-full bg-amber-500 text-black py-2 text-sm sm:text-base rounded-xl font-semibold hover:bg-amber-600"
                            >
                                Add to Cart
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Cart Sidebar */}
            {cartOpen && (
                <div className="fixed top-0 right-0 h-full w-full sm:w-80 bg-gray-800 p-5 z-50 overflow-y-auto">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-lg sm:text-2xl text-amber-400 font-bold">
                            🛒 Cart
                        </h2>
                        <button onClick={() => setCartOpen(false)}>✕</button>
                    </div>

                    {cartItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between bg-gray-900 p-3 mb-3 rounded-lg"
                        >
                            <div>
                                <p className="text-gray-200 text-sm">{item.name}</p>
                                <p className="text-gray-400 text-xs">
                                    Rs.{item.price}
                                </p>
                            </div>
                            <button
                                onClick={() => removeFromCart(index)}
                                className="text-red-400"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {cartItems.length > 0 && (
                        <>
                            <p className="text-gray-200 text-sm font-semibold">
                                Total: Rs.{totalPrice.toFixed(2)}
                            </p>
                            <button
                                onClick={handleCheckout}
                                className="mt-3 w-full bg-amber-400 text-black py-2 rounded-xl text-sm font-semibold"
                            >
                                Checkout
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* Floating Button */}
            {cartItems.length > 0 && !cartOpen && (
                <button
                    onClick={() => setCartOpen(true)}
                    className="fixed bottom-5 right-5 bg-amber-500 text-black px-4 py-2 rounded-full text-sm shadow-lg"
                >
                    🛒 {cartItems.length}
                </button>
            )}

            {/* Toast */}
            {checkoutSuccess && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-amber-400 text-black px-4 py-2 rounded-xl text-sm font-semibold">
                    🎉 Order placed successfully!
                </div>
            )}
        </div>
    );
}
