import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    // Fallback if no products in DB
    if (products.length === 0) {
      return NextResponse.json([
        {
          id: "1",
          name: "Premium Wireless Headphones",
          description: "High-fidelity audio with active noise cancellation.",
          price: 299.99,
          imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
        },
        {
          id: "2",
          name: "Minimalist Smartwatch",
          description: "Track your fitness and notifications with style.",
          price: 199.50,
          imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60",
        },
        {
          id: "3",
          name: "Ergonomic Mechanical Keyboard",
          description: "Boost your productivity with satisfying tactile feedback.",
          price: 149.00,
          imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=60",
        }
      ]);
    }
    
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
