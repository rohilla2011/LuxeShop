import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import styles from "./orders.module.css";
import Link from "next/link";
import { products } from "@/data/products";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! }
  });

  if (!user) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { orderItems: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className={`container ${styles.container}`}>
      <h1 className={styles.title}>My Orders</h1>
      {orders.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📦</div>
          <h2>No orders yet</h2>
          <p>You haven't placed any orders. Start exploring our premium collection.</p>
          <Link href="/#products" className={styles.shopBtn}>Explore Products</Link>
        </div>
      ) : (
        <div className={styles.orderList}>
          {orders.map(order => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.orderInfo}>
                  <span className={styles.orderId}>Order #{order.id.slice(-6).toUpperCase()}</span>
                  <span className={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className={styles.orderStatus}>
                  <span className={styles.statusBadge}>
                    {order.status}
                  </span>
                  <span className={styles.orderTotal}>₹{order.amount.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <div className={styles.orderItems}>
                {order.orderItems.map(item => {
                  const productDetails = products.find(p => p.id === item.productId);
                  return (
                    <div key={item.id} className={styles.orderItem}>
                      {productDetails ? (
                        <img src={productDetails.imageUrl} alt={productDetails.name} className={styles.itemImage} />
                      ) : (
                        <div className={styles.itemImagePlaceholder} />
                      )}
                      <div className={styles.itemDetails}>
                        <h4>{productDetails?.name || `Product ${item.productId}`}</h4>
                        <p>Qty: {item.quantity}</p>
                      </div>
                      <div className={styles.itemPrice}>
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
