"use client";

import type React from "react";
import styles from "../styles/popup.module.css";
import { X, Minus, Plus } from "lucide-react";

interface WaiterBartenderPopupProps {
  setPopup: (value: string) => void;
  waiterCount: number;
  setWaiterCount: (count: number) => void;
  bartenderCount: number;
  setBartenderCount: (count: number) => void;
  WAITER_PRICE?: number;
  BARTENDER_PRICE?: number;
}

const WaiterBartenderPopup: React.FC<WaiterBartenderPopupProps> = ({
  setPopup,
  waiterCount,
  setWaiterCount,
  bartenderCount,
  setBartenderCount,
  WAITER_PRICE = 1499,
  BARTENDER_PRICE = 2499,
}) => {
  const handleIncrement = (type: "waiter" | "bartender") => {
    if (type === "waiter") setWaiterCount(waiterCount + 1);
    if (type === "bartender") setBartenderCount(bartenderCount + 1);
  };

  const handleDecrement = (type: "waiter" | "bartender") => {
    if (type === "waiter" && waiterCount > 0) setWaiterCount(waiterCount - 1);
    if (type === "bartender" && bartenderCount > 0) setBartenderCount(bartenderCount - 1);
  };

  const handleDone = () => {
    setPopup("");
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupHeader}>
        <h2>Waiters & Bartenders</h2>
        <button className={styles.closeButton} onClick={() => setPopup("")}>
          <X size={20} />
        </button>
      </div>
      <div className={styles.popupContent}>
        <div className={styles.selectionItem}>
          <div className={styles.selectionLabel}>Waiters <span style={{color:'#ff9800', fontWeight:500, fontSize:14}}>(₹1499)</span></div>
          <div className={styles.counter}>
            <button
              className={styles.counterButton}
              onClick={() => handleDecrement("waiter")}
              disabled={waiterCount === 0}
            >
              <Minus size={16} />
            </button>
            <span className={styles.counterValue}>{waiterCount}</span>
            <button
              className={styles.counterButton}
              onClick={() => handleIncrement("waiter")}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        <div className={styles.selectionItem}>
          <div className={styles.selectionLabel}>
            Bartenders <span style={{color:'#ff9800', fontWeight:500, fontSize:14}}>(₹2499)</span>
            <div style={{fontSize:12, color:'#666', marginTop:4}}>One bartender can handle 20-25 persons easily</div>
          </div>
          <div className={styles.counter}>
            <button
              className={styles.counterButton}
              onClick={() => handleDecrement("bartender")}
              disabled={bartenderCount === 0}
            >
              <Minus size={16} />
            </button>
            <span className={styles.counterValue}>{bartenderCount}</span>
            <button
              className={styles.counterButton}
              onClick={() => handleIncrement("bartender")}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.popupFooter}>
        <button className={styles.doneButton} onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  );
};

export default WaiterBartenderPopup; 