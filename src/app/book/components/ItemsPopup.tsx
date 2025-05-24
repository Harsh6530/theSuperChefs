"use client";

import type React from "react";
import { useState } from "react";
import styles from "../styles/popup.module.css";
import { X, Check } from "lucide-react";
import { useContext } from "react";
import { dataContext } from "@/app/context/dataContext";

interface Item {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface ItemsPopupProps {
  setPopup: (value: string) => void;
  selectedItems: Item[];
  onItemsSelected: (items: Item[]) => void;
}

const ItemsPopup: React.FC<ItemsPopupProps> = ({
  setPopup,
  selectedItems,
  onItemsSelected,
}) => {
  const { itemsData, setItemsData } = useContext(dataContext);
  const menuItems: Item[] = [
    // Starters
    { id: 1, name: "Paneer Tikka", price: 299, category: "Starters" },
    { id: 2, name: "Veg Spring Rolls", price: 249, category: "Starters" },
    { id: 3, name: "Chicken Wings", price: 349, category: "Starters" },
    { id: 4, name: "Mushroom Chilli", price: 279, category: "Starters" },
    { id: 5, name: "Crispy Corn", price: 229, category: "Starters" },

    // Main Course
    { id: 6, name: "Butter Chicken", price: 399, category: "Main Course" },
    {
      id: 7,
      name: "Paneer Butter Masala",
      price: 349,
      category: "Main Course",
    },
    { id: 8, name: "Dal Makhani", price: 299, category: "Main Course" },
    { id: 9, name: "Veg Biryani", price: 329, category: "Main Course" },
    { id: 10, name: "Chicken Biryani", price: 399, category: "Main Course" },

    // Breads
    { id: 11, name: "Butter Naan", price: 49, category: "Breads" },
    { id: 12, name: "Garlic Naan", price: 59, category: "Breads" },
    { id: 13, name: "Tandoori Roti", price: 39, category: "Breads" },
    { id: 14, name: "Laccha Paratha", price: 69, category: "Breads" },

    // Desserts
    { id: 15, name: "Gulab Jamun", price: 149, category: "Desserts" },
    { id: 16, name: "Chocolate Brownie", price: 199, category: "Desserts" },
    { id: 17, name: "Ice Cream", price: 129, category: "Desserts" },
    { id: 18, name: "Rasmalai", price: 179, category: "Desserts" },

    // Beverages
    { id: 19, name: "Fresh Lime Soda", price: 99, category: "Beverages" },
    { id: 20, name: "Cold Coffee", price: 149, category: "Beverages" },
    { id: 21, name: "Masala Chai", price: 79, category: "Beverages" },
    { id: 22, name: "Fresh Fruit Juice", price: 129, category: "Beverages" },
  ];

  const categories = [...new Set(menuItems.map((item) => item.category))];

  const [selected, setSelected] = useState<Item[]>(selectedItems || []);

  const toggleItem = (item: Item) => {
    if (selected.some((i) => i.id === item.id)) {
      setSelected(selected.filter((i) => i.id !== item.id));
      setItemsData(selected.filter((i) => i.id !== item.id));
    } else {
      setSelected([...selected, item]);
      setItemsData([...selected, item]);
    }
  };

  const handleDone = () => {
    onItemsSelected(selected);
    setPopup("");
  };

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
          <div
            key={category}
            className={styles.category}>
            <h3 className={styles.categoryTitle}>{category}</h3>
            <div className={styles.itemsList}>
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <div
                    key={item.id}
                    className={styles.itemCard}
                    onClick={() => toggleItem(item)}>
                    <div className={styles.itemInfo}>
                      <div className={styles.itemName}>{item.name}</div>
                      <div className={styles.itemPrice}>₹{item.price}</div>
                    </div>
                    <div
                      className={`${styles.checkbox} ${
                        selected.some((i) => i.id === item.id)
                          ? styles.checked
                          : ""
                      }`}>
                      {selected.some((i) => i.id === item.id) && (
                        <Check size={16} />
                      )}
                    </div>
                  </div>
                ))}
            </div>
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
