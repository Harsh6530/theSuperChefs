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
  const { guestsData, totalData, itemsData, dateTime } = useContext(dataContext);
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
    items_data: itemsData,
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
    try {
      setIsProcessing(true);
      localStorage.setItem("order-data", JSON.stringify(bookingDetails));
      
      const response = await axios.post("/api/payrequest", {
        merchantTransactionId: `MT${Date.now()}`, // Generate unique transaction ID
        amount: 100, // Convert to paise
      });

      if (response.data.data.redirectUrl) {
        // Redirect to PhonePe checkout page
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

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "payment" && event.newValue !== null) {
        router.push('/');
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
          <div className={styles.content}>
            <div className={styles.header}>
              <button onClick={() => router.back()} className={styles.backButton}>
                <ArrowLeft size={20} />
                Back
              </button>
              <h1>Payment</h1>
            </div>

            <div className={styles.paymentSection}>
              <div className={styles.bookingSummary}>
                <h2>Booking Summary</h2>
                <div className={styles.summaryDetails}>
                  <p>Date: {bookingDetails.date}</p>
                  <p>Time: {bookingDetails.time}</p>
                  <p>Guests: {bookingDetails.guests}</p>
                  <p>Items: {bookingDetails.items}</p>
                  <p className={styles.total}>Total Amount: ₹{bookingDetails.bookingFee}</p>
                </div>
              </div>

              <div className={styles.paymentMethods}>
                <h2>Choose Payment Method</h2>

                <div className={styles.methodsContainer}>
                  <div
                    className={`${styles.paymentMethod} ${
                      selectedMethod === "gateway" ? styles.selected : ""
                    }`}
                    onClick={() => handlePaymentMethodSelect("gateway")}>
                    <div className={styles.methodIcon}>
                      <CreditCard size={24} />
                    </div>
                    <div className={styles.methodInfo}>
                      <h3>Pay via PhonePe</h3>
                      <p>Pay using PhonePe or any UPI app</p>
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
                </div>

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
      </div>
    </div>
  );
};

export default PaymentPage;
