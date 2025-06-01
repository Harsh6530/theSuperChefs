"use client";
import React from "react";
import styles from "../../book/book.module.css";

interface SummaryFooterProps {
  numWaiters: number;
  numBartenders: number;
  couponApplied: boolean;
  onBook: () => void;
}

const SummaryFooter: React.FC<SummaryFooterProps> = ({ numWaiters, numBartenders, couponApplied, onBook }) => {
  const WAITER_PRICE = 1500;
  const BARTENDER_PRICE = 2500;
  let total = numWaiters * WAITER_PRICE + numBartenders * BARTENDER_PRICE;
  if (couponApplied) total = Math.round(total * 0.85);

  return (
    <footer className={styles.footer}>
      <div className={styles.info}>
        <p className={styles.amount}>₹ {total}</p>
        <p className={styles.payableText}>Payable Amount </p>
      </div>
      <button className={styles.continueButton} onClick={onBook}>
        Book
      </button>
    </footer>
  );
};

export default SummaryFooter; 