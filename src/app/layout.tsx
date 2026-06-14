import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "LuxeShop — Premium E-Commerce",
  description: "Discover premium, curated products designed for the modern lifestyle. Shop exclusive items from a trusted seller.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Providers>
          <Navbar />
          <main className="container" style={{ padding: '1rem 1.5rem' }}>
            {children}
          </main>
          <Footer />
          <Chatbot />
        </Providers>
      </body>
    </html>
  );
}
