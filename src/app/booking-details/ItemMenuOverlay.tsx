import React, { useState } from "react";
import styles from "./bookingDetails.module.css";

type ItemMenuOverlayProps = {
  onClose: () => void;
  onSelect: (items: Record<string, number>) => void;
};

export const ItemMenuOverlay = ({ onClose, onSelect }: ItemMenuOverlayProps) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});

  const categories: Record<string, string[]> = {
    Starters: ["Veg Spring Rolls", "Honey Chilli Potato", "Chilli Paneer (Dry)", "Chicken 65"],
    "Main Course": ["Dal Makhni", "Kadhai Paneer", "Butter Chicken", "Chicken Korma", "Shahi Paneer"],
    Breads: ["Garlic Naan", "Lachha Paratha", "Missi Roti", "Poori"],
    "Rice & Biryani": ["Veg Tawa Pulav", "Jeera Rice", "Hyderabadi Chicken Biryani", "Egg Biryani"],
    Desserts: ["Moong Dal Halwa", "Fruit Cream", "Shahi Tukda", "Phirni"],
  };

  const updateItemCount = (item: string, delta: number) => {
    setSelectedItems((prev) => {
      const newCount = (prev[item] || 0) + delta;
      if (newCount <= 0) {
        const copy = { ...prev };
        delete copy[item];
        return copy;
      } else {
        return { ...prev, [item]: newCount };
      }
    });
  };

  const totalSelected = Object.values(selectedItems).reduce((a, b) => a + b, 0);

  return (
    <div className={styles.overlayCard}>
      <h3>Select Items by Category</h3>

      {Object.entries(categories).map(([category, items]) => (
        <div key={category} className={styles.menuSection}>
          <h4>{category}</h4>
          <ul>
            {items.map((item) => (
              <li key={item} className={styles.counterRow}>
                <span>{item}</span>
                <div className={styles.counter}>
                  <button onClick={() => updateItemCount(item, -1)}>-</button>
                  <span>{selectedItems[item] || 0}</span>
                  <button onClick={() => updateItemCount(item, 1)}>+</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button className={styles.confirmBtn} onClick={() => {
        onSelect(selectedItems);
        onClose();
      }}>
        Confirm ({totalSelected} selected)
      </button>
    </div>
  );
};
