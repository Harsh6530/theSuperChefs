"use client";
import React from "react";
import styles from "../../book/styles/popup.module.css";
import { X } from "lucide-react";

interface WaiterBartenderPopupProps {
  setPopup: (value: string) => void;
  numWaiters: number;
  setNumWaiters: (n: number) => void;
  numBartenders: number;
  setNumBartenders: (n: number) => void;
}

const WaiterBartenderPopup: React.FC<WaiterBartenderPopupProps> = ({ setPopup, numWaiters, setNumWaiters, numBartenders, setNumBartenders }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupHeader}>
        <h2>Select Staff</h2>
        <button className={styles.closeButton} onClick={() => setPopup("")}>
          <X size={20} />
        </button>
      </div>
      <div className={styles.popupContent}>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>Number of Waiters</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className={styles.counterButton} onClick={() => setNumWaiters(Math.max(0, numWaiters - 1))} disabled={numWaiters <= 0}>-</button>
            <span className={styles.counterValue}>{numWaiters}</span>
            <button className={styles.counterButton} onClick={() => setNumWaiters(numWaiters + 1)}>+</button>
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>Number of Bartenders <span style={{ color: '#888', fontWeight: 400, fontSize: 13 }}>(max 2)</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className={styles.counterButton} onClick={() => setNumBartenders(Math.max(0, numBartenders - 1))} disabled={numBartenders <= 0}>-</button>
            <span className={styles.counterValue}>{numBartenders}</span>
            <button className={styles.counterButton} onClick={() => setNumBartenders(Math.min(2, numBartenders + 1))} disabled={numBartenders >= 2}>+</button>
          </div>
          <div style={{ color: '#888', fontSize: 13, marginTop: 6 }}>A bartender is sufficient for 20-25 people.</div>
        </div>
      </div>
      <div className={styles.popupFooter}>
        <button className={styles.doneButton} onClick={() => setPopup("")}>Done</button>
      </div>
    </div>
  );
};
export default WaiterBartenderPopup; 