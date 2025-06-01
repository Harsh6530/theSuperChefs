"use client";
import React, { useState } from "react";
import styles from "../../book/styles/popup.module.css";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface DetailsPopupProps {
  setPopup: (value: string) => void;
  numWaiters: number;
  numBartenders: number;
  couponApplied: boolean;
  selectedDate: string;
  selectedTime: string;
  city: string;
  address: string;
  remarks: string;
  totalAmount: number;
}

const DetailsPopup: React.FC<DetailsPopupProps> = ({ setPopup, numWaiters, numBartenders, couponApplied, selectedDate, selectedTime, city, address, remarks, totalAmount }) => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const WAITER_PRICE = 1500;
  const BARTENDER_PRICE = 2500;
  const BOOKING_FEE = 199;
  const BASE_PRICE = 999;
  let total = BASE_PRICE + numWaiters * WAITER_PRICE + numBartenders * BARTENDER_PRICE;
  let discount = couponApplied ? Math.round(total * 0.15) : 0;
  const finalTotal = total - discount;

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      // Save booking data to localStorage for payment success page
      const userString = localStorage.getItem("Credentials");
      const user = userString ? JSON.parse(userString) : null;
      const orderData = {
        user: user?.name || "",
        mobile: user?.mobile || "",
        date: selectedDate,
        time: selectedTime,
        numWaiters,
        numBartenders,
        couponApplied,
        city,
        address,
        remarks,
        totalAmount: finalTotal,
        bookingFee: BOOKING_FEE,
        paymentStatus: "pending",
      };
      localStorage.setItem("waiter-bartender-order-data", JSON.stringify(orderData));
      // Initiate payment (redirect to gateway)
      const response = await axios.post("/api/payrequest", {
        merchantTransactionId: `MT${Date.now()}`,
        amount: BOOKING_FEE * 100, // in paise
      });
      if (response.data.data.redirectUrl) {
        window.location.href = response.data.data.redirectUrl;
      } else {
        throw new Error("No redirect URL received");
      }
    } catch (error: any) {
      console.error("Error initiating payment:", error);
      alert(error.response?.data?.error || "Failed to initiate payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

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
          <h3 className={styles.detailsSectionTitle} style={{color: '#ff8c1a', fontWeight: 700, fontSize: 20, marginBottom: 10, letterSpacing: 1}}>Event Details</h3>
          <div className={styles.detailsRow}><span style={{fontWeight: 500}}>City</span><span>{city}</span></div>
          <div className={styles.detailsRow}><span style={{fontWeight: 500}}>Address</span><span style={{maxWidth: 220, display: 'inline-block', overflowWrap: 'break-word'}}>{address}</span></div>
          {remarks && <div className={styles.detailsRow}><span style={{fontWeight: 500}}>Remarks</span><span style={{maxWidth: 220, display: 'inline-block', overflowWrap: 'break-word'}}>{remarks}</span></div>}
        </div>
        <div className={styles.detailsSection}>
          <h3 className={styles.detailsSectionTitle} style={{color: '#ff8c1a', fontWeight: 700, fontSize: 20, marginBottom: 10, letterSpacing: 1}}>Date & Time</h3>
          <div className={styles.detailsRow}><span>Date</span><span>{selectedDate}</span></div>
          <div className={styles.detailsRow}><span>Time</span><span>{selectedTime}</span></div>
        </div>
        <div className={styles.detailsSection}>
          <h3 className={styles.detailsSectionTitle} style={{color: '#ff8c1a', fontWeight: 700, fontSize: 20, marginBottom: 10, letterSpacing: 1}}>Staff</h3>
          <div className={styles.detailsRow}><span>Waiters</span><span>{numWaiters} × ₹{WAITER_PRICE} = ₹{numWaiters * WAITER_PRICE}</span></div>
          <div className={styles.detailsRow}><span>Bartenders</span><span>{numBartenders} × ₹{BARTENDER_PRICE} = ₹{numBartenders * BARTENDER_PRICE}</span></div>
          <div className={styles.detailsRow} style={{ fontWeight: 700, color: '#ff4d4f', fontSize: 18, marginTop: 4 }}>
            <span>Total Staff Price</span>
            <span>₹{numWaiters * WAITER_PRICE + numBartenders * BARTENDER_PRICE}</span>
          </div>
        </div>
        <div className={styles.totalSection} style={{marginTop: 32}}>
          <div className={styles.totalRow}>
            <span style={{fontWeight: 700, fontSize: 22, color: '#111'}}>Total Amount</span>
            {couponApplied ? (
              <span>
                <span style={{ textDecoration: "line-through", color: "#888", fontWeight: 400, fontSize: "1.1rem", marginRight: 8 }}>
                  ₹{total}
                </span>
                <span style={{ color: "#ff4d4f", fontWeight: 700, fontSize: 22 }}>₹{finalTotal}</span>
              </span>
            ) : (
              <span style={{fontWeight: 700, fontSize: 22, color: '#111'}}>₹{total}</span>
            )}
          </div>
          {couponApplied && (
            <div className={styles.totalRow} style={{ color: '#ff9800', fontWeight: 700, fontSize: 15, marginTop: 4, marginBottom: 30, textAlign: 'right'}}>
              You save ₹{discount} with coupon!
            </div>
          )}
          <div style={{ 
            color: '#219653',
            fontSize: '14px',
            marginTop: '8px',
            textAlign: 'center',
            padding: '8px',
            backgroundColor: '#eafaf1',
            borderRadius: '4px',
            border: '1px solid #b7eacb'
          }}>
            The booking fee of ₹{BOOKING_FEE} will be deducted from your final bill
          </div>
          <div style={{
            color: '#219653',
            fontSize: '14px',
            marginTop: '12px',
            textAlign: 'center',
            fontWeight: 600,
            backgroundColor: '#eafaf1',
            borderRadius: '4px',
            border: '1px solid #b7eacb',
            padding: '8px'
          }}>
            After paying the booking amount, you will receive a call within 60 minutes for confirmation and to convey the ingredients.
          </div>
        </div>
      </div>
      <div className={styles.popupFooter}>
        <button className={styles.payButton} onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? "Processing..." : `Pay ₹${BOOKING_FEE} for Booking`}
        </button>
      </div>
    </div>
  );
};
export default DetailsPopup; 