"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./orders.module.css"
import { ArrowLeft, Calendar, Users, MapPin, Phone, Star, Package } from "lucide-react"

const OrdersPage = () => {
  const router = useRouter()
  const [orders] = useState([
    {
      id: "ORD001",
      date: "Dec 25, 2024",
      time: "7:00 PM",
      status: "Completed",
      amount: 1669,
      paidAmount: 199,
      guests: { adults: 2, children: 1 },
      items: [
        { name: "Paneer Tikka", category: "Starters" },
        { name: "Butter Chicken", category: "Main Course" },
        { name: "Garlic Naan", category: "Breads" },
        { name: "Gulab Jamun", category: "Desserts" },
      ],
      chef: {
        name: "Chef Priya",
        phone: "+91 98765 43210",
        rating: 4.8,
      },
      address: "123 Main Street, Sector 15, Gurgaon",
      referenceId: "REF123456789",
      txnId: "TXN987654321",
    },
    {
      id: "ORD002",
      date: "Dec 20, 2024",
      time: "6:30 PM",
      status: "Upcoming",
      amount: 2150,
      paidAmount: 199,
      guests: { adults: 4, children: 0 },
      items: [
        { name: "Veg Spring Rolls", category: "Starters" },
        { name: "Dal Makhani", category: "Main Course" },
        { name: "Veg Biryani", category: "Main Course" },
        { name: "Butter Naan", category: "Breads" },
        { name: "Ice Cream", category: "Desserts" },
      ],
      chef: {
        name: "Chef Rajesh",
        phone: "+91 87654 32109",
        rating: 4.6,
      },
      address: "456 Park Avenue, Sector 22, Gurgaon",
      referenceId: "REF987654321",
      txnId: "TXN123456789",
    },
    {
      id: "ORD003",
      date: "Dec 15, 2024",
      time: "8:00 PM",
      status: "Cancelled",
      amount: 1450,
      paidAmount: 199,
      guests: { adults: 3, children: 1 },
      items: [
        { name: "Chicken Wings", category: "Starters" },
        { name: "Chicken Biryani", category: "Main Course" },
        { name: "Laccha Paratha", category: "Breads" },
      ],
      chef: {
        name: "Chef Amit",
        phone: "+91 76543 21098",
        rating: 4.5,
      },
      address: "789 Green Valley, Sector 18, Gurgaon",
      referenceId: "REF456789123",
      txnId: "TXN654321987",
    },
  ])

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return styles.completed
      case "upcoming":
        return styles.upcoming
      case "cancelled":
        return styles.cancelled
      default:
        return ""
    }
  }

  const handleOrderClick = (orderId) => {
    // Navigate to order details page
    router.push(`/orders/${orderId}`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.white_bg}>
          <header className={styles.header}>
            <button className={styles.backButton} onClick={() => router.back()}>
              <ArrowLeft size={20} />
            </button>
            <p>My Orders</p>
          </header>

          <div className={styles.content}>
            {orders.length === 0 ? (
              <div className={styles.emptyState}>
                <Package size={60} />
                <h2>No Orders Yet</h2>
                <p>You haven't placed any orders yet. Start booking your first chef!</p>
                <button className={styles.bookNowButton} onClick={() => router.push("/book")}>
                  Book Now
                </button>
              </div>
            ) : (
              <div className={styles.ordersList}>
                {orders.map((order) => (
                  <div key={order.id} className={styles.orderCard} onClick={() => handleOrderClick(order.id)}>
                    {/* Order Header */}
                    <div className={styles.orderHeader}>
                      <div className={styles.orderInfo}>
                        <h3>Order #{order.id}</h3>
                        <span className={`${styles.status} ${getStatusColor(order.status)}`}>{order.status}</span>
                      </div>
                      <div className={styles.orderAmount}>
                        <span className={styles.totalAmount}>₹{order.amount}</span>
                        <span className={styles.paidAmount}>Paid: ₹{order.paidAmount}</span>
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
                          {order.guests.adults} Adults
                          {order.guests.children > 0 && `, ${order.guests.children} Children`}
                        </span>
                      </div>

                      <div className={styles.detailRow}>
                        <MapPin size={16} />
                        <span>{order.address}</span>
                      </div>
                    </div>

                    {/* Items Preview */}
                    <div className={styles.itemsPreview}>
                      <span className={styles.itemsLabel}>Items:</span>
                      <span className={styles.itemsList}>
                        {order.items.slice(0, 3).map((item, index) => (
                          <span key={index}>
                            {item.name}
                            {index < Math.min(order.items.length, 3) - 1 && ", "}
                          </span>
                        ))}
                        {order.items.length > 3 && ` +${order.items.length - 3} more`}
                      </span>
                    </div>

                    {/* Transaction Info */}
                    <div className={styles.transactionInfo}>
                      <span>Ref: {order.referenceId}</span>
                      <span>TXN: {order.txnId}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersPage
