'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type User = {
    id: string;
    name: string;
    email: string;
    role: 'CUSTOMER' | 'ADMIN';
};

type AuthContextType = {
    user: User | null;
    login: (user: User, token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // ✅ restore login safely
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) return;

        try {
            const parsedUser = JSON.parse(userData);

            // extra safety check
            if (
                parsedUser &&
                typeof parsedUser === 'object' &&
                parsedUser.email
            ) {
                setUser(parsedUser);
            } else {
                throw new Error('Invalid user object');
            }
        } catch (error) {
            console.error('Invalid user data, clearing storage', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
        }
    }, []);

    const login = (user: User, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used inside AuthProvider');
    }
    return ctx;
};
