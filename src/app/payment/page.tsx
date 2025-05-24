"use client";

import { useState, useContext, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";
import { dataContext } from "@/app/context/dataContext";
import styles from "./payment.module.css";
import {
  ArrowLeft,
  CreditCard,
  QrCode,
  Smartphone,
  Shield,
  Clock,
} from "lucide-react";
import axios from "axios";

const PaymentPage = () => {
  const { guestsData, totalData, itemsData, dateTime } =
    useContext(dataContext);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [qrData, setQrData] = useState(null);
  const size = 200;

  const router = useRouter();

  const bookingDetails = {
    amount: totalData,
    bookingFee: 199,
    date: `${dateTime.date.dateNum} ${dateTime.date.month} ${dateTime.date.day}`,
    time: dateTime.time,
    guests: `${guestsData.adults} Adults, ${guestsData.children} Children`,
    guestsData,
    items: itemsData.length,
    items_data:itemsData,
  };

  const handleClick = async () => {
    try {
      const response = await axios.post("/api/payqrrequest", {
        merchantTransactionId: "MT7850590068188104",
        merchantUserId: "MUID123",
        mobileNumber: "9999999999",
        amount: 100,
      });

      setQrData(response.data.data.instrumentResponse.intentUrl);
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedMethod(method);

    if (selectedMethod === "qr") {
      setShowQR(false);
      setSelectedMethod("");
      return;
    }
    if (method === "qr") {
      handleClick();
      setShowQR(true);
    } else {
      setShowQR(false);
    }

    if (method === "gateway") {
      handleGateWayClick();
    }
  };

  const handleGateWayClick = async () => {
    localStorage.setItem("order-data",JSON.stringify(bookingDetails))
    try {
      const response = await axios.post("/api/payrequest", {
        merchantTransactionId: "MT7850590068188104",
        merchantUserId: "MUID123",
        mobileNumber: "9999999999",
        amount: 100,
      });

      window.open(
        response.data.data.instrumentResponse.redirectInfo.url,
        "_blank"
      );
    } catch (error) {
      console.error("Error making API request:", error);
    }
  };

  useEffect(() => {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === "payment" && event.newValue !== null) {
      router.push('/')
    }
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.white_bg}>
          <header className={styles.header}>
            <button
              className={styles.backButton}
              onClick={() => router.back()}>
              <ArrowLeft size={20} />
            </button>
            <p>Payment</p>
          </header>

          <div className={styles.content}>
            {/* Booking Summary */}
            <div className={styles.bookingSummary}>
              <h2>Booking Summary</h2>
              <div className={styles.summaryDetails}>
                <div className={styles.summaryRow}>
                  <span>Date & Time</span>
                  <span>
                    {bookingDetails.date} at {bookingDetails.time}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Guests</span>
                  <span>{bookingDetails.guests}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Items Selected</span>
                  <span>{bookingDetails.items} items</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Total Amount</span>
                  <span>₹{bookingDetails.amount}</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.payableRow}`}>
                  <span>Booking Fee (Payable Now)</span>
                  <span>₹{bookingDetails.bookingFee}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className={styles.paymentMethods}>
              <h2>Choose Payment Method</h2>

              <div className={styles.methodsContainer}>
                <div
                  className={`${styles.paymentMethod} ${
                    selectedMethod === "qr" ? styles.selected : ""
                  }`}
                  onClick={() => handlePaymentMethodSelect("qr")}>
                  <div className={styles.methodIcon}>
                    <QrCode size={24} />
                  </div>
                  <div className={styles.methodInfo}>
                    <h3>Pay via QR Code</h3>
                    <p>Scan QR code with any UPI app</p>
                    <div className={styles.methodFeatures}>
                      <span>
                        <Smartphone size={14} />
                        UPI Apps
                      </span>
                      <span>
                        <Shield size={14} />
                        Secure
                      </span>
                      <span>
                        <Clock size={14} />
                        Instant
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.paymentMethod} ${
                    selectedMethod === "gateway" ? styles.selected : ""
                  }`}
                  onClick={() => handlePaymentMethodSelect("gateway")}>
                  <div className={styles.methodIcon}>
                    <CreditCard size={24} />
                  </div>
                  <div className={styles.methodInfo}>
                    <h3>Payment Gateway</h3>
                    <p>Credit/Debit Card, Net Banking, Wallets</p>
                    <div className={styles.methodFeatures}>
                      <span>
                        <CreditCard size={14} />
                        Cards
                      </span>
                      <span>
                        <Shield size={14} />
                        Secure
                      </span>
                      <span>
                        <Clock size={14} />
                        Quick
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            {showQR && (
              <div className={styles.qrSection}>
                <h3>Scan QR Code to Pay</h3>
                <div className={styles.qrContainer}>
                  <div className={styles.qrCode}>
                    {qrData && (
                      <QRCodeSVG
                        value={qrData}
                        size={size}
                      />
                    )}
                  </div>
                  <div className={styles.qrInfo}>
                    <p>Amount: ₹{bookingDetails.bookingFee}</p>
                    <p>Scan with any UPI app to pay</p>
                  </div>
                </div>
                <button
                  className={`${styles.payButton} ${
                    isProcessing ? styles.processing : ""
                  }`}
                  disabled={isProcessing}>
                  {isProcessing ? "Processing Payment..." : "I have paid ₹199"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
