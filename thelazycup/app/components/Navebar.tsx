'use client';

import Link from 'next/link';
import { useAuth } from '../context/Authcontext';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    // 🔓 Public links
    const publicLinks: [string, string][] = [
        ['Home', '/'],
        ['Menu', '/menu'],
        ['Contact', '/contact'],
    ];

    // 👤 Logged-in user links
    const userLinks: [string, string][] = [
        ['Home', '/'],
        ['Menu', '/menu'],
        ['Order', '/order'],
        ['Contact', '/contact'],
    ];

    // 👑 Admin links
    const adminLinks: [string, string][] = [
        ['Dashboard', '/admin/dashboard'],
        ['Manage Menu', '/admin/products'],
        ['Orders', '/admin/orders'],
    ];

    // 🎯 Decide nav links
    let navLinks = publicLinks;

    if (user?.role === 'admin') {
        navLinks = [...userLinks, ...adminLinks];
    } else if (user?.role === 'user') {
        navLinks = userLinks;
    }

    return (
        <header className="sticky top-0 z-50 bg-black/70 backdrop-blur">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">

                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl sm:text-2xl font-bold text-amber-400"
                >
                    ☕ The Lazy Cup
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden md:flex gap-6 text-sm lg:text-base">
                    {navLinks.map(([label, path]) => (
                        <li key={path}>
                            <Link
                                href={path}
                                className="hover:text-amber-400 transition"
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4 text-sm lg:text-base">
                    {user ? (
                        <>
                            <span className="text-gray-300 max-w-[120px] truncate">
                                {user.name}
                            </span>

                            <Link
                                href="/profile"
                                className="text-amber-400 hover:underline"
                            >
                                Profile
                            </Link>

                            <button
                                onClick={logout}
                                className="text-red-400 hover:text-red-500"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="text-amber-400 border border-amber-400 px-4 py-1.5 rounded-full hover:bg-amber-400 hover:text-black transition"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-amber-400"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-black/90 backdrop-blur border-t border-gray-800">
                    <ul className="flex flex-col gap-3 px-4 py-4 text-sm">
                        {navLinks.map(([label, path]) => (
                            <li key={path}>
                                <Link
                                    href={path}
                                    onClick={() => setMenuOpen(false)}
                                    className="block py-2 hover:text-amber-400"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}

                        <div className="border-t border-gray-700 pt-3 mt-3">
                            {user ? (
                                <>
                                    <p className="text-gray-400 text-xs mb-2">
                                        Logged in as {user.name}
                                    </p>

                                    <Link
                                        href="/profile"
                                        onClick={() => setMenuOpen(false)}
                                        className="block py-2 text-amber-400"
                                    >
                                        Profile
                                    </Link>

                                    <button
                                        onClick={() => {
                                            logout();
                                            setMenuOpen(false);
                                        }}
                                        className="w-full text-left py-2 text-red-400"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="block text-center text-amber-400 border border-amber-400 py-2 rounded-full hover:bg-amber-400 hover:text-black transition"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </ul>
                </div>
            )}
        </header>
    );
}
