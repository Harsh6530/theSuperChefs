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
  selectedItems: MenuItem[];
  onItemsSelected: (items: MenuItem[]) => void;
}

const ItemsPopup: React.FC<ItemsPopupProps> = ({
  setPopup,
  selectedItems,
  onItemsSelected,
}) => {
  const { itemsData, setItemsData } = useContext(dataContext);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<MenuItem[]>(selectedItems || []);
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
    if (selected.some((i) => i._id === item._id)) {
      setSelected(selected.filter((i) => i._id !== item._id));
      setItemsData(selected.filter((i) => i._id !== item._id));
    } else {
      setSelected([...selected, item]);
      setItemsData([...selected, item]);
    }
  };

  const handleDone = () => {
    onItemsSelected(selected);
    setPopup("");
  };

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div style={{ color: 'red', padding: 16 }}>{error}</div>;

  return (
    <div className={`${styles.popup} ${styles.itemsPopup}`}>
      <div className={styles.popupHeader}>
        <h2>Select Items</h2>
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
              <span style={{ flex: 1 }}>{category}</span>
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
                          selected.some((i) => i._id === item._id)
                            ? styles.checked
                            : ""
                        }`}
                      >
                        {selected.some((i) => i._id === item._id) && <Check size={16} />}
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
          {selected.length} items selected
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
