"use client";
import React from "react";
import styles from "../../book/book.module.css";

interface DateSelectorProps {
  selectedDate: number;
  setSelectedDate: (index: number) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, setSelectedDate }) => {
  const currentDate = new Date();
  const dates = [1, 2, 3, 4, 5].map((index) => {
    const temp_date = new Date(currentDate);
    temp_date.setDate(temp_date.getDate() + index);
    const day = temp_date.toLocaleDateString("en-Us", { weekday: "long" }).slice(0, 3);
    const month = temp_date.toLocaleString("en-US", { month: "long" }).slice(0, 3);
    const dateNum = temp_date.getDate();
    return { day, month, dateNum };
  });

  return (
    <div className={styles.date}>
      <p className={styles.date_head}>Select your party date</p>
      <ul className={styles.dates}>
        {dates.map((elem, index) => (
          <li
            className={`${styles.date_element} ${selectedDate === index ? styles.selected : ""}`}
            key={index}
            onClick={() => setSelectedDate(index)}
          >
            <p>{elem.month}</p>
            <p className={styles.dateNum}>{elem.dateNum}</p>
            <p>{elem.day}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DateSelector; 