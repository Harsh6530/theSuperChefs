"use client";

import React from "react";
import styles from "../styles/popup.module.css";
import { X, Clock } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import store from "@/../redux/auth/store";
import { setSelectedTime } from "@/../redux/booking/bookingSlice";

type RootState = ReturnType<typeof store.getState>;

interface TimePopupProps {
  setPopup: (value: string) => void;
}

const TimePopup: React.FC<TimePopupProps> = ({ setPopup }) => {
  const dispatch = useDispatch();

  // Get selectedDate and selectedTime from Redux store
  const selectedDate = useSelector((state: RootState) => state.booking.selectedDate);
  const selectedTime = useSelector((state: RootState) => state.booking.selectedTime);

  // Validate date
  if (selectedDate == null || selectedDate < 0) {
    return (
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <h2>Error</h2>
          <button
            className={styles.closeButton}
            onClick={() => setPopup("")}
          >
            <X size={20} />
          </button>
        </div>
        <div className={styles.popupContent}>
          <p>Please select a valid date before choosing a time.</p>
        </div>
      </div>
    );
  }

  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    const now = new Date();
    const currentHour = now.getHours();
    const isAfter7PM = currentHour >= 19;

    // Reconstruct the actual date for the selected index
    const bookingDate = new Date();
    bookingDate.setHours(0, 0, 0, 0);
    bookingDate.setDate(bookingDate.getDate() + selectedDate + 1);

    console.log({
      now: now.toString(),
      selectedDate,
      bookingDate: bookingDate.toString(),
      isAfter7PM
    });

    // If booking for today, do not allow any slots (force user to pick a future date)
    // if (selectedDate === 0) {
    //   return slots;
    // }

    // If booking for next day
    if (selectedDate === 0) {
      // If booking after 7 PM, only allow slots after 7 PM next day
      if (isAfter7PM) {
        for (let hour = 19; hour <= 22; hour++) {
          for (let minute = 0; minute < 60; minute += 30) {
            if (hour === 22 && minute === 30) continue;
            const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
            const amPm = hour >= 12 ? "PM" : "AM";
            const minuteFormatted = minute === 0 ? "00" : minute.toString();
            slots.push(`${hourFormatted}:${minuteFormatted} ${amPm}`);
          }
        }
        return slots;
      } else {
        // If booking before 7 PM, allow lunch (after 1 PM) and dinner
        for (let hour = 13; hour <= 22; hour++) {
          for (let minute = 0; minute < 60; minute += 30) {
            if (hour === 22 && minute === 30) continue;
            const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
            const amPm = hour >= 12 ? "PM" : "AM";
            const minuteFormatted = minute === 0 ? "00" : minute.toString();
            slots.push(`${hourFormatted}:${minuteFormatted} ${amPm}`);
          }
        }
        return slots;
      }
    }

    // For all other future days, allow all slots from 1 PM to 10 PM
    for (let hour = 13; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 22 && minute === 30) continue;
        const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
        const amPm = hour >= 12 ? "PM" : "AM";
        const minuteFormatted = minute === 0 ? "00" : minute.toString();
        slots.push(`${hourFormatted}:${minuteFormatted} ${amPm}`);
      }
    }
    console.log({ now, selectedDate, isAfter7PM });
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleTimeSelect = (time: string) => {
    dispatch(setSelectedTime(time));
  };

  const handleDone = () => {
    setPopup("");
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupHeader}>
        <h2>Select Serving Time</h2>
        <button
          className={styles.closeButton}
          onClick={() => setPopup("")}
        >
          <X size={20} />
        </button>
      </div>

      <div className={`${styles.popupContent} ${styles.scrollableContent}`}>
        <div className={styles.timeSlotContainer}>
          {timeSlots.map((time: string, index: number) => (
            <div
              key={index}
              className={`${styles.timeSlot} ${
                selectedTime === time ? styles.selectedTimeSlot : ""
              }`}
              onClick={() => handleTimeSelect(time)}
            >
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
