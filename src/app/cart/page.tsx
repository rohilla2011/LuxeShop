"use client";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import styles from "./cart.module.css";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, total } = useCart();
  const { data: session, status } = useSession();

  // If not logged in, show login prompt
  if (status !== "loading" && !session) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.lockIcon}>🔒</div>
        <h2>Sign In Required</h2>
        <p>Please sign in to view your cart and start shopping.</p>
        <Link href="/login" className={styles.btnPrimary}>Sign In</Link>
        <p className={styles.signupHint}>
          Don&apos;t have an account? <Link href="/signup">Create one</Link>
        </p>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className={styles.emptyCart}>
        <p>Loading...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyIcon}>🛒</div>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven&apos;t added anything yet.</p>
        <Link href="/" className={styles.btnPrimary}>Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.title}>Your Shopping Cart</h1>
      
      <div className={styles.cartLayout}>
        <div className={styles.itemsList}>
          {items.map((item, i) => (
            <div key={item.id} className={styles.cartItem} style={{ animationDelay: `${i * 0.05}s` }}>
              <div className={styles.itemImage}>
                <img src={item.imageUrl} alt={item.name} />
              </div>
              <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                <p className={styles.itemPrice}>${item.price.toFixed(2)} × {item.quantity}</p>
              </div>
              <div className={styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                ✕
              </button>
            </div>
          ))}
        </div>
        
        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal ({items.reduce((a, b) => a + b.quantity, 0)} items)</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>{total >= 99 ? 'Free' : '$9.99'}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total</span>
            <span>${(total >= 99 ? total : total + 9.99).toFixed(2)}</span>
          </div>
          
          <button className={styles.checkoutBtn} disabled>
            Proceed to Checkout (Coming Soon)
          </button>
          <p className={styles.secureNote}>🔒 Secure checkout powered by industry-leading encryption</p>
        </div>
      </div>
    </div>
  );
}
