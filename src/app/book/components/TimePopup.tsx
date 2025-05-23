"use client"

import type React from "react"
import styles from "../styles/popup.module.css"
import { X, Clock } from "lucide-react"

interface TimePopupProps {
  setPopup: (value: string) => void
  selectedTime: string
  setSelectedTime: (time: string) => void
}

const TimePopup: React.FC<TimePopupProps> = ({ setPopup, selectedTime, setSelectedTime }) => {
  // Generate time slots from 2:00 PM to 10:00 PM with 30-minute intervals
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 14; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        // Skip 10:30 PM as it's past the end time
        if (hour === 22 && minute === 30) continue

        const hourFormatted = hour % 12 === 0 ? 12 : hour % 12
        const amPm = hour >= 12 ? "PM" : "AM"
        const minuteFormatted = minute === 0 ? "00" : minute

        slots.push(`${hourFormatted}:${minuteFormatted} ${amPm}`)
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleDone = () => {
    setPopup("")
  }

  return (
    <div className={styles.popup}>
      <div className={styles.popupHeader}>
        <h2>Select Party Time</h2>
        <button className={styles.closeButton} onClick={() => setPopup("")}>
          <X size={20} />
        </button>
      </div>

      <div className={`${styles.popupContent} ${styles.scrollableContent}`}>
        <div className={styles.timeSlotContainer}>
          {timeSlots.map((time, index) => (
            <div
              key={index}
              className={`${styles.timeSlot} ${selectedTime === time ? styles.selectedTimeSlot : ""}`}
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
          {selectedTime ? <span>Selected: {selectedTime}</span> : <span>No time selected</span>}
        </div>
        <button className={styles.doneButton} onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  )
}

export default TimePopup
