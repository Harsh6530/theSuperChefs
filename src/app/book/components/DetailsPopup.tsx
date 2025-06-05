"use client"

import type React from "react"
import styles from "../styles/popup.module.css"
import { X } from "lucide-react"
import { useRouter } from 'next/navigation';

interface MenuItem {
  _id: string;
  Course_Type: string;
  Classification: string;
  Cuisine: string;
  Dish_Name: string;
  Remarks?: string;
}

interface DetailsPopupProps {
  setPopup: (value: string) => void
  guests: { adults: number; children: number }
  selectedItems: MenuItem[]
  totalAmount: number
  courseCounts: Record<string, number>
  guestsTotal: number
  itemsTotal: number
  BASE_PRICE: number
  city: string
  waiterCount: number
  bartenderCount: number
  waiterTotal: number
  bartenderTotal: number
  coupon: string
  address: string
  remarks: string
  date: string
  time: string
}

const COURSE_PRICES: Record<string, number> = {
  Soups: 149,
  Starters: 299,
  "Main Course": 299,
  Sides: 149,
  Desserts: 299,
  Beverages: 149,
}

const COURSE_LABELS: Record<string, string> = {
  Soups: "Soups",
  Starter: "Starters",
  Starters: "Starters",
  Mains: "Main Course",
  "Main Course": "Main Course",
  Sides: "Sides",
  Desserts: "Desserts",
  Dessert: "Desserts",
  Beverages: "Beverages",
}

const BOOKING_FEE = 199;

