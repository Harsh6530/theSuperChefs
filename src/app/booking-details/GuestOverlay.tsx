import React from "react";
import styles from "./bookingDetails.module.css";

type GuestOverlayProps = {
  onClose: () => void;
  adults: number;
  children: number;
  setAdults: (val: number) => void;
  setChildren: (val: number) => void;
};

export const GuestOverlay = ({ onClose, adults, children, setAdults, setChildren }: GuestOverlayProps) => {
  return (
    <div className={styles.overlayCard}>
      <h3>Number of Guests</h3>
      <div className={styles.counterRow}>
        <label>Adults</label>
        <div className={styles.counter}>
          <button onClick={() => setAdults(Math.max(adults - 1, 1))}>-</button>
          <span>{adults}</span>
          <button onClick={() => setAdults(adults + 1)}>+</button>
        </div>
      </div>

      <div className={styles.counterRow}>
        <label>Children</label>
        <div className={styles.counter}>
          <button onClick={() => setChildren(Math.max(children - 1, 0))}>-</button>
          <span>{children}</span>
          <button onClick={() => setChildren(children + 1)}>+</button>
        </div>
      </div>

      <button className={styles.confirmBtn} onClick={onClose}>
        Confirm
      </button>
    </div>
  );
};
