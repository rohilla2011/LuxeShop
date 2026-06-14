import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, items, amount, address } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Payment is successful, create order in DB
    const userId = session.user.id as string;
    
    const newOrder = await prisma.order.create({
      data: {
        userId,
        amount,
        address,
        status: "PAID",
        paymentMethod: "RAZORPAY",
        razorpayOrderId: razorpay_order_id,
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

    // Optional: Clear user's cart in DB if stored there
    await prisma.cartItem.deleteMany({
      where: { userId },
    });

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error: any) {
    console.error("Razorpay verify error:", error);
    return NextResponse.json({ error: error?.message || "Internal Server Error", stack: error?.stack }, { status: 500 });
  }
}
