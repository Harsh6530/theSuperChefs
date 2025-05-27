"use client";
import React from "react";
import styles from "../../book/book.module.css";
import { Clock } from "lucide-react";

interface TimeSelectorProps {
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  onClick?: () => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ selectedTime, setSelectedTime, onClick }) => {
  return (
    <div className={styles.selection}>
      <label>Serving Time</label>
      <button
        className={styles.selector}
        onClick={onClick}
      >
        <p>{selectedTime ? selectedTime : "Select Time"}</p>
        <Clock size={20} />
      </button>
    </div>
  );
};

export default TimeSelector; 