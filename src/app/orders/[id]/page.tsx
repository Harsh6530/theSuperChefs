"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "../orders.module.css";
import { ArrowLeft, Calendar, Users, MapPin } from "lucide-react";

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) return;
    setLoading(true);
    fetch("/api/getOrderByTxnId", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ txn_id: orderId }),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch order");
        return res.json();
      })
      .then(data => {
        setOrder(data.order);
        setLoading(false);
      })
      .catch(err => {
        setError("Could not load order details.");
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <div className={styles.detailsContainer}>Loading...</div>;
  if (error || !order) return <div className={styles.detailsContainer}>{error || "Order not found."}</div>;

  return (
    <div className={styles.detailsContainer} style={{
      backgroundImage: "url('https://www.transparenttextures.com/patterns/food.png'), linear-gradient(135deg, #fff7ed 0%, #fffbe6 100%)",
      backgroundRepeat: 'repeat',
      backgroundSize: '300px 300px, cover',
    }}>
      <div className={styles.detailsHeader}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <ArrowLeft size={22} />
        </button>
        <span className={styles.detailsTitle}>Order Details</span>
        <span className={
          order.status?.toLowerCase() === 'pending' ? styles.statusPending :
          order.status?.toLowerCase() === 'failed' ? styles.statusFailed :
          styles.statusPlaced
        }>
          {order.status?.toLowerCase() === 'pending' ? 'PENDING' : order.status?.toLowerCase() === 'failed' ? 'ORDER FAILED' : 'ORDER PLACED'}
        </span>
      </div>
      <div className={styles.detailsSection}>
        <div className={styles.detailsRow}>
          <span className={styles.detailsLabel}>Transaction ID</span>
          <span className={styles.detailsValue}>{order.txn_id}</span>
        </div>
        <div className={styles.detailsRow}>
          <span className={styles.detailsLabel}>Date</span>
          <span className={styles.detailsValue}>{order.date} at {order.time}</span>
        </div>
        <div className={styles.detailsRow}>
          <span className={styles.detailsLabel}>Members</span>
          <span className={styles.detailsValue}>{order.members?.adults} Adults{order.members?.children > 0 ? `, ${order.members.children} Children` : ''}</span>
        </div>
        <div className={styles.detailsRow}>
          <span className={styles.detailsLabel}>Address</span>
          <span className={styles.detailsValue}>{order.address}</span>
        </div>
      </div>
      <div className={styles.detailsSection}>
        <div className={styles.detailsLabel} style={{ marginBottom: 8 }}>Items</div>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {order.items?.map((item: any, idx: number) => (
            <li key={item.name + idx} style={{ marginBottom: 4, color: '#333', fontSize: 15 }}>
              {item.name || item.Dish_Name}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.detailsSection}>
        <div className={styles.detailsRow}>
          <span className={styles.detailsLabel}>Total Amount</span>
          <span className={styles.detailsValue}>₹{order.total}</span>
        </div>
        <div className={styles.detailsRow}>
          <span className={styles.detailsLabel}>Paid</span>
          <span className={styles.detailsValue}>₹{order.paidAmount ?? 199}</span>
        </div>
        <div className={styles.detailsRow}>
          <span className={styles.detailsLabel}>Status</span>
          <span className={styles.detailsValue}>{order.status}</span>
        </div>
      </div>
    </div>
  );
} 