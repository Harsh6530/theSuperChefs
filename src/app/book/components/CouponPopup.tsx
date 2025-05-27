"use client";

import type React from "react";
import styles from "../styles/popup.module.css";
import { X } from "lucide-react";

interface CouponPopupProps {
  setPopup: (value: string) => void;
  coupon: string;
  setCoupon: (coupon: string) => void;
}

const CouponPopup: React.FC<CouponPopupProps> = ({ setPopup, coupon, setCoupon }) => {
  const handleApply = () => {
    setCoupon("WELCOME15");
    setPopup("");
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupHeader}>
        <h2>Apply Coupon</h2>
        <button className={styles.closeButton} onClick={() => setPopup("")}>
          <X size={20} />
        </button>
      </div>
      <div className={styles.popupContent}>
        <div style={{
          background: "linear-gradient(90deg, #ff9800 0%, #ff4d4f 100%)",
          color: "#fff",
          borderRadius: "12px",
          padding: "24px 20px",
          margin: "24px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 4px 16px rgba(255,152,0,0.15)",
          fontWeight: 700,
          fontSize: "1.3rem",
          letterSpacing: 2,
        }}>
          <span style={{ fontSize: "2rem", letterSpacing: 4 }}>WELCOME15</span>
          <span style={{ fontSize: "1rem", fontWeight: 400, marginTop: 8 }}>Get 15% off on your first booking!</span>
        </div>
        <button
          className={styles.doneButton}
          style={{ background: "#ff4d4f", color: "#fff", fontWeight: 700, fontSize: "1.1rem", borderRadius: 8, margin: "0 auto", display: "block", width: "100%" }}
          onClick={handleApply}
        >
          Apply Coupon
        </button>
      </div>
    </div>
  );
};

export default CouponPopup; 