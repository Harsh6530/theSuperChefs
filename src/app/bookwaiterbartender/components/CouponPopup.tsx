"use client";
import React, { useState } from "react";
import styles from "../../book/styles/popup.module.css";
import { X } from "lucide-react";

interface CouponPopupProps {
  setPopup: (value: string) => void;
  coupon: string;
  setCoupon: (coupon: string) => void;
  couponApplied: boolean;
  setCouponApplied: (applied: boolean) => void;
}

const VALID_COUPON = "WELCOME15";

const CouponPopup: React.FC<CouponPopupProps> = ({ setPopup, coupon, setCoupon, couponApplied, setCouponApplied }) => {
  const [input, setInput] = useState(coupon || "");
  const [error, setError] = useState("");

  const handleApply = () => {
    if (input.trim().toUpperCase() === VALID_COUPON) {
      setCoupon(input.trim().toUpperCase());
      setCouponApplied(true);
      setError("");
    } else {
      setError("Invalid coupon code");
    }
  };
  const handleRemove = () => {
    setCoupon("");
    setCouponApplied(false);
    setInput("");
    setError("");
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
        <input
          className={styles.selector}
          style={{ width: "100%", fontSize: 16, marginBottom: 12 }}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter coupon code"
        />
        {error && <div style={{ color: '#ff4d4f', marginBottom: 8 }}>{error}</div>}
        <div style={{ display: 'flex', gap: 10 }}>
          <button className={styles.doneButton} onClick={handleApply} style={{ flex: 1 }}>Apply</button>
          {couponApplied && <button className={styles.doneButton} style={{ background: '#fff', color: '#ff4d4f', border: '1px solid #ff4d4f', flex: 1 }} onClick={handleRemove}>Remove</button>}
        </div>
      </div>
    </div>
  );
};
export default CouponPopup; 