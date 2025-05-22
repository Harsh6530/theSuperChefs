"use client";

import React, { useState } from "react";
import styles from "./bookingDetails.module.css";
import { ItemMenuOverlay } from "./ItemMenuOverlay";
import { GuestOverlay } from "./GuestOverlay";

export default function BookingDetails() {
  const [overlay, setOverlay] = useState<string | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [bartenders, setBartenders] = useState(0);
  const [waiters, setWaiters] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const baseAmount = 1000;
  const adultPrice = 100;
  const childPrice = 50;
  const itemPrice = 300;
  const bartenderPrice = 500;
  const waiterPrice = 400;

  const totalItems = Object.values(selectedItems).reduce((a, b) => a + b, 0);
  const totalAmount =
    baseAmount +
    adults * adultPrice +
    children * childPrice +
    totalItems * itemPrice +
    bartenders * bartenderPrice +
    waiters * waiterPrice;

  return (
    <div className={styles.bookingDetailsContainer}>
      <h2>Booking Details</h2>

      <div className={styles.scrollableForm}>
      <div className={styles.formGroup}>
          <label>Date & Time</label>
          <div className={styles.dateTimeRow}>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Number of Guests</label>
          <button onClick={() => setOverlay("guests")}>
            {adults} Adults, {children} Children
          </button>
        </div>

        <div className={styles.formGroup}>
          <label>Select Items</label>
          <button onClick={() => setOverlay("items")}>Choose from Menu</button>
        </div>

        <div className={styles.formGroup}>
          <label>Bartenders</label>
          <input
            type="number"
            min={0}
            value={bartenders}
            onChange={(e) => setBartenders(Number(e.target.value))}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Waiters</label>
          <input
            type="number"
            min={0}
            value={waiters}
            onChange={(e) => setWaiters(Number(e.target.value))}
          />
        </div>

        <div className={styles.billDetails}>
          <h3>Bill Details</h3>
          <div>Basic Amount: ₹{baseAmount}</div>
          <div>Adults x {adults}: ₹{adults * adultPrice}</div>
          <div>Children x {children}: ₹{children * childPrice}</div>
          <div>Items x {totalItems}: ₹{totalItems * itemPrice}</div>
          <div>Bartenders x {bartenders}: ₹{bartenders * bartenderPrice}</div>
          <div>Waiters x {waiters}: ₹{waiters * waiterPrice}</div>
          {date && time && (
            <div className={styles.bookingTime}>
              <div>Date: {new Date(date).toLocaleDateString()}</div>
              <div>Time: {time}</div>
            </div>
          )}
          <hr />
          <div className={styles.total}>Total Amount: <b>₹{totalAmount}</b></div>
          {totalItems > 0 && (
            <div>
              <div style={{ marginTop: "10px", fontWeight: "600" }}>Selected Items:</div>
              <ul className={styles.selectedList}>
                {Object.entries(selectedItems).map(([item, count]) => (
                  <li key={item}>{item} x {count}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <button className={styles.confirmBtn}>Pay ₹199 to confirm booking</button>

      {overlay === "items" && (
        <ItemMenuOverlay
          onClose={() => setOverlay(null)}
          onSelect={(items) => setSelectedItems(items)}
        />
      )}

      {overlay === "guests" && (
        <GuestOverlay
          onClose={() => setOverlay(null)}
          adults={adults}
          children={children}
          setAdults={setAdults}
          setChildren={setChildren}
        />
      )}
    </div>
  );
}
