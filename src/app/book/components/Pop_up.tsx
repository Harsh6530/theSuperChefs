import React from "react";
import styles from "../styles/pop_up.module.css";

const Pop_up = ({setPop}) => {
  return (
    <div className={styles.guest_popup}>
      <button className={styles.close} onClick={()=>setPop("")}>X</button>
      <div className={styles.text}>
        <p>Choose Number of Guests </p>
        <p>
          We’ll <b>allow up to 2 extra people for free</b> in case of any
          last-minute changes
        </p>
      </div>
      <div className={styles.selection}>
        <div className={styles.select}>
          <p>Adults</p>
          <div className={styles.increment}>
            <button>{"<"}</button>
            <p>0</p>
            <button>{">"}</button>
          </div>
        </div>
      </div>
      <div className={styles.selection}>
        <div className={styles.select}>
          <p>Children</p>
          <div className={styles.increment}>
            <button>{"<"}</button>
            <p>0</p>
            <button>{">"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pop_up;
