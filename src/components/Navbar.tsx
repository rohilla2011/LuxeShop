"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import styles from "./Navbar.module.css";
import UserDropdown from "./UserDropdown";
import { useState } from "react";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export default function Navbar() {
  const { data: session } = useSession();
  const { items } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  
  const cartCount = session ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.nav}`}>
        <Link href="/" className={styles.logoWrapper}>
          <div className={styles.logoEmblem}>LS</div>
          <span className={styles.logoText}>LuxeShop</span>
        </Link>
        
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input 
            type="text" 
            placeholder="Search for products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
        </form>

        <div className={styles.actions}>
          {session && (
            <Link href="/cart" className={styles.cartBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Cart
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </Link>
          )}
          {session ? (
            <UserDropdown session={session} />
          ) : (
            <Link href="/login" className={styles.btnPrimary}>Sign In</Link>
          )}
        </div>
      </div>
    </header>
  );
}
