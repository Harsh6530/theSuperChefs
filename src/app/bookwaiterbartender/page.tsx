"use client";

import { useState } from "react";
import styles from "./styles/bookwaiterandbartender.module.css";
import DateSelector from "./components/DateSelector";
import TimeSelector from "./components/TimeSelector";
import CouponSection from "./components/CouponSection";
import SummaryFooter from "./components/SummaryFooter";
import DetailsPopup from "./components/DetailsPopup";
import TimePopup from "./components/TimePopup";

const Page = () => {
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [numWaiters, setNumWaiters] = useState(0);
  const [numBartenders, setNumBartenders] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [popup, setPopup] = useState("");

  return (
    <div className={styles.container} style={{ margin: '32px 0' }}>
      <div className={styles.wrapper}>
        <div className={styles.white_bg}>
          <header className={styles.header}>
            <p>Booking Details</p>
          </header>
          <div className={styles.content}>
            <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <TimeSelector
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              onClick={() => setPopup("time")}
            />
            <div className={styles.selectionBox}>
              <label>Number of Waiters</label>
              <div className={styles.stepper}>
                <button
                  type="button"
                  className={styles.stepperBtn}
                  onClick={() => setNumWaiters(Math.max(0, numWaiters - 1))}
                  disabled={numWaiters <= 0}
                >
                  -
                </button>
                <span className={styles.stepperValue}>{numWaiters}</span>
                <button
                  type="button"
                  className={styles.stepperBtn}
                  onClick={() => setNumWaiters(Math.min(99, numWaiters + 1))}
                >
                  +
                </button>
              </div>
            </div>
            <div className={styles.selectionBox}>
              <label>Number of Bartenders</label>
              <div className={styles.stepper}>
                <button
                  type="button"
                  className={styles.stepperBtn}
                  onClick={() => setNumBartenders(Math.max(0, numBartenders - 1))}
                  disabled={numBartenders <= 0}
                >
                  -
                </button>
                <span className={styles.stepperValue}>{numBartenders}</span>
                <button
                  type="button"
                  className={styles.stepperBtn}
                  onClick={() => setNumBartenders(Math.min(2, numBartenders + 1))}
                >
                  +
                </button>
              </div>
              <div className={styles.bartenderNote}>
                A bartender is sufficient for 20-25 people.
              </div>
            </div>
            <CouponSection couponApplied={couponApplied} setCouponApplied={setCouponApplied} />
          </div>
          <SummaryFooter
            numWaiters={numWaiters}
            numBartenders={numBartenders}
            couponApplied={couponApplied}
            onBook={() => setPopup("details")}
          />
          {popup === "details" && (
            <DetailsPopup
              setPopup={setPopup}
              numWaiters={numWaiters}
              numBartenders={numBartenders}
              couponApplied={couponApplied}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          )}
          {popup === "time" && (
            <TimePopup
              setPopup={setPopup}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page; 