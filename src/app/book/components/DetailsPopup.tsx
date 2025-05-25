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
}

const COURSE_PRICES: Record<string, number> = {
  Soups: 149,
  Starters: 299,
  "Main Course": 299,
  Sides: 149,
  Desserts: 299,
  Beverages: 149,
}

const BOOKING_FEE = 199;

const DetailsPopup: React.FC<DetailsPopupProps> = ({ setPopup, guests, selectedItems, totalAmount, courseCounts, guestsTotal, itemsTotal, BASE_PRICE }) => {
  const router = useRouter()

  return (
    <div className={`${styles.popup} ${styles.detailsPopup}`}>
      <div className={styles.popupHeader}>
        <h2>Booking Details</h2>
        <button className={styles.closeButton} onClick={() => setPopup("")}>
          <X size={20} />
        </button>
      </div>

      <div className={`${styles.popupContent} ${styles.scrollableContent}`}>
        <div className={styles.detailsSection}>
          <h3 className={styles.detailsSectionTitle}>Guests</h3>
          <div className={styles.detailsRow}>
            <span>Adults</span>
            <span>{guests.adults} × ₹100 = ₹{guests.adults * 100}</span>
          </div>
          <div className={styles.detailsRow}>
            <span>Children</span>
            <span>{guests.children} × ₹75 = ₹{guests.children * 75}</span>
          </div>
          <div className={styles.detailsRow} style={{ fontWeight: 'bold' }}>
            <span>Guests Total</span>
            <span>₹{guestsTotal}</span>
          </div>
        </div>

        <div className={styles.detailsSection}>
          <h3 className={styles.detailsSectionTitle}>Base Price</h3>
          <div className={styles.detailsRow}>
            <span>Base Price</span>
            <span>₹{BASE_PRICE}</span>
          </div>
        </div>

        <div className={styles.detailsSection}>
          <h3 className={styles.detailsSectionTitle}>Selected Items</h3>
          {Object.keys(COURSE_PRICES).map(course => (
            <div className={styles.detailsRow} key={course}>
              <span>{course}</span>
              <span>{courseCounts[course] || 0} × ₹{COURSE_PRICES[course]} = ₹{(courseCounts[course] || 0) * COURSE_PRICES[course]}</span>
            </div>
          ))}
          <div className={styles.detailsRow} style={{ fontWeight: 'bold' }}>
            <span>Items Total</span>
            <span>₹{itemsTotal}</span>
          </div>
        </div>

        <div className={styles.totalSection}>
          <div className={styles.totalRow}>
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>
          <div style={{ 
            color: '#ff4d4f', 
            fontSize: '14px', 
            marginTop: '8px', 
            textAlign: 'center',
            padding: '8px',
            backgroundColor: '#fff2f0',
            borderRadius: '4px',
            border: '1px solid #ffccc7'
          }}>
            The booking fee of ₹{BOOKING_FEE} will be deducted from your final bill
          </div>
        </div>
      </div>

      <div className={styles.popupFooter}>
        <button className={styles.payButton} onClick={()=>router.push('/payment')}>Pay ₹{BOOKING_FEE} for Booking</button>
      </div>
    </div>
  )
}

export default DetailsPopup
