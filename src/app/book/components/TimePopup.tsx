"use client";

import type React from "react";
import styles from "../styles/popup.module.css";
import { X, Clock } from "lucide-react";
import { dataContext } from "@/app/context/dataContext";
import { useContext } from "react";

interface TimePopupProps {
  setPopup: (value: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

const TimePopup: React.FC<TimePopupProps> = ({
  setPopup,
  setSelectedTime,
  selectedTime,
}) => {
  const { dateTime, setDateTime } = useContext(dataContext);

  // Check if dateTime has a valid date
  // Assuming dateTime.date is an object like { day: string, month: string, dateNum: number }
  const isDateValid = dateTime?.date &&
    dateTime.date.dateNum !== 0 &&
    dateTime.date.month?.trim() !== "" &&
    dateTime.date.day?.trim() !== "";

  if (!isDateValid) {
    return (
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <h2>Error</h2>
          <button
            className={styles.closeButton}
            onClick={() => setPopup("")}>
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
    const slots = [];
    const now = new Date();

    // Get current hour to determine where to start from
    const currentHour = now.getHours();

    // Create the bufferDate 24hrs from now
    const bufferDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    // If current time is >= 7 PM, start from 7 PM
    // Else, start from 1 PM
    const startHour = currentHour >= 19 ? 19 : 13;

    for (let hour = startHour; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 22 && minute === 30) continue;

        const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
        const amPm = hour >= 12 ? "PM" : "AM";
        const minuteFormatted = minute === 0 ? "00" : minute;

        slots.push(`${hourFormatted}:${minuteFormatted} ${amPm}`);
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setDateTime({ ...dateTime, time: time });
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
          onClick={() => setPopup("")}>
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
              <Clock
                size={16}
                className={styles.timeIcon}
              />
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
        <button
          className={styles.doneButton}
          onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  );
};

export default TimePopup;
