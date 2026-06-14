"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import TrendySlider from "@/components/TrendySlider";
import styles from "./page.module.css";
import Link from "next/link";
import { products } from "@/data/products";

const CATEGORIES = ["All", "Electronics", "Fashion", "Beauty", "Accessories"];

export default function Home() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products based on search query and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery) || 
                            product.description.toLowerCase().includes(searchQuery);
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const trendingProducts = products.filter(p => p.isTrending);

  return (
    <div className={styles.home}>
      {/* POSTER HERO */}
      {!searchQuery && selectedCategory === "All" && (
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>PREMIUM CURATION</div>
            <h1 className={styles.heroTitle}>Elegance<br/>Meets<br/>Everyday</h1>
            <p className={styles.heroSubtitle}>
              DISCOVER EXCLUSIVE LIFESTYLE PRODUCTS FOR THE MODERN INDIVIDUAL
            </p>
            <div className={styles.heroCta}>
              <a href="#products" className={styles.ctaBtn}>Shop Collection</a>
            </div>
          </div>
          <div className={styles.heroImage}>
             {/* Abstract modern shapes instead of emojis */}
             <div className={styles.heroShape1}></div>
             <div className={styles.heroShape2}></div>
          </div>
        </section>
      )}

      {/* TRENDING SLIDER */}
      {!searchQuery && selectedCategory === "All" && (
        <TrendySlider trendingProducts={trendingProducts} />
      )}

      {/* STATS BAR */}
      <section className={styles.statsBar}>
        <div className={styles.stat}><span className={styles.statNum}>500+</span><span className={styles.statLbl}>Happy Customers</span></div>
        <div className={styles.stat}><span className={styles.statNum}>30+</span><span className={styles.statLbl}>Premium Products</span></div>
        <div className={styles.stat}><span className={styles.statNum}>4.9★</span><span className={styles.statLbl}>Average Rating</span></div>
        <div className={styles.stat}><span className={styles.statNum}>24/7</span><span className={styles.statLbl}>Customer Support</span></div>
      </section>

      {/* PRODUCTS SECTION */}
      <section id="products" className={styles.productsSection}>
        <div className={styles.sectionHeader}>
          {searchQuery ? (
            <h2 className={styles.sectionTitle}>Search Results for &quot;{searchQuery}&quot;</h2>
          ) : (
            <h2 className={styles.sectionTitle}>Featured Products</h2>
          )}
          <p className={styles.sectionSub}>Handpicked items just for you</p>
        </div>

        {/* CATEGORY FILTER */}
        <div className={styles.categoryFilters}>
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              className={`${styles.catBtn} ${selectedCategory === cat ? styles.catBtnActive : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <div className={styles.productGrid}>
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <h3>No products found!</h3>
            <p>Try adjusting your search or category filter.</p>
            <button className={styles.clearBtn} onClick={() => { setSelectedCategory("All"); window.location.href="/"; }}>
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <h2>Stay in the Loop</h2>
        <p>Be the first to know about new products and exclusive deals.</p>
        <div className={styles.ctaForm}>
          <input type="email" placeholder="Enter your email" className={styles.ctaInput} />
          <button className={styles.ctaBtn}>Subscribe</button>
        </div>
      </section>
    </div>
  );
}
