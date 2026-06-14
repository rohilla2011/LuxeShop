"use client";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import styles from "./cart.module.css";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";

// Add window type for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CartPage() {
  const { items, removeFromCart, total, clearCart, isClient } = useCart();
  const { data: session, status } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"RAZORPAY" | "COD">("RAZORPAY");
  const [orderComplete, setOrderComplete] = useState(false);

  // Address state
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [zip, setZip] = useState("");

  const deliveryFee = 199;
  const finalTotal = total >= 2999 ? total : total + deliveryFee;

  const handleCheckout = async () => {
    if (!session) return;
    
    // Validate Address
    if (!address || !city || !stateName || !zip) {
      alert("Please fill in all shipping address fields before checkout.");
      return;
    }

    const fullAddress = `${address}, ${city}, ${stateName} - ${zip}`;

    setIsProcessing(true);

    try {
      if (paymentMethod === "COD") {
        const res = await fetch("/api/checkout/cod", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items, amount: finalTotal, address: fullAddress }),
        });
        const data = await res.json();
        if (data.success) {
          clearCart();
          setOrderComplete(true);
        } else {
          alert("Failed to place order: " + data.error);
        }
      } else {
        // Razorpay flow
        const res = await fetch("/api/checkout/razorpay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: finalTotal, address: fullAddress }),
        });
        const orderData = await res.json();

        if (orderData.error) {
          alert("Failed to initialize payment: " + orderData.error);
          setIsProcessing(false);
          return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
          amount: orderData.amount,
          currency: orderData.currency,
          name: "LuxeShop",
          description: "Premium E-Commerce Checkout",
          order_id: orderData.id,
          handler: async function (response: any) {
            // Verify signature
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                items,
                amount: finalTotal,
                address: fullAddress,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              clearCart();
              setOrderComplete(true);
            } else {
              alert("Payment verification failed: " + (verifyData.error || "Unknown error"));
            }
          },
          prefill: {
            name: session?.user?.name || "",
            email: session?.user?.email || "",
          },
          theme: {
            color: "#803cf8",
          },
        };

        if (options.key === "rzp_test_placeholder") {
          alert("Demo Mode: Simulating successful payment...");
          options.handler({
             razorpay_order_id: orderData.id,
             razorpay_payment_id: "pay_mock_" + Date.now(),
             razorpay_signature: "mock_sig",
          });
          return;
        }

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response: any) {
          alert("Payment Failed: " + response.error.description);
        });
        rzp.open();
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.successIcon} style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h2>Order Confirmed!</h2>
        <p>Thank you for shopping with LuxeShop. Your order has been placed successfully.</p>
        <Link href="/" className={styles.btnPrimary} style={{ marginTop: '1.5rem', display: 'inline-block' }}>Continue Shopping</Link>
      </div>
    );
  }

  if (!isClient || status === "loading") {
    return (
      <div className={styles.emptyCart}>
        <p>Loading...</p>
      </div>
    );
  }

  // If not logged in, show login prompt
  if (!session) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.lockIcon}>🔒</div>
        <h2>Sign In Required</h2>
        <p>Please sign in to view your cart and start shopping.</p>
        <Link href="/login" className={styles.btnPrimary}>Sign In</Link>
        <p className={styles.signupHint}>
          Don&apos;t have an account? <Link href="/signup">Create one</Link>
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyIcon}>🛒</div>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven&apos;t added anything yet.</p>
        <Link href="/" className={styles.btnPrimary}>Start Shopping</Link>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className={styles.cartContainer}>
        <h1 className={styles.title}>Your Shopping Cart</h1>
        
        <div className={styles.grid}>
          <div className={styles.cartList}>
            {items.map((item, i) => (
              <div key={item.id} className={styles.cartItem} style={{ animationDelay: `${i * 0.05}s` }}>
                <div className={styles.itemImage}>
                  <img src={item.imageUrl} alt={item.name} />
                </div>
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemPrice}>₹{item.price.toLocaleString("en-IN")} × {item.quantity}</p>
                </div>
                <div className={styles.controls}>
                  <div className={styles.quantityCtrl}>
                    <span style={{fontWeight: 900, padding: '0 0.5rem'}}>{item.quantity}</span>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className={styles.addressSection}>
              <h2>Shipping Details</h2>
              <div className={styles.formGrid}>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label>Street Address</label>
                  <input type="text" placeholder="123 Luxury Avenue, Suite 100" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                  <label>City</label>
                  <input type="text" placeholder="Mumbai" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                  <label>State</label>
                  <input type="text" placeholder="Maharashtra" value={stateName} onChange={(e) => setStateName(e.target.value)} />
                </div>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label>PIN Code</label>
                  <input type="text" placeholder="400001" value={zip} onChange={(e) => setZip(e.target.value)} />
                </div>
              </div>
            </div>

          </div>
          
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal ({items.reduce((a, b) => a + b.quantity, 0)} items)</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{total >= 2999 ? 'Free' : `₹${deliveryFee.toLocaleString("en-IN")}`}</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>₹{finalTotal.toLocaleString("en-IN")}</span>
            </div>
            
            <div className={styles.paymentMethodSection} style={{ marginTop: '1.5rem', marginBottom: '1.5rem', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>Select Payment Method</h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="RAZORPAY" 
                  checked={paymentMethod === "RAZORPAY"}
                  onChange={() => setPaymentMethod("RAZORPAY")}
                />
                <span style={{ color: 'var(--text-secondary)' }}>Pay Online (UPI, Cards, NetBanking)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="COD" 
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                <span style={{ color: 'var(--text-secondary)' }}>Cash on Delivery (COD)</span>
              </label>
            </div>

            <button 
              className={styles.checkoutBtn} 
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay ₹${finalTotal.toLocaleString("en-IN")}`}
            </button>
            <p className={styles.secureNote}>🔒 Secure checkout</p>
          </div>
        </div>
      </div>
    </>
  );
}
