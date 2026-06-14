"use client";

import styles from "./help.module.css";

const faqs = [
  { question: "How long does shipping take?", answer: "Standard shipping takes 3-5 business days. Express shipping is available at checkout for 1-2 day delivery." },
  { question: "What is your return policy?", answer: "We offer a 30-day hassle-free return policy. If you're not fully satisfied with your premium product, return it within 30 days for a full refund." },
  { question: "Do you ship internationally?", answer: "Currently, we offer shipping exclusively within India. We plan to expand internationally in the near future." },
  { question: "How can I track my order?", answer: "Once your order ships, you will receive an email with a tracking link. You can also view the status from your Orders dashboard." },
  { question: "Are my payment details secure?", answer: "Absolutely. We use Razorpay to process all transactions, ensuring 100% secure, bank-level encryption." }
];

export default function HelpCenterPage() {
  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.header}>
        <div className={styles.icon}>👋</div>
        <h1 className={styles.title}>How can we help?</h1>
        <p className={styles.subtitle}>Find answers to our most frequently asked questions or get in touch with our team.</p>
        
        <div className={styles.searchBar}>
          <input type="text" placeholder="Search for answers..." />
          <button>Search</button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.faqSection}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqCard}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.contactSection}>
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>💬</div>
            <h3>Live Chat</h3>
            <p>Chat directly with our support team. Available 24/7.</p>
            <button onClick={() => window.dispatchEvent(new Event('open-chat'))} className={styles.contactBtn}>Start Chat</button>
          </div>
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>✉️</div>
            <h3>Email Support</h3>
            <p>Send us an email and we'll respond within 2 hours.</p>
            <a href="mailto:support@luxeshop.com" className={`${styles.contactBtn} ${styles.secondaryBtn}`} style={{ display: 'inline-block', textDecoration: 'none' }}>Email Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
