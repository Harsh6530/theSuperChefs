"use client";

import React, { useState } from "react";
import styles from "./book.module.css";
import Pop_up from "./components/Pop_up";

const page = () => {
  const currentDate = new Date();
  const dates = [1, 2, 3, 4, 5].map((index) => {
    const temp_date = new Date(currentDate);
    temp_date.setDate(temp_date.getDate() + index);
    const day = temp_date
      .toLocaleDateString("en-Us", { weekday: "long" })
      .slice(0, 3);
    const month = temp_date
      .toLocaleString("en-US", { month: "long" })
      .slice(0, 3);
    const dateNum = temp_date.getDate();

    return {
      day,
      month,
      dateNum,
    };
  });

  const [pop, setPop] = useState("");
  const [selectedDate, setSelectedDate] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.white_bg}>
          {" "}
          <header className={styles.header}>
            <span>{"<-"}</span>
            <p>Booking Details</p>
          </header>
          <div className={styles.content}>
            <div className={styles.date}>
              <p className={styles.date_head}>Select your party date</p>
              <ul className={styles.dates}>
                {dates.map((elem, index) => (
                  <li
                    className={`${styles.date_element} ${
                      selectedDate === index ? styles.selected : ""
                    }`}
                    key={index}
                    onClick={()=>setSelectedDate(index)}>
                    <p>{elem.month}</p>
                    <p>{elem.dateNum}</p>
                    <p>{elem.day}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.selection}>
              <div className={styles.selection}>
                <label>Number of People</label>
                <button
                  className={styles.member_selected}
                  onClick={() => setPop("guest")}>
                  <p>Select Members</p>
                  <span>⌄</span>
                </button>
              </div>
              <div className={styles.selection}>
                <label>Items</label>
                <button className={styles.member_selected}>
                  <p>Select Items</p>
                  <span>⌄</span>
                </button>
              </div>
            </div>
          </div>
          <footer className={styles.footer}>
            <div className={styles.info}>
              <p>₹ 1669</p>
              <p>
                Payable Amount <span>(DETAILS)</span>
              </p>
            </div>
            <button>Continue</button>
          </footer>
          {pop === "guest" ? <Pop_up setPop={setPop} /> : ""}
        </div>
      </div>
    </div>
  );
};

export default page;
