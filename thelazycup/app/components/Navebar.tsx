'use client';

import Link from 'next/link';
import { useAuth } from '../context/Authcontext';
import { useState } from 'react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    // 🔓 Public (not logged in)
    const publicLinks = [
        ['Home', '/'],
        ['Menu', '/menu'],
        ['Contact', '/contact'],
    ];


    console.log('Navbar user:', user); // ✅ CORRECT
    // 👤 Logged-in user
    const userLinks = [
        ['Home', '/'],
        ['Menu', '/menu'],
        ['Order', '/order'],
        ['Contact', '/contact'],
    ];

    // 👑 Admin-only
    const adminLinks = [
        ['Dashboard', '/admin/dashboard'],
        ['Manage Menu', '/admin/menu'],
        ['Orders', '/admin/orders'],
    ];

    // 🎯 Decide which links to show
    let navLinks: [string, string][] = publicLinks;

    if (user?.role === 'admin') {
        navLinks = [...userLinks, ...adminLinks];
    } else if (user?.role === 'user') {
        navLinks = userLinks;
    }

    return (
        <header className="sticky top-0 z-50 bg-black/70 backdrop-blur">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-amber-400">
                    ☕ The Lazy Cup
                </Link>

                {/* Links */}
                <ul className="hidden md:flex gap-6">
                    {navLinks.map(([label, path]) => (
                        <li key={path}>
                            <Link href={path} className="hover:text-amber-400">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right Actions */}
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="text-gray-300">{user.name}</span>
                        <Link href="/profile" className="text-amber-400">
                            Profile
                        </Link>
                        <button
                            onClick={logout}
                            className="text-red-400 hover:text-red-500"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="text-amber-400 border border-amber-400 px-4 py-2 rounded-full hover:bg-amber-400 hover:text-black transition"
                    >
                        Login
                    </Link>
                )}

            </nav>
        </header>
    );
}
