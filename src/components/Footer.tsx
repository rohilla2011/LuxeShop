import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>LuxeShop</span>
          <p className={styles.tagline}>Curated excellence for the modern lifestyle.</p>
        </div>
        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h4>Shop</h4>
            <a href="/">All Products</a>
            <a href="/cart">Your Cart</a>
          </div>
          <div className={styles.linkGroup}>
            <h4>Account</h4>
            <a href="/login">Sign In</a>
            <a href="/signup">Create Account</a>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} LuxeShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
