import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
      <body className={inter.variable}>
        <Providers>
          <Navbar />
          <main className="container" style={{ padding: '1rem 1.5rem' }}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
