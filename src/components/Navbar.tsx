"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { data: session } = useSession();
  const { items } = useCart();
  
  const cartCount = session ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.nav}`}>
        <Link href="/" className={styles.logo}>
          LuxeShop
        </Link>
        <div className={styles.actions}>
          {session && (
            <Link href="/cart" className={styles.cartBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Cart
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </Link>
          )}
          {session ? (
            <div className={styles.userMenu}>
              <span className={styles.userName}>{session.user?.name || session.user?.email}</span>
              <button onClick={() => signOut()} className={styles.btnSecondary}>Sign Out</button>
            </div>
          ) : (
            <Link href="/login" className={styles.btnPrimary}>Sign In</Link>
          )}
        </div>
      </div>
    </header>
  );
}
