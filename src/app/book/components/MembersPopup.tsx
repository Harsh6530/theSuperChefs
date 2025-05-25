"use client";

import type React from "react";
import styles from "../styles/popup.module.css";
import { X, Minus, Plus } from "lucide-react";
import { useContext } from "react";
import { dataContext } from "@/app/context/dataContext";

interface MembersPopupProps {
  setPopup: (value: string) => void;
  guests: { adults: number; children: number };
  setGuests: (guests: { adults: number; children: number }) => void;
}

const MembersPopup: React.FC<MembersPopupProps> = ({
  setPopup,
  guests,
  setGuests,
}) => {
  const { setGuestsData, guestsData } = useContext(dataContext);

  const handleIncrement = (type: "adults" | "children") => {
    setGuests({
      ...guests,
      [type]: guests[type] + 1,
    });
    setGuestsData({
      ...guestsData,
      [type]:guests[type]+1
    })
  };

  const handleDecrement = (type: "adults" | "children") => {
    if (guests[type] > 0) {
      setGuests({
        ...guests,
        [type]: guests[type] - 1,
      });
    }
    setGuestsData({
      ...guestsData,
      [type]:guests[type]-1
    })
  };

  const handleDone = () => {
    setPopup("");
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupHeader}>
        <h2>Choose Number of Guests</h2>
        <button
          className={styles.closeButton}
          onClick={() => setPopup("")}>
          <X size={20} />
        </button>
      </div>

      <div className={styles.popupContent}>
        {/* <p className={styles.popupDescription}>
          We&apos;ll <strong>allow up to 2 extra people for free</strong> in
          case of any last-minute changes
        </p> */}

        <div className={styles.selectionItem}>
          <div className={styles.selectionLabel}>Adults <span style={{color:'#ff8c1a', fontWeight:500, fontSize:14}}>(₹100)</span></div>
          <div className={styles.counter}>
            <button
              className={styles.counterButton}
              onClick={() => handleDecrement("adults")}
              disabled={guests.adults === 0}>
              <Minus size={16} />
            </button>
            <span className={styles.counterValue}>{guests.adults}</span>
            <button
              className={styles.counterButton}
              onClick={() => handleIncrement("adults")}>
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className={styles.selectionItem}>
          <div className={styles.selectionLabel}>Children <span style={{color:'#ff8c1a', fontWeight:500, fontSize:14}}>(₹75)</span></div>
          <div className={styles.counter}>
            <button
              className={styles.counterButton}
              onClick={() => handleDecrement("children")}
              disabled={guests.children === 0}>
              <Minus size={16} />
            </button>
            <span className={styles.counterValue}>{guests.children}</span>
            <button
              className={styles.counterButton}
              onClick={() => handleIncrement("children")}>
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.popupFooter}>
        <button
          className={styles.doneButton}
          onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  );
};

export default MembersPopup;
