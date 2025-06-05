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
    status: "Success"
  });

  useEffect(() => {
    const txnId = searchParams.get("transactionId") || "TXN123456789";
    const amount = searchParams.get("amount") || "199";
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
      status: "Success"
    });
  }, [searchParams]);

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className={styles.container} style={{
      backgroundImage: "url('https://www.transparenttextures.com/patterns/food.png'), linear-gradient(135deg, #fff7ed 0%, #fffbe6 100%)",
      backgroundRepeat: 'repeat',
      backgroundSize: '300px 300px, cover',
    }}>
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
                <li>Our team will contact you within 60 minutes, for menu confirmation and chef allocation</li>
                {/* <li>Remaining amount will be collected after the service</li> */}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
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
