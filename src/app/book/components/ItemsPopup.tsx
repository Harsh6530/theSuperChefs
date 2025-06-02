"use client";

import type React from "react";
import { useState, useEffect } from "react";
import styles from "../styles/popup.module.css";
import { X, Check } from "lucide-react";
import { useContext } from "react";
import { dataContext } from "@/app/context/dataContext";

interface MenuItem {
  _id: string;
  Course_Type: string;
  Classification: string;
  Cuisine: string;
  Dish_Name: string;
  Remarks?: string;
}

interface ItemsPopupProps {
  setPopup: (value: string) => void;
  selectedItems: any[];
  onItemsSelected: (items: any[]) => void;
}

const ItemsPopup: React.FC<ItemsPopupProps> = ({
  setPopup,
  selectedItems,
  onItemsSelected,
}) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetch("/api/menu")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch menu");
        return res.json();
      })
      .then(data => {
        setMenuItems(data);
        setLoading(false);
        // Collapse all categories by default
        const initialCollapsed: { [key: string]: boolean } = {};
        [...new Set(data.map((item: MenuItem) => item.Course_Type))].forEach((cat: any) => {
          initialCollapsed[cat] = true;
        });
        setCollapsed(initialCollapsed);
      })
      .catch(err => {
        setLoading(false);
        setError("Failed to load menu. Please try again later.");
      });
  }, []);

  const categories = [...new Set(menuItems.map((item) => item.Course_Type))];

  const toggleItem = (item: MenuItem) => {
    if (selectedItems.some((i) => i._id === item._id)) {
      onItemsSelected(selectedItems.filter((i) => i._id !== item._id));
    } else {
      onItemsSelected([...selectedItems, item]);
    }
  };

  const handleDone = () => {
    onItemsSelected(selectedItems);
    setPopup("");
  };

  const COURSE_LABELS: Record<string, string> = {
    Soups: "Soups",
    Starter: "Starters",
    Starters: "Starters",
    Mains: "Main Course",
    "Main Course": "Main Course",
    Sides: "Sides",
    Desserts: "Desserts",
    Dessert: "Desserts",
    Beverages: "Beverages",
  };
  const COURSE_PRICES: Record<string, number> = {
    Soups: 149,
    Starters: 299,
    "Main Course": 299,
    Sides: 149,
    Desserts: 299,
    Beverages: 149,
  };
  const allCourses = ["Soups", "Starters", "Main Course", "Sides", "Desserts", "Beverages"];

  // Calculate course counts for footer summary
  const courseCounts: Record<string, number> = {};
  selectedItems.forEach(item => {
    const label = COURSE_LABELS[item.Course_Type] || item.Course_Type;
    courseCounts[label] = (courseCounts[label] || 0) + 1;
  });

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div style={{ color: 'red', padding: 16 }}>{error}</div>;

  return (
    <div className={`${styles.popup} ${styles.itemsPopup}`}>
      <div className={styles.popupHeader}>
        <h2>Select Items</h2>
        <p style={{ fontSize: 13, color: '#666', margin: '6px 0 0 2px', fontWeight: 400 }}>
          Hassle-free cooking. Ingredient quantities and raw material details will be shared after booking.
        </p>
        <button
          className={styles.closeButton}
          onClick={() => setPopup("")}>
          <X size={20} />
        </button>
      </div>

      <div className={`${styles.popupContent} ${styles.scrollableContent}`}>
        {categories.map((category) => (
          <div key={category} className={styles.category}>
            <h3
              className={styles.categoryTitle}
              style={{
                cursor: "pointer",
                userSelect: "none",
                display: "flex",
                alignItems: "center",
                fontWeight: 700,
                background: "#f7f7fa",
                borderRadius: 8,
                padding: "10px 16px",
                marginBottom: 8,
                boxShadow: "0 1px 4px rgba(44,62,80,0.04)",
                fontSize: 18,
              }}
              onClick={() => setCollapsed(prev => ({ ...prev, [category]: !prev[category] }))}
            >
              <span style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                {COURSE_LABELS[category] || category}
                <span style={{ color: '#ff8c1a', fontWeight: 500, fontSize: 14, marginLeft: 8 }}>
                  (₹{COURSE_PRICES[COURSE_LABELS[category] || category] ?? 0})
                </span>
              </span>
              <span style={{ fontSize: 18, marginLeft: 8, transition: "transform 0.2s", transform: collapsed[category] ? "rotate(0deg)" : "rotate(180deg)" }}>
                ▼
              </span>
            </h3>
            {!collapsed[category] && (
              <div className={styles.itemsList}>
                {menuItems
                  .filter((item) => item.Course_Type === category)
                  .map((item) => (
                    <div
                      key={item._id}
                      className={styles.itemCard}
                      onClick={() => toggleItem(item)}
                    >
                      <div className={styles.itemInfo}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {item.Classification && item.Classification !== '-' && (
                            <span
                              style={{
                                display: "inline-block",
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: item.Classification === "Veg" ? "#43a047" : "#d32f2f",
                                border: "1.5px solid #888",
                              }}
                            />
                          )}
                          <span className={styles.itemName}>{item.Dish_Name}</span>
                        </div>
                        {((item.Cuisine && item.Cuisine !== '-') || item.Remarks) && (
                          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
                            {item.Cuisine && item.Cuisine !== '-' && <>{item.Cuisine}</>}
                            {item.Cuisine && item.Cuisine !== '-' && item.Remarks && <> | </>}
                            {item.Remarks && <span>{item.Remarks}</span>}
                          </div>
                        )}
                      </div>
                      <div
                        className={`${styles.checkbox} ${
                          selectedItems.some((i) => i._id === item._id)
                            ? styles.checked
                            : ""
                        }`}
                      >
                        {selectedItems.some((i) => i._id === item._id) && <Check size={16} />}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.popupFooter}>
        <div className={styles.selectedCount}>
          <div>
            <span>Soups: {courseCounts["Soups"] || 0}</span>
            <span style={{ marginLeft: 16 }}>Starters: {courseCounts["Starters"] || 0}</span>
            <span style={{ marginLeft: 16 }}>Main Course: {courseCounts["Main Course"] || 0}</span>
          </div>
          <div>
            <span>Sides: {courseCounts["Sides"] || 0}</span>
            <span style={{ marginLeft: 16 }}>Desserts: {courseCounts["Desserts"] || 0}</span>
            <span style={{ marginLeft: 16 }}>Beverages: {courseCounts["Beverages"] || 0}</span>
          </div>
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

export default ItemsPopup;
