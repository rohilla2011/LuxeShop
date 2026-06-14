"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import styles from "./UserDropdown.module.css";

export default function UserDropdown({ session }: { session: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatarUrl = session?.user?.image || "/default-avatar.png";

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        <img src={avatarUrl} alt="Profile" className={styles.avatar} />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{session?.user?.name || "Premium Member"}</span>
            <span className={styles.userEmail}>{session?.user?.email}</span>
          </div>
          
          <div className={styles.divider} />
          
          <div className={styles.menuItems}>
            <Link href="/orders" className={styles.menuItem} onClick={() => setIsOpen(false)}>
              <span className={styles.icon}>📦</span> Orders
            </Link>
            <Link href="/coupons" className={styles.menuItem} onClick={() => setIsOpen(false)}>
              <span className={styles.icon}>🎟️</span> Coupons
            </Link>
            <Link href="/wishlist" className={styles.menuItem} onClick={() => setIsOpen(false)}>
              <span className={styles.icon}>💖</span> Wishlist
            </Link>
            
            <div className={styles.divider} />
            
            <Link href="/account" className={styles.menuItem} onClick={() => setIsOpen(false)}>
              <span className={styles.icon}>⚙️</span> Account Settings
            </Link>
            <Link href="/account" className={styles.menuItem} onClick={() => setIsOpen(false)}>
              <span className={styles.icon}>✏️</span> Edit Profile
            </Link>
            <Link href="/account" className={styles.menuItem} onClick={() => setIsOpen(false)}>
              <span className={styles.icon}>🔔</span> Notification Settings
            </Link>
            <Link href="/account" className={styles.menuItem} onClick={() => setIsOpen(false)} title="English, Español, Français, Deutsch, हिन्दी, 中文, 日本語, العربية, Русский, Português">
              <span className={styles.icon}>🌐</span> Select Language
            </Link>
            
            <div className={styles.divider} />
            
            <Link href="/help" className={styles.menuItem} onClick={() => setIsOpen(false)}>
              <span className={styles.icon}>❓</span> Help Center
            </Link>
            <button onClick={() => signOut()} className={`${styles.menuItem} ${styles.signOutBtn}`}>
              <span className={styles.icon}>🚪</span> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
