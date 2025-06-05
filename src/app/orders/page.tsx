"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./orders.module.css";
import {
  ArrowLeft,
  Calendar,
  Users,
  MapPin,
  Phone,
  Package,
} from "lucide-react";

const OrdersPage = () => {
  const router = useRouter();
  type Order = {
    id: string | number;
    status: string;
    total: number;
    paidAmount: number;
    date: string;
    time: string;
    members: {
      adults: number;
      children: number;
    };
    address: string;
    items: { name: string }[];
    txn_id: string;
    [key: string]: any;
  };

  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return styles.completed;
      case "upcoming":
        return styles.upcoming;
      case "cancelled":
        return styles.cancelled;
      default:
        return "";
    }
  };

  const getOrders = async () => {
    const credentialsString = localStorage.getItem("Credentials");
    const credentials = credentialsString ? JSON.parse(credentialsString) : "";

    try {
      const res = await fetch("/api/getOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderData: credentials }),
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      const orders = Array.isArray(data.orders.data) ? data.orders.data : [];
      console.log(orders)
      setOrdersData(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrdersData([]); 
    }
  };

  const handleOrderClick = (orderId: string | number) => {
    router.push(`/orders/${orderId}`);
  };

  useEffect(() => {
    getOrders();
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
            <p>My Orders</p>
          </header>

          <div className={styles.content}>
            {ordersData.length === 0 ? (
              <div className={styles.emptyState}>
                <Package size={60} />
                <h2>No Orders Yet</h2>
                <p>
                  You haven&apos;t placed any orders yet. Start booking your
                  first chef!
                </p>
                <button
                  className={styles.bookNowButton}
                  onClick={() => router.push('/#services')}>
                  Book Now
                </button>
              </div>
            ) : (
              <div className={styles.ordersList}>
                {ordersData.map((order) => (
                  <div
                    key={order.txn_id}
                    className={styles.orderCard}
                    onClick={() => handleOrderClick(order.id)}>
                    {/* Show txn_id at the top */}
                    <div className={styles.orderNumber}>TXN: {order.txn_id}</div>
                    {/* Order Header */}
                    <div className={styles.orderHeader}>
                      <div className={styles.orderInfo}>
                        <span
                          className={
                            order.status.toLowerCase() === 'pending'
                              ? styles.statusPending
                            : order.status.toLowerCase() === 'failed'
                              ? styles.statusFailed
                              : styles.statusPlaced
                          }
                        >
                          {order.status.toLowerCase() === 'pending'
                            ? 'PENDING'
                            : order.status.toLowerCase() === 'failed'
                            ? 'ORDER FAILED'
                            : 'ORDER PLACED'}
                        </span>
                      </div>
                      <div className={styles.orderAmount}>
                        <span className={styles.totalAmount}>
                          ₹{order.total}
                        </span>
                        <span className={styles.paidAmount} style={{ color: '#333' }}>
                          Paid: ₹{order.paidAmount ?? 199}
                        </span>
                      </div>
                    </div>
                    {/* Order Details */}
                    <div className={styles.orderDetails}>
                      <div className={styles.detailRow}>
                        <Calendar size={16} />
                        <span>
                          {order.date} at {order.time}
                        </span>
                      </div>
                      <div className={styles.detailRow}>
                        <Users size={16} />
                        <span>
                          {order.members.adults} Adults
                          {order.members.children > 0 && `, ${order.members.children} Children`}
                        </span>
                      </div>
                    </div>
                    {/* Items Preview */}
                    {/* <div className={styles.itemsPreview}>
                      <span className={styles.itemsLabel}>Items:</span>
                      <span className={styles.itemsList}>
                        {order.items.slice(0, 3).map((item, index) => (
                          <span key={item.name + index}>
                            {item.name}
                            {index < Math.min(order.items.length, 3) - 1 && ', '}
                          </span>
                        ))}
                        {order.items.length > 3 && ` +${order.items.length - 3} more`}
                      </span>
                    </div> */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
