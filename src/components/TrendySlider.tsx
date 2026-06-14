"use client";
import styles from "./TrendySlider.module.css";
import { Product } from "@/data/products";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function TrendySlider({ trendingProducts }: { trendingProducts: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth, behavior: "smooth" });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!trendingProducts || trendingProducts.length === 0) return null;

  return (
    <div className={styles.sliderContainer}>
      <h2 className={styles.title}>🔥 Top Trending This Week</h2>
      <div className={styles.slider} ref={scrollRef}>
        {trendingProducts.map((product) => (
          <div key={product.id} className={styles.slide}>
            <div className={styles.imageWrapper}>
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className={styles.content}>
              <span className={styles.category}>{product.category}</span>
              <h3>{product.name}</h3>
              <p className={styles.price}>₹{product.price.toLocaleString("en-IN")}</p>
              <Link href="#products" className={styles.shopBtn}>Shop Now</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
