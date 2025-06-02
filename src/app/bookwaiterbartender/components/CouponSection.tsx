"use client";
import React from "react";
import styles from "../styles/bookwaiterandbartender.module.css";

interface CouponSectionProps {
  couponApplied: boolean;
  setCouponApplied: (applied: boolean) => void;
  setInput: (input: string) => void;
}

const CouponSection: React.FC<CouponSectionProps> = ({
  couponApplied,
  setCouponApplied,
  setInput,
}) => {
  return (
    <div className={styles.selection}>
      <label>Coupon</label>
      <div className={styles.couponCard}>
        <span className={styles.couponCode}>Welcome 15</span>
        <button
          type="button"
          className={styles.couponBtn}
          onClick={() => {
            setCouponApplied(!couponApplied);
            setInput("WELCOME15");
          }}>
          {couponApplied ? "Remove" : "Apply"}
        </button>
      </div>
      {couponApplied && (
        <span
          style={{
            color: "#43a047",
            fontWeight: 600,
            fontSize: 13,
            marginTop: 4,
            display: "block",
          }}>
          15% discount applied!
        </span>
      )}
    </div>
  );
};

export default CouponSection;
