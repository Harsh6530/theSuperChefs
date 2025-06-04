"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./failure.module.css";
import {
  XCircle,
  Calendar,
  Clock,
  CreditCard,
  RefreshCw,
  Home,
  HelpCircle,
} from "lucide-react";

const FailurePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [transactionDetails, setTransactionDetails] = useState({
    txnId: "",
    amount: "",
    date: "",
    time: "",
    status: "Failed",
    errorMessage: ""
  });

  useEffect(() => {
    // Get transaction details from URL params
    const txnId = searchParams.get("transactionId") || "TXN123456789";
    const amount = searchParams.get("amount") || "199";
    const error = searchParams.get("error") || "Payment failed";
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
      status: "Failed",
      errorMessage: error
    });
  }, [searchParams]);

  const handleRetryPayment = () => {
    router.push("/payment");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleContactSupport = () => {
    // In a real app, this would open a support chat or redirect to support page
    alert("Contact support functionality would be implemented here");
  };

  const handleTryDifferentMethod = () => {
    router.push("/payment");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.white_bg}>
          <div className={styles.content}>
            {/* Failure Icon */}
            <div className={styles.failureIcon}>
              <XCircle size={80} />
            </div>

            {/* Failure Message */}
            <div className={styles.failureMessage}>
              <h1>Payment Failed</h1>
              <p>
                We couldn&apos;t process your payment. Don&apos;t worry, no amount has
                been deducted from your account.
              </p>
            </div>

            {/* Error Information */}
            <div className={styles.errorInfo}>
              <h3>Error Details</h3>
              <p>{transactionDetails.errorMessage}</p>
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
                    <XCircle size={20} />
                  </div>
                  <div className={styles.detailInfo}>
                    <span className={styles.detailLabel}>Status</span>
                    <span
                      className={`${styles.detailValue} ${styles.failureStatus}`}>
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
                    <span className={styles.detailLabel}>Attempted Amount</span>
                    <span
                      className={`${styles.detailValue} ${styles.amountValue}`}>
                      ₹{transactionDetails.amount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Troubleshooting Tips */}
            <div className={styles.troubleshooting}>
              <h3>Common Solutions</h3>
              <ul>
                <li>Check your internet connection and try again</li>
                <li>Ensure sufficient balance in your account</li>
                <li>Try using a different payment method</li>
                <li>Clear your browser cache and cookies</li>
                <li>Contact your bank if the issue persists</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button
                className={styles.retryButton}
                onClick={handleRetryPayment}>
                <RefreshCw size={20} />
                Retry Payment
              </button>

              <button
                className={styles.differentMethodButton}
                onClick={handleTryDifferentMethod}>
                Try Different Method
              </button>

              <button
                className={styles.supportButton}
                onClick={handleContactSupport}>
                <HelpCircle size={20} />
                Contact Support
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

export default FailurePage;
