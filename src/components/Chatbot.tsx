"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Chatbot.module.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'bot' | 'user', text: string}[]>([
    { role: 'bot', text: 'Hi there! 👋 How can I help you today?' }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickReplies = [
    "Where is my order?",
    "Return Policy",
    "Shipping Info"
  ];

  const getBotResponse = (userMsg: string) => {
    const lower = userMsg.toLowerCase();
    if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) {
      return "Hello! How can I help you today?";
    } else if (lower.includes("order") || lower.includes("track")) {
      return "You can easily track your past orders by clicking 'Orders' in your profile dropdown menu!";
    } else if (lower.includes("return") || lower.includes("refund")) {
      return "We offer a 30-day hassle-free return policy. If you're not satisfied, you can return your premium item for a full refund.";
    } else if (lower.includes("shipping") || lower.includes("delivery")) {
      return "Standard shipping takes 3-5 business days. Express 1-2 day delivery is also available at checkout.";
    } else if (lower.includes("discount") || lower.includes("coupon")) {
      return "Check out your 'Coupons' dashboard in the profile menu for exclusive discounts and free shipping codes!";
    }
    return "I'm still learning! Our human support team is currently busy, but please leave your email and we will get back to you shortly.";
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: 'user' as const, text }];
    setMessages(newMessages);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: getBotResponse(text)
      }]);
    }, 600);
  };

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <>
      <button 
        className={`${styles.chatbotToggle} ${isOpen ? styles.hidden : ''}`} 
        onClick={() => setIsOpen(true)}
      >
        💬
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}>Luxe</div>
              <div>
                <h3>LuxeShop Support</h3>
                <p>Typically replies in minutes</p>
              </div>
            </div>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
          </div>
          
          <div className={styles.messagesContainer}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.userWrapper : styles.botWrapper}`}>
                <div className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.botMsg}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className={styles.quickReplies}>
            {quickReplies.map((reply, idx) => (
              <button 
                key={idx} 
                className={styles.quickReplyBtn}
                onClick={() => handleSend(reply)}
              >
                {reply}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmitForm} className={styles.inputArea}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={input}
              onChange={e => setInput(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className={styles.sendBtn}>➔</button>
          </form>
        </div>
      )}
    </>
  );
}
