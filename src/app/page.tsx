import ProductCard from "@/components/ProductCard";
import styles from "./page.module.css";
import Link from "next/link";

const products = [
  { id: "1", name: "Premium Wireless Headphones", description: "High-fidelity audio with active noise cancellation and 30-hour battery life.", price: 299.99, imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60" },
  { id: "2", name: "Minimalist Smartwatch", description: "Track fitness and notifications with a sleek AMOLED display and 7-day battery.", price: 199.50, imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60" },
  { id: "3", name: "Ergonomic Mechanical Keyboard", description: "Satisfying tactile feedback with RGB lighting and hot-swappable switches.", price: 149.00, imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=60" },
  { id: "4", name: "Leather Workspace Mat", description: "Premium vegan leather desk mat. Water-resistant and ultra-durable.", price: 45.00, imageUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=60" },
  { id: "5", name: "Portable Bluetooth Speaker", description: "360° surround sound, IPX7 waterproof, and 20-hour battery life.", price: 89.99, imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=60" },
  { id: "6", name: "Ultra-Slim Laptop Stand", description: "Lightweight aluminum stand with perfect airflow for any laptop.", price: 59.99, imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=60" },
  { id: "7", name: "Noise-Cancelling Earbuds", description: "True wireless earbuds with ANC, transparency mode, and premium sound.", price: 179.99, imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=800&auto=format&fit=crop&q=60" },
  { id: "8", name: "Wireless Charging Pad", description: "Fast 15W Qi wireless charger with sleek minimalist design.", price: 39.99, imageUrl: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=800&auto=format&fit=crop&q=60" },
  { id: "9", name: "Premium Canvas Backpack", description: "Water-resistant canvas with leather accents. Fits 15\" laptops.", price: 129.00, imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60" },
  { id: "10", name: "Smart LED Desk Lamp", description: "Touch-controlled brightness, 5 color temperatures, USB charging port.", price: 69.99, imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=800&auto=format&fit=crop&q=60" },
  { id: "11", name: "Titanium Water Bottle", description: "Double-wall vacuum insulated. Cold 24hrs, hot 12hrs. BPA-free.", price: 34.99, imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=60" },
  { id: "12", name: "Minimalist Wallet", description: "Slim RFID-blocking genuine leather wallet. Holds 8 cards.", price: 49.99, imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=60" },
];

export default function Home() {
  return (
    <div className={styles.home}>
      {/* VIDEO HERO */}
      <section className={styles.videoHero}>
        <video className={styles.bgVideo} autoPlay muted loop playsInline>
          <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>✨ Premium Collection 2026</div>
          <h1 className={styles.heroTitle}>Elevate Your<br/>Everyday</h1>
          <p className={styles.heroSubtitle}>
            Discover a curated selection of premium products that blend 
            cutting-edge technology with timeless design.
          </p>
          <div className={styles.heroCta}>
            <a href="#products" className={styles.heroBtn}>Shop Now</a>
            <Link href="/signup" className={styles.heroBtnGlass}>Join Free →</Link>
          </div>
        </div>
        <div className={styles.scrollIndicator}>
          <span>Scroll to explore</span>
          <div className={styles.scrollLine}></div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className={styles.statsBar}>
        <div className={styles.stat}><span className={styles.statNum}>500+</span><span className={styles.statLbl}>Happy Customers</span></div>
        <div className={styles.stat}><span className={styles.statNum}>12</span><span className={styles.statLbl}>Premium Products</span></div>
        <div className={styles.stat}><span className={styles.statNum}>4.9★</span><span className={styles.statLbl}>Average Rating</span></div>
        <div className={styles.stat}><span className={styles.statNum}>24/7</span><span className={styles.statLbl}>Customer Support</span></div>
      </section>

      {/* FEATURES */}
      <section className={styles.features}>
        <div className={styles.feature}><span className={styles.fIcon}>🚀</span><div><strong>Free Shipping</strong><p>On orders above $99</p></div></div>
        <div className={styles.feature}><span className={styles.fIcon}>🔒</span><div><strong>Secure Checkout</strong><p>100% protected</p></div></div>
        <div className={styles.feature}><span className={styles.fIcon}>↩️</span><div><strong>Easy Returns</strong><p>30-day policy</p></div></div>
        <div className={styles.feature}><span className={styles.fIcon}>💬</span><div><strong>24/7 Support</strong><p>Always here to help</p></div></div>
      </section>

      {/* PRODUCTS */}
      <section id="products">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
          <p className={styles.sectionSub}>Handpicked items just for you</p>
        </div>
        <div className={styles.productGrid}>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
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
