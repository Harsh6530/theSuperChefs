"use client"

import type React from "react"
import styles from "../styles/popup.module.css"
import { X } from "lucide-react"

interface Item {
  id: number
  name: string
  price: number
  category: string
}

interface DetailsPopupProps {
  setPopup: (value: string) => void
  guests: { adults: number; children: number }
  selectedItems: Item[]
  totalAmount: number
}

const DetailsPopup: React.FC<DetailsPopupProps> = ({ setPopup, guests, selectedItems, totalAmount }) => {
  const basePrice = 199

  // Group items by category
  const itemsByCategory = selectedItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, Item[]>,
  )

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
            <span>{guests.adults}</span>
          </div>
          <div className={styles.detailsRow}>
            <span>Children</span>
            <span>{guests.children}</span>
          </div>
        </div>

        <div className={styles.detailsSection}>
          <h3 className={styles.detailsSectionTitle}>Base Price</h3>
          <div className={styles.detailsRow}>
            <span>Booking Fee</span>
            <span>₹{basePrice}</span>
          </div>
        </div>

        {Object.keys(itemsByCategory).length > 0 && (
          <div className={styles.detailsSection}>
            <h3 className={styles.detailsSectionTitle}>Selected Items</h3>

            {Object.entries(itemsByCategory).map(([category, items]) => (
              <div key={category} className={styles.categoryItems}>
                <h4 className={styles.categoryItemsTitle}>{category}</h4>

                {items.map((item) => (
                  <div key={item.id} className={styles.detailsRow}>
                    <span>{item.name}</span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className={styles.totalSection}>
          <div className={styles.totalRow}>
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>
      </div>

      <div className={styles.popupFooter}>
        <button className={styles.payButton}>Pay ₹199 for Booking</button>
      </div>
    </div>
  )
}

export default DetailsPopup
