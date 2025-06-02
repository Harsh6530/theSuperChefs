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
  RefreshCw,
} from "lucide-react";
import axios from 'axios';

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
  const [loadingStatus, setLoadingStatus] = useState('Verifying payment status...');
  const [statusChecked, setStatusChecked] = useState(false);

  const createOrder = async (orderData: any) => {
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

    const userString = localStorage.getItem("Credentials");
    const orderDataString = localStorage.getItem("order-data");
    const user = userString ? JSON.parse(userString) : null;
    const order_data = orderDataString ? JSON.parse(orderDataString) : null;

    // Fallback helpers
    function getValidDate() {
      return order_data?.date || order_data?.selectedDate || new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    }
    function getValidTime() {
      return order_data?.time || order_data?.selectedTime || new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
    }

    const orderData = {
      user: user?.name || "",
      mobile: user?.mobile || "",
      date: getValidDate(),
      time: getValidTime(),
      members: {
        adults: order_data?.guestsData?.adults ?? order_data?.guests?.adults ?? 0,
        children: order_data?.guestsData?.children ?? order_data?.guests?.children ?? 0,
      },
      items: (order_data?.items_data || order_data?.selectedItems || []).map((item: any, idx: number) => ({
        id: item.id || idx + 1,
        name: item.name || item.Dish_Name || "",
        price: item.price || 0,
        category: item.category || item.Course_Type || "",
      })),
      city: order_data?.city || "",
      address: order_data?.address || "",
      coupon: order_data?.coupon || "",
      waiterCount: order_data?.waiterCount || 0,
      bartenderCount: order_data?.bartenderCount || 0,
      total: order_data?.totalAmount || order_data?.amount || 0,
      txn_id: txnId,
      ref_id: providerId || "N/A",
    };

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

    if (txnId !== "TXN123456789" && !statusChecked) {
      const checkPaymentStatus = async () => {
        try {
          const response = await axios.get(`/api/check-payment-status?transactionId=${txnId}`);
          const { status, details } = response.data;

          if (status === 'COMPLETED') {
            setLoadingStatus('Payment verified successfully!');
            setTransactionDetails(prevDetails => ({
              ...prevDetails,
              status: 'Successful',
              referenceId: details.providerReferenceId || prevDetails.referenceId,
              amount: details.amount ? (details.amount / 100).toString() : prevDetails.amount,
              date: details.timestamp ? new Date(details.timestamp).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : prevDetails.date,
              time: details.timestamp ? new Date(details.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }) : prevDetails.time,
            }));
            setStatusChecked(true);
            if (order_data) createOrder(orderData);
          } else if (status === 'FAILED') {
            setLoadingStatus('Payment verification failed.');
            setTransactionDetails(prevDetails => ({
              ...prevDetails,
              status: 'Failed',
              referenceId: details.providerReferenceId || prevDetails.referenceId,
              amount: details.amount ? (details.amount / 100).toString() : prevDetails.amount,
              date: details.timestamp ? new Date(details.timestamp).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : prevDetails.date,
              time: details.timestamp ? new Date(details.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }) : prevDetails.time,
            }));
            setStatusChecked(true);
            router.replace(`/payment/failure?transactionId=${txnId}&error=${encodeURIComponent(details.message || 'Payment failed during verification')}`);
          } else {
            setLoadingStatus(`Payment status: ${status}. Waiting for confirmation...`);
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
          setLoadingStatus('Failed to verify payment status.');
          setStatusChecked(true);
          router.replace(`/payment/failure?transactionId=${txnId}&error=${encodeURIComponent('Automated status check failed')}`);
        }
      };

      checkPaymentStatus();
    } else if (txnId === "TXN123456789") {
      setLoadingStatus('Transaction ID not found in URL. Displaying default success.');
      if (order_data && !statusChecked) createOrder(orderData);
      setStatusChecked(true);
    } else if (order_data && !statusChecked) {
      createOrder(orderData);
      setStatusChecked(true);
    }
  }, [searchParams, router, statusChecked]);

  const handleDownloadReceipt = async () => {
    // Gather transaction and order data
    const userString = localStorage.getItem("Credentials");
    const orderDataString = localStorage.getItem("order-data");
    const user = userString ? JSON.parse(userString) : null;
    const order_data = orderDataString ? JSON.parse(orderDataString) : null;

    if (!transactionDetails || !order_data) {
      alert("Receipt data is not fully loaded. Please try again.");
      return;
    }

    try {
      console.log("Calling backend to generate PDF...");
      // Call the new backend endpoint to generate PDF
      const response = await axios.post(
        '/api/generate-receipt-pdf', // Your new backend endpoint URL
        { // Send data needed for the receipt
          transactionDetails: transactionDetails,
          orderData: { // Send a clean version of order_data if needed, or the whole object
            user: user,
            order_data: order_data
          }
        },
        {
          responseType: 'blob' // Expect a binary response (the PDF file)
        }
      );

      // Check if the response is successful and is a PDF
      if (response.status === 200 && response.data.type === 'application/pdf') {
        console.log("PDF received, triggering download.");
        // Create a blob from the response data
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        // Create a link element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = `receipt_${transactionDetails.txnId || 'payment'}.pdf`; // Filename
        document.body.appendChild(a); // Append to body to make it clickable
        a.click(); // Trigger the download

        // Clean up by removing the link and revoking the object URL
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert("Receipt downloaded successfully!");

      } else {
        // Handle cases where backend returns an error or non-PDF response
        const errorText = await response.data.text(); // Try to read error message
        console.error("Error response from PDF generation backend:", response.status, errorText);
        alert(`Failed to generate PDF. Error: ${errorText || 'Unknown error'}`);
      }

    } catch (error: any) {
      console.error("Error calling PDF generation endpoint:", error);
      alert(`Failed to generate PDF. Please try again. ${(error.response?.data?.message || error.message)}`);
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  if (!statusChecked && searchParams.get("transactionId") !== "TXN123456789") {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.white_bg}>
            <div className={styles.content}>
              <div className={styles.successIcon}>
                <RefreshCw size={80} className={styles.loadingSpinner} />
              </div>
              <div className={styles.successMessage}>
                <h1>{loadingStatus}</h1>
                <p>Please wait while we verify your payment status.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
