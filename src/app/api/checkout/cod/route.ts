import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items, amount, address } = await req.json();

    if (!items || items.length === 0 || !amount || !address) {
      return NextResponse.json({ error: "Invalid order data or missing address" }, { status: 400 });
    }

    const userId = (session.user as any).id as string;
    
    // Create COD order in DB
    const newOrder = await prisma.order.create({
      data: {
        userId,
        amount,
        address,
        status: "COD_CONFIRMED",
        paymentMethod: "COD",
        orderItems: {
          create: items.map((item: any) => {
            // Ensure productId is a 24-char hex string for MongoDB
            const validId = /^[0-9a-fA-F]{24}$/.test(item.id) 
              ? item.id 
              : Buffer.from(String(item.id)).toString('hex').padStart(24, '0').slice(-24);
            return {
              productId: validId,
              quantity: item.quantity,
              price: item.price,
            };
          }),
        },
      },
    });

    // Clear user's cart in DB
    await prisma.cartItem.deleteMany({
      where: { userId },
    });

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error: any) {
    console.error("COD checkout error:", error);
    return NextResponse.json({ error: error?.message || "Internal Server Error" }, { status: 500 });
  }
}
