import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Providers from './providers';
import '../globals.css';
import Navbar from '../components/Navebar';
const geistSans = Geist({ subsets: ['latin'] });
const geistMono = Geist_Mono({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: 'The Lazy Cup',
  description: 'Premium café experience – coffee, tea & hookah',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} ${geistMono.className} bg-[#1f1208] text-white`}>
        <Providers>

          {/* ✅ NAVBAR MOUNTED HERE */}
          <Navbar />

          {/* PAGE CONTENT */}
          <main className="min-h-screen">
            {children}
          </main>

        </Providers>
      </body>
    </html>
  );
}