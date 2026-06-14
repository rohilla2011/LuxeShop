"use client";

import styles from "./coupons.module.css";
import { useState } from "react";

const mockCoupons = [
  { id: "1", code: "WELCOME10", discount: "10% OFF", description: "Get 10% off your very first order.", expiry: "Valid for 30 days" },
  { id: "2", code: "FREESHIP", discount: "FREE SHIPPING", description: "Free express shipping on all orders over ₹2,999.", expiry: "Ongoing" },
  { id: "3", code: "LUXE20", discount: "20% OFF", description: "Special luxury discount on Beauty & Fashion items.", expiry: "Ends this Sunday" },
];

export default function CouponsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Coupons</h1>
        <p className={styles.subtitle}>Unlock premium savings with your exclusive promo codes.</p>
      </div>

      <div className={styles.couponGrid}>
        {mockCoupons.map((coupon) => (
          <div key={coupon.id} className={styles.couponCard}>
            <div className={styles.couponMain}>
              <span className={styles.discountBadge}>{coupon.discount}</span>
              <h3 className={styles.description}>{coupon.description}</h3>
              <span className={styles.expiry}>{coupon.expiry}</span>
            </div>
            <div className={styles.couponAction}>
              <div className={styles.codeDisplay}>{coupon.code}</div>
              <button 
                onClick={() => handleCopy(coupon.code)}
                className={`${styles.copyBtn} ${copiedCode === coupon.code ? styles.copied : ""}`}
              >
                {copiedCode === coupon.code ? "Copied!" : "Copy Code"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
