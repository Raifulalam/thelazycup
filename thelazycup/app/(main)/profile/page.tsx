"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

type User = {
    name: string;
    email: string;
    role: string;
};

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("TOKEN:", localStorage.getItem("token"));

        const fetchProfile = async () => {
            try {
                const res = await api.get("/auth/profile");
                console.log("PROFILE RESPONSE:", res.data);
                setUser(res.data);
            } catch (error: any) {
                console.error("PROFILE ERROR:", error.response?.data);
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading profile...
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#1f1208] flex items-center justify-center px-4">
            <div className="bg-gray-900 p-8 rounded-3xl shadow-lg max-w-md w-full text-white">
                <h2 className="text-3xl font-bold text-amber-400 mb-6 text-center">
                    My Profile
                </h2>

                <div className="space-y-3">
                    <p>
                        <span className="text-gray-400">Name:</span>{" "}
                        <span className="font-semibold">{user.name}</span>
                    </p>

                    <p>
                        <span className="text-gray-400">Email:</span>{" "}
                        <span className="font-semibold">{user.email}</span>
                    </p>

                    <p>
                        <span className="text-gray-400">Role:</span>{" "}
                        <span className="font-semibold capitalize">
                            {user.role}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
