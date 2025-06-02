"use client";

import type React from "react";
import styles from "../styles/popup.module.css";
import { X, Clock } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setTime } from "@/../redux/booking/waiterBartenderBookingSlice"; // adjust path

interface TimePopupProps {
  setPopup: (value: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

const TimePopup: React.FC<TimePopupProps> = ({
  setPopup,
  selectedTime,
  setSelectedTime,
}) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: any) => state.waiterBartenderBooking.date);

  if (!selectedDate || !selectedDate.dateNum || !selectedDate.month) {
    return (
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <h2>Error</h2>
          <button className={styles.closeButton} onClick={() => setPopup("")}>
            <X size={20} />
          </button>
        </div>
        <div className={styles.popupContent}>
          <p>Please select a valid date before choosing a time.</p>
        </div>
      </div>
    );
  }

  const generateTimeSlots = () => {
    const now = new Date();
    const slots: string[] = [];

    // Create time slot generator
    const addSlots = (startHour: number, endHour: number) => {
      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          if (hour === endHour && minute === 30) continue;

          const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
          const amPm = hour >= 12 ? "PM" : "AM";
          const minuteFormatted = minute === 0 ? "00" : minute;

          slots.push(`${hourFormatted}:${minuteFormatted} ${amPm}`);
        }
      }
    };

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const selected = new Date();
    selected.setDate(selectedDate.dateNum || tomorrow.getDate());
    selected.setMonth(new Date(`${selectedDate.month} 1, 2000`).getMonth() || tomorrow.getMonth());

    // Check if selected date is tomorrow
    const isTomorrow =
      selected.getDate() === tomorrow.getDate() &&
      selected.getMonth() === tomorrow.getMonth();

    if (isTomorrow) {
      const currentHour = now.getHours();
      const startHour = currentHour >= 19 ? 19 : 13;
      addSlots(startHour, 22);
    } else {
      addSlots(13, 22); // Full slots for dates > tomorrow
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    dispatch(setTime(time));
  };

  const handleDone = () => {
    setPopup("");
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupHeader}>
        <h2>Select Serving Time</h2>
        <button className={styles.closeButton} onClick={() => setPopup("")}>
          <X size={20} />
        </button>
      </div>

      <div className={`${styles.popupContent} ${styles.scrollableContent}`}>
        <div className={styles.timeSlotContainer}>
          {timeSlots.map((time, index) => (
            <div
              key={index}
              className={`${styles.timeSlot} ${
                selectedTime === time ? styles.selectedTimeSlot : ""
              }`}
              onClick={() => handleTimeSelect(time)}>
              <Clock size={16} className={styles.timeIcon} />
              <span>{time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.popupFooter}>
        <div className={styles.selectedInfo}>
          {selectedTime ? (
            <span>Selected: {selectedTime}</span>
          ) : (
            <span>No time selected</span>
          )}
        </div>
        <button className={styles.doneButton} onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  );
};

export default TimePopup;
