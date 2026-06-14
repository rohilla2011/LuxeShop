"use client";
import { useCart } from "@/context/CartContext";
import styles from "./ProductCard.module.css";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
  isTrending?: boolean;
};

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className={styles.card} style={{ animationDelay: `${index * 0.08}s` }}>
      <div className={styles.imageContainer}>
        {product.isTrending && <span className={styles.trendingBadge}>🔥 Trending</span>}
        <img src={product.imageUrl} alt={product.name} className={styles.image} />
      </div>
      <div className={styles.content}>
        {product.category && <span className={styles.categoryLabel}>{product.category}</span>}
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>₹{product.price.toLocaleString("en-IN")}</span>
          <button onClick={handleAdd} className={`${styles.addBtn} ${added ? styles.addBtnSuccess : ''}`}>
            {added ? "✓ Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
