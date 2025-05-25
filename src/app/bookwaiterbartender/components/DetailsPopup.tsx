"use client";
import React from "react";
import styles from "../../book/styles/popup.module.css";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface DetailsPopupProps {
  setPopup: (value: string) => void;
  numWaiters: number;
  numBartenders: number;
  couponApplied: boolean;
  selectedDate: number;
  selectedTime: string;
}

const DetailsPopup: React.FC<DetailsPopupProps> = ({ setPopup, numWaiters, numBartenders, couponApplied, selectedDate, selectedTime }) => {
  const router = useRouter();
  const WAITER_PRICE = 1500;
  const BARTENDER_PRICE = 2500;
  const BOOKING_FEE = 199;
  let total = numWaiters * WAITER_PRICE + numBartenders * BARTENDER_PRICE;
  let discount = 0;
  if (couponApplied) discount = Math.round(total * 0.15);
  const finalTotal = total - discount;

  return (
    <div className={`${styles.popup} ${styles.detailsPopup}`}> 
      <div className={styles.popupHeader}>
        <h2>Booking Details</h2>
        <button className={styles.closeButton} onClick={() => setPopup("")}>
          <X size={20} />
        </button>
      </div>
      <div className={`${styles.popupContent} ${styles.scrollableContent}`}>
        <div className={styles.detailsSection}>
          <h3 className={styles.detailsSectionTitle}>Staff</h3>
          <div className={styles.detailsRow}>
            <span>Waiters</span>
            <span>{numWaiters}</span>
          </div>
          <div className={styles.detailsRow}>
            <span>Bartenders</span>
            <span>{numBartenders}</span>
          </div>
        </div>
        <div className={styles.detailsSection}>
          <h3 className={styles.detailsSectionTitle}>Date & Time</h3>
          <div className={styles.detailsRow}>
            <span>Date</span>
            <span>{selectedDate !== undefined ? `Day ${selectedDate + 1}` : "-"}</span>
          </div>
          <div className={styles.detailsRow}>
            <span>Time</span>
            <span>{selectedTime || "-"}</span>
          </div>
        </div>
        <div className={styles.detailsSection}>
          <h3 className={styles.detailsSectionTitle}>Base Price</h3>
          <div className={styles.detailsRow}>
            <span>Booking Fee</span>
            <span>₹{BOOKING_FEE}</span>
          </div>
        </div>
        <div className={styles.detailsSection}>
          <h3 className={styles.detailsSectionTitle}>Summary</h3>
          <div className={styles.detailsRow}>
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          {couponApplied && (
            <div className={styles.detailsRow}>
              <span>Welcome 15 (15% off)</span>
              <span>-₹{discount}</span>
            </div>
          )}
          <div className={styles.totalRow}>
            <span>Total Amount</span>
            <span>₹{finalTotal}</span>
          </div>
        </div>
      </div>
      <div className={styles.popupFooter}>
        <button className={styles.payButton} onClick={() => router.push("/payment")}>Pay ₹199 for Booking</button>
      </div>
    </div>
  );
};

export default DetailsPopup; 