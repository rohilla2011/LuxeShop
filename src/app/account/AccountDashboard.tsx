"use client";

import { useState } from "react";
import styles from "./account.module.css";

type Tab = "account" | "profile" | "notifications" | "security" | "language";

export default function AccountDashboard({ user, avatarUrl }: { user: any, avatarUrl: string }) {
  const [activeTab, setActiveTab] = useState<Tab>("account");

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <>
            <h2 className={styles.sectionTitle}>Security Settings</h2>
            <p className={styles.subtitle}>Manage your profile details and preferences.</p>

            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Profile Information</h2>
              <form className={styles.form}>
                <div className={styles.inputGroup}>
                  <label>Full Name</label>
                  <input type="text" defaultValue={user.name || ""} placeholder="John Doe" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Email Address</label>
                  <input type="email" defaultValue={user.email || ""} disabled />
                  <span className={styles.helperText}>Your email address is managed by your sign-in provider.</span>
                </div>
                <div className={styles.inputGroup}>
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210" />
                </div>
                <button type="button" className={styles.saveBtn}>Save Changes</button>
              </form>
            </div>
          </>
        );
      case "profile":
        return (
          <>
            <h1 className={styles.title}>Edit Profile</h1>
            <p className={styles.subtitle}>Customize how others see you on the platform.</p>

            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Public Profile</h2>
              <form className={styles.form}>
                <div className={styles.profileSummary} style={{ textAlign: "left", display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <img src={avatarUrl} alt="Avatar" className={styles.avatar} style={{ margin: 0, width: "72px", height: "72px" }} />
                  <div>
                    <button type="button" className={styles.secondaryBtn}>Change Avatar</button>
                    <p className={styles.helperText} style={{ marginTop: "0.5rem" }}>JPG, GIF or PNG. Max size of 2MB.</p>
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Username</label>
                  <input type="text" defaultValue={user.name?.split(' ')[0] || "user"} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Bio</label>
                  <textarea rows={4} placeholder="Tell us a little about yourself..." className={styles.textarea}></textarea>
                </div>
                <button type="button" className={styles.saveBtn}>Update Profile</button>
              </form>
            </div>
          </>
        );
      case "notifications":
        return (
          <>
            <h1 className={styles.title}>Notification Settings</h1>
            <p className={styles.subtitle}>Choose how you want to be notified.</p>

            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Notification Preferences</h2>
              <div className={styles.preferenceRow}>
                <div>
                  <h4>Email Notifications</h4>
                  <p>Receive order updates and promotions via email.</p>
                </div>
                <label className={styles.toggle}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.preferenceRow}>
                <div>
                  <h4>SMS Alerts</h4>
                  <p>Receive delivery tracking via SMS.</p>
                </div>
                <label className={styles.toggle}>
                  <input type="checkbox" />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.preferenceRow}>
                <div>
                  <h4>Push Notifications</h4>
                  <p>Get instant updates on your devices.</p>
                </div>
                <label className={styles.toggle}>
                  <input type="checkbox" defaultChecked />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </>
        );
      case "security":
        return (
          <>
            <h1 className={styles.title}>Security</h1>
            <p className={styles.subtitle}>Keep your account safe and secure.</p>

            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Language & Region</h2>
              <form className={styles.form}>
                <div className={styles.inputGroup}>
                  <label>Current Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <div className={styles.inputGroup}>
                  <label>New Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="••••••••" />
                </div>
                <button type="button" className={styles.saveBtn}>Update Password</button>
              </form>
            </div>
          </>
        );
      case "language":
        const languages = [
          { code: "en", name: "English (US)", native: "English" },
          { code: "es", name: "Spanish", native: "Español" },
          { code: "fr", name: "French", native: "Français" },
          { code: "de", name: "German", native: "Deutsch" },
          { code: "hi", name: "Hindi", native: "हिन्दी" },
          { code: "zh", name: "Chinese", native: "中文" },
          { code: "ja", name: "Japanese", native: "日本語" },
          { code: "ar", name: "Arabic", native: "العربية" },
          { code: "ru", name: "Russian", native: "Русский" },
          { code: "pt", name: "Portuguese", native: "Português" },
          { code: "it", name: "Italian", native: "Italiano" },
          { code: "ko", name: "Korean", native: "한국어" },
        ];
        return (
          <>
            <h1 className={styles.title}>Language Preferences</h1>
            <p className={styles.subtitle}>Select your preferred language for the platform.</p>

            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Available Languages</h2>
              <div className={styles.languageGrid}>
                {languages.map((lang) => (
                  <div key={lang.code} className={`${styles.languageCard} ${lang.code === "en" ? styles.languageActive : ""}`}>
                    <div className={styles.langName}>{lang.native}</div>
                    <div className={styles.langSub}>{lang.name}</div>
                    {lang.code === "en" && <div className={styles.checkIcon}>✓</div>}
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.sidebar}>
        <div className={styles.profileSummary}>
          <img src={avatarUrl} alt="Profile" className={styles.avatar} />
          <h3 className={styles.name}>{user.name || "Premium Member"}</h3>
          <p className={styles.email}>{user.email}</p>
        </div>
        <nav className={styles.nav}>
          <button 
            onClick={() => setActiveTab("account")} 
            className={`${styles.navItem} ${activeTab === "account" ? styles.active : ""}`}>
            ⚙️ Account Settings
          </button>
          <button 
            onClick={() => setActiveTab("profile")} 
            className={`${styles.navItem} ${activeTab === "profile" ? styles.active : ""}`}>
            ✏️ Edit Profile
          </button>
          <button 
            onClick={() => setActiveTab("notifications")} 
            className={`${styles.navLink} ${activeTab === "notifications" ? styles.active : ""}`}>
            🔔 Notifications
          </button>
          <button 
            onClick={() => setActiveTab("security")} 
            className={`${styles.navLink} ${activeTab === "security" ? styles.active : ""}`}>
            🔒 Security
          </button>
          <button 
            onClick={() => setActiveTab("language")} 
            className={`${styles.navLink} ${activeTab === "language" ? styles.active : ""}`}>
            🌐 Language
          </button>
        </nav>
      </div>

      <div className={styles.mainContent}>
        {renderContent()}
      </div>
    </div>
  );
}
