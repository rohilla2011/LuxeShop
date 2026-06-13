import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      description: "High-fidelity audio with active noise cancellation and 30-hour battery life.",
      price: 299.99,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: "2",
      name: "Minimalist Smartwatch",
      description: "Track fitness and notifications with a sleek AMOLED display and 7-day battery.",
      price: 199.50,
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: "3",
      name: "Ergonomic Mechanical Keyboard",
      description: "Satisfying tactile feedback with RGB lighting and hot-swappable switches.",
      price: 149.00,
      imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: "4",
      name: "Leather Workspace Mat",
      description: "Premium vegan leather desk mat. Water-resistant and ultra-durable.",
      price: 45.00,
      imageUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: "5",
      name: "Portable Bluetooth Speaker",
      description: "360° surround sound, IPX7 waterproof, and 20-hour battery life.",
      price: 89.99,
      imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: "6",
      name: "Ultra-Slim Laptop Stand",
      description: "Lightweight aluminum stand with perfect airflow for any laptop.",
      price: 59.99,
      imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: "7",
      name: "Noise-Cancelling Earbuds",
      description: "True wireless earbuds with ANC, transparency mode, and premium sound.",
      price: 179.99,
      imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: "8",
      name: "Wireless Charging Pad",
      description: "Fast 15W Qi wireless charger with sleek minimalist design.",
      price: 39.99,
      imageUrl: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: "9",
      name: "Premium Canvas Backpack",
      description: "Water-resistant canvas with leather accents. Fits 15\" laptops.",
      price: 129.00,
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: "10",
      name: "Smart LED Desk Lamp",
      description: "Touch-controlled brightness, 5 color temperatures, USB charging port.",
      price: 69.99,
      imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: "11",
      name: "Titanium Water Bottle",
      description: "Double-wall vacuum insulated. Cold 24hrs, hot 12hrs. BPA-free.",
      price: 34.99,
      imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: "12",
      name: "Minimalist Wallet",
      description: "Slim RFID-blocking genuine leather wallet. Holds 8 cards.",
      price: 49.99,
      imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=60",
    }
  ]);
}
