import Link from "next/link";
import styles from "./wishlist.module.css";

export default function WishlistPage() {
  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.emptyState}>
        <div className={styles.heartIcon}>💖</div>
        <h1 className={styles.title}>Your Wishlist is Empty</h1>
        <p className={styles.subtitle}>
          It looks like you haven't saved any premium products yet. 
          Discover our latest collections and find something you love.
        </p>
        <Link href="/#products" className={styles.exploreBtn}>
          Explore Collection
        </Link>
      </div>
    </div>
  );
}
