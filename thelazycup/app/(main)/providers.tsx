'use client';

import { AuthProvider } from '../context/Authcontext';

export default function Providers({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}
