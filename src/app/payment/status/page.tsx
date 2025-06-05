"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentStatusPage() {
  const params = useSearchParams();
  const router = useRouter();
  const transactionId = params.get("transactionId");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!transactionId) {
      setError("No transaction ID found in URL.");
      setLoading(false);
      return;
    }

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/order-status?transactionId=${transactionId}`);
        const data = await response.json();

        if (data.status === "Payment Successful") {
          router.replace(`/payment/success?transactionId=${transactionId}`);
        } else if (data.status === "Payment Failed") {
          router.replace(`/payment/failure?transactionId=${transactionId}`);
        } else if (data.status === "Payment Pending") {
          // If payment is still pending, check again after 5 seconds
          setTimeout(checkStatus, 5000);
        }
      } catch (err) {
        console.error("Error checking payment status:", err);
        setError("Failed to check payment status. Please try again.");
        setLoading(false);
      }
    };

    checkStatus();
  }, [transactionId, router]);

  if (error) {
    return (
      <div style={{ padding: 32, textAlign: "center" }}>
        <h1>Payment Status</h1>
        <p style={{color: 'red'}}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 32, textAlign: "center" }}>
      <h1>Payment Status</h1>
      <p>Transaction ID: {transactionId}</p>
      <h2>{loading ? "Checking payment status..." : "Redirecting..."}</h2>
    </div>
  );
} 