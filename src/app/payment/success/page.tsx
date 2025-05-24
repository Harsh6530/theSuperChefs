"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./success.module.css";
import {
  CheckCircle,
  Calendar,
  Clock,
  Users,
  CreditCard,
  Download,
  Home,
} from "lucide-react";

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [transactionDetails, setTransactionDetails] = useState({
    txnId: "",
    amount: "",
    date: "",
    time: "",
    status: "Success",
    referenceId: "",
  });

  const createOrder = async (orderData) => {
    console.log(orderData);

    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderData }),
    });

    const data = await response.json();

    if (!data?.order?.success) {
      console.error("Failed to create order");
      return;
    }

    alert("Order Succesfully Created");
    localStorage.removeItem("order-data");
    localStorage.setItem("payment", "Successful");
  };

  useEffect(() => {
    const txnId = searchParams.get("transactionId") || "TXN123456789";
    const amount = searchParams.get("amount") || "199";
    const providerId = searchParams.get("providerReferenceId") || "";
    const currentDate = new Date();

    setTransactionDetails({
      txnId,
      amount,
      date: currentDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      time: currentDate.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      referenceId: providerId,
      status: "Success",
    });

    const userString = localStorage.getItem("Credentials");
    const orderDataString = localStorage.getItem("order-data");
    const user = userString ? JSON.parse(userString) : null;
    const order_data = orderDataString ? JSON.parse(orderDataString) : null;

    const orderData = {
      user: user.name,
      date: order_data.date,
      time: order_data.time,
      members: {
        adults: order_data.guestsData.adults,
        children: order_data.guestsData.children,
      },
      items: order_data.items_data,
      mobile: user.mobile,
      total: order_data.amount,
      txn_id: txnId,
      ref_id: providerId,
    };

    createOrder(orderData);
  }, [searchParams]);

  const handleDownloadReceipt = () => {
    alert("Receipt download functionality would be implemented here");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.white_bg}>
          <div className={styles.content}>
            {/* Success Icon */}
            <div className={styles.successIcon}>
              <CheckCircle size={80} />
            </div>

            {/* Success Message */}
            <div className={styles.successMessage}>
              <h1>Payment Successful!</h1>
              <p>
                Your booking has been confirmed. You will receive a confirmation
                email shortly.
              </p>
            </div>

            {/* Transaction Details */}
            <div className={styles.transactionDetails}>
              <h2>Transaction Details</h2>

              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>
                    <CreditCard size={20} />
                  </div>
                  <div className={styles.detailInfo}>
                    <span className={styles.detailLabel}>Transaction ID</span>
                    <span className={styles.detailValue}>
                      {transactionDetails.txnId}
                    </span>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>
                    <CheckCircle size={20} />
                  </div>
                  <div className={styles.detailInfo}>
                    <span className={styles.detailLabel}>Status</span>
                    <span
                      className={`${styles.detailValue} ${styles.successStatus}`}>
                      {transactionDetails.status}
                    </span>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>
                    <Calendar size={20} />
                  </div>
                  <div className={styles.detailInfo}>
                    <span className={styles.detailLabel}>Date</span>
                    <span className={styles.detailValue}>
                      {transactionDetails.date}
                    </span>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>
                    <Clock size={20} />
                  </div>
                  <div className={styles.detailInfo}>
                    <span className={styles.detailLabel}>Time</span>
                    <span className={styles.detailValue}>
                      {transactionDetails.time}
                    </span>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>
                    <CreditCard size={20} />
                  </div>
                  <div className={styles.detailInfo}>
                    <span className={styles.detailLabel}>Reference ID</span>
                    <span className={styles.detailValue}>
                      {transactionDetails.referenceId}
                    </span>
                  </div>
                </div>

                <div className={styles.detailItem}>
                  <div className={styles.detailIcon}>
                    <CreditCard size={20} />
                  </div>
                  <div className={styles.detailInfo}>
                    <span className={styles.detailLabel}>Amount Paid</span>
                    <span
                      className={`${styles.detailValue} ${styles.amountValue}`}>
                      ₹{transactionDetails.amount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Information */}
            <div className={styles.bookingInfo}>
              <h3>What&apos;s Next?</h3>
              <ul>
                <li>Our chef will contact you 24 hours before the event</li>
                <li>Remaining amount will be collected after the service</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button
                className={styles.downloadButton}
                onClick={handleDownloadReceipt}>
                <Download size={20} />
                Download Receipt
              </button>

              <button
                className={styles.homeButton}
                onClick={handleGoHome}>
                <Home size={20} />
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
