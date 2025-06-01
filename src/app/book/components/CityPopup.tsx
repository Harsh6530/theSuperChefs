"use client";

import type React from "react";
import styles from "../styles/popup.module.css";
import { X, MapPin } from "lucide-react";

interface CityPopupProps {
  setPopup: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  cities?: string[];
}

const DEFAULT_CITIES = ["Delhi NCR", "Bangalore", "Mumbai", "Pune"];

const CityPopup: React.FC<CityPopupProps> = ({ setPopup, selectedCity, setSelectedCity, cities = DEFAULT_CITIES }) => {
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  const handleDone = () => {
    setPopup("");
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupHeader}>
        <h2>Select City</h2>
        <button
          className={styles.closeButton}
          onClick={() => setPopup("")}>
          <X size={20} />
        </button>
      </div>

      <div className={`${styles.popupContent} ${styles.scrollableContent}`}>
        <div className={styles.timeSlotContainer}>
          {cities.map((city, index) => (
            <div
              key={index}
              className={`${styles.timeSlot} ${selectedCity === city ? styles.selectedTimeSlot : ""}`}
              onClick={() => handleCitySelect(city)}>
              <MapPin size={16} className={styles.timeIcon} />
              <span>{city}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.popupFooter}>
        <div className={styles.selectedInfo}>
          {selectedCity ? (
            <span>Selected: {selectedCity}</span>
          ) : (
            <span>No city selected</span>
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

export default CityPopup; 