const DetailsPopup: React.FC<DetailsPopupProps> = ({ setPopup, guests, selectedItems, totalAmount, courseCounts, guestsTotal, itemsTotal, BASE_PRICE, city, waiterCount, bartenderCount, waiterTotal, bartenderTotal, coupon, address, remarks, date, time }) => {
  const router = useRouter()

  // Calculate staff total and final total (mirroring page.tsx logic)
  const staffTotal = waiterTotal + bartenderTotal;
  const subtotal = BASE_PRICE + guestsTotal + itemsTotal + staffTotal;
  const COUPON_CODE = "WELCOME15";
  const COUPON_DISCOUNT = 0.15;
  const isCouponApplied = coupon === COUPON_CODE;
  const discountAmount = isCouponApplied ? Math.round(subtotal * COUPON_DISCOUNT) : 0;
  const discountedTotal = isCouponApplied ? subtotal - discountAmount : subtotal;

  const handlePayment = async () => {
    try {
      const credentialsString = localStorage.getItem("Credentials");
      const credentials = credentialsString ? JSON.parse(credentialsString) : {};
      const merchantTransactionId = `MT${Date.now()}`;
      const orderData = {
        user: credentials.name || "",
        mobile: credentials.mobile || "",
        date,
        time,
        status: "pending",
        members: guests,
        total: isCouponApplied ? discountedTotal : totalAmount,
        items: selectedItems.map((item, idx) => ({
          id: idx + 1,
          name: item.Dish_Name,
          price: COURSE_PRICES[COURSE_LABELS[item.Course_Type] || item.Course_Type] || 0,
          category: COURSE_LABELS[item.Course_Type] || item.Course_Type,
        })),
        txn_id: merchantTransactionId,
        city,
        waiterCount,
        bartenderCount,
        coupon,
        createdAt: new Date().toISOString(),
        address,
        remarks,
      };

      // 1. Save order as pending
      const orderRes = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (!orderRes.ok) {
        throw new Error('Failed to save order');
      }

      // 2. Initiate payment
      const response = await fetch('/api/payrequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: BOOKING_FEE * 100, // in paise
          merchantTransactionId,
          orderData, // send the rest of your order data for your own records
        }),
      });

      if (!response.ok) {
        throw new Error('Payment request failed');
      }

      const data = await response.json();
      router.push(data.data.redirectUrl);
    } catch (error) {
      console.error('Payment error:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className={`${styles.popup} ${styles.detailsPopup}`}>
      <div className={styles.popupHeader}>
        <h2>Booking Details</h2>
        <button className={styles.closeButton} onClick={() => setPopup("")}>
          <X size={20} />
        </button>
      </div>

      <div className={`${styles.popupContent} ${styles.scrollableContent}`}>
        <div className={styles.detailsSection} style={{marginBottom: 24, paddingBottom: 10}}>
          <h3 className={styles.detailsSectionTitle} style={{color: '#ff8c1a', fontWeight: 700, fontSize: 20, marginBottom: 10, letterSpacing: 1}}>Event Details</h3>
          <div className={styles.detailsRow}><span style={{fontWeight: 500}}>City</span><span>{city}</span></div>
          <div className={styles.detailsRow}><span style={{fontWeight: 500}}>Address</span><span style={{maxWidth: 220, display: 'inline-block', overflowWrap: 'break-word'}}>{address}</span></div>
          {coupon && <div className={styles.detailsRow}><span style={{fontWeight: 500}}>Coupon</span><span>{coupon}</span></div>}
          {remarks && <div className={styles.detailsRow}><span style={{fontWeight: 500}}>Remarks</span><span style={{maxWidth: 220, display: 'inline-block', overflowWrap: 'break-word'}}>{remarks}</span></div>}
        </div>

        <div className={styles.detailsSection} style={{marginBottom: 18}}>
          <h3 className={styles.detailsSectionTitle} style={{color: '#ff8c1a', fontWeight: 700, fontSize: 20, marginBottom: 10, letterSpacing: 1}}>Guests</h3>
          <div className={styles.detailsRow}><span>Adults</span><span>{guests.adults} × ₹100 = ₹{guests.adults * 100}</span></div>
          <div className={styles.detailsRow}><span>Children</span><span>{guests.children} × ₹75 = ₹{guests.children * 75}</span></div>
          <div className={styles.detailsRow} style={{ fontWeight: 700, color: '#ff4d4f', fontSize: 18, marginTop: 4 }}>
            <span>Guests Total</span>
            <span>₹{guestsTotal}</span>
          </div>
        </div>

        <div className={styles.detailsSection} style={{marginBottom: 18}}>
          <h3 className={styles.detailsSectionTitle} style={{color: '#ff8c1a', fontWeight: 700, fontSize: 20, marginBottom: 10, letterSpacing: 1}}>Base Price</h3>
          <div className={styles.detailsRow}><span>Base Price</span><span>₹{BASE_PRICE}</span></div>
        </div>

        <div className={styles.detailsSection} style={{marginBottom: 18}}>
          <h3 className={styles.detailsSectionTitle} style={{color: '#ff8c1a', fontWeight: 700, fontSize: 20, marginBottom: 10, letterSpacing: 1}}>Selected Items</h3>
          {Object.keys(COURSE_PRICES).map(course => (
            <div className={styles.detailsRow} key={course}>
              <span>{course}</span>
              <span>{courseCounts[course] || 0} × ₹{COURSE_PRICES[course]} = ₹{(courseCounts[course] || 0) * COURSE_PRICES[course]}</span>
            </div>
          ))}
          <div className={styles.detailsRow} style={{ fontWeight: 700, color: '#ff4d4f', fontSize: 18, marginTop: 4 }}>
            <span>Items Total</span>
            <span>₹{itemsTotal}</span>
          </div>
        </div>

        <div className={styles.detailsSection} style={{marginBottom: 18}}>
          <h3 className={styles.detailsSectionTitle} style={{color: '#ff8c1a', fontWeight: 700, fontSize: 20, marginBottom: 10, letterSpacing: 1}}>Staff</h3>
          <div className={styles.detailsRow}><span>Waiters</span><span>{waiterCount} × ₹1500 = ₹{waiterCount * 1500}</span></div>
          <div className={styles.detailsRow}><span>Bartenders</span><span>{bartenderCount} × ₹2000 = ₹{bartenderCount * 2000}</span></div>
          <div className={styles.detailsRow} style={{ fontWeight: 700, color: '#ff4d4f', fontSize: 18, marginTop: 4 }}>
            <span>Total Staff Price</span>
            <span>₹{waiterCount * 1500 + bartenderCount * 2000}</span>
          </div>
        </div>

        <div className={styles.totalSection} style={{marginTop: 70}}>
          <div className={styles.totalRow}>
            <span style={{fontWeight: 700, fontSize: 22, color: '#111'}}>Total Amount</span>
            {isCouponApplied ? (
              <span>
                <span style={{ textDecoration: "line-through", color: "#888", fontWeight: 400, fontSize: "1.1rem", marginRight: 8 }}>
                  ₹{subtotal}
                </span>
                <span style={{ color: "#ff4d4f", fontWeight: 700, fontSize: 22 }}>₹{discountedTotal}</span>
              </span>
            ) : (
              <span style={{fontWeight: 700, fontSize: 22, color: '#111'}}>₹{subtotal}</span>
            )}
          </div>
          {isCouponApplied && (
            <div className={styles.totalRow} style={{ color: '#ff9800', fontWeight: 700, fontSize: 15, marginTop: 4, marginBottom: 30, textAlign: 'right'}}>
              You save ₹{discountAmount} with coupon!
            </div>
          )}
          <div style={{ 
            color: '#219653',
            fontSize: '14px',
            marginTop: '8px',
            textAlign: 'center',
            padding: '8px',
            backgroundColor: '#eafaf1',
            borderRadius: '4px',
            border: '1px solid #b7eacb'
          }}>
            The booking fee of ₹{BOOKING_FEE} will be deducted from your final bill
          </div>
          {/* <div style={{
            color: '#219653',
            fontSize: '14px',
            marginTop: '12px',
            textAlign: 'center',
            backgroundColor: '#eafaf1',
            borderRadius: '4px',
            border: '1px solid #b7eacb',
            padding: '8px'
          }}>
            After paying the booking amount, you will receive a call within 60 minutes for confirmation and to convey the ingredients.
          </div> */}
        </div>
      </div>

      <div className={styles.popupFooter}>
        <button className={styles.payButton} onClick={handlePayment}>Pay ₹{BOOKING_FEE} for Booking</button>
      </div>
    </div>
  )
}

export default DetailsPopup
