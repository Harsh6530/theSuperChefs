"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./RightSidebar.module.css";
import { useDispatch } from "react-redux";
import { logout } from "@/../redux/auth/authSlice";

import {
  X,
  Mail,
  Phone,
  ShoppingBag,
  LogOut,
  ChevronRight,
} from "lucide-react";

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  name?: string;
  email?: string;
  mobile?: string;
  avatar?: string;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({});

  useEffect(() => {
    const credentialsString = localStorage.getItem("Credentials");
    try {
      const parsed = credentialsString ? JSON.parse(credentialsString) : {};
      setUserData(parsed);
    } catch (err) {
      console.error("Failed to parse credentials:", err);
    }
  }, []);

  const handleOrdersClick = () => {
    router.push("/orders");
    onClose();
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    localStorage.clear();
    onClose();
    router.push("/");
  };

  return (
    <>
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={onClose}
        />
      )}

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        {/* Header */}
        <div className={styles.header}>
          <h2>Profile</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Profile Section */}
        <div className={styles.profileSection}>
          <div className={styles.avatarContainer}>
            {userData.avatar ? (
            <img
                src={userData.avatar}
              alt="Profile"
              className={styles.avatar}
            />
            ) : (
              <div className={styles.avatarFallback}>
                {(userData.name?.[0] || "U").toUpperCase()}
              </div>
            )}
          </div>

          <div className={styles.userInfo}>
            <h3 className={styles.userName}>{userData.name || "Guest"}</h3>

            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>{userData.email || "Not available"}</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={16} />
                <span>{userData.mobile || "Not available"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Options */}
        <div className={styles.menuSection}>
          <div
            className={styles.menuItem}
            onClick={handleOrdersClick}>
            <div className={styles.menuItemContent}>
              <ShoppingBag size={20} />
              <span>My Orders</span>
            </div>
            <ChevronRight size={16} />
          </div>

          <div
            className={styles.menuItem}
            onClick={handleLogoutClick}>
            <div className={styles.menuItemContent}>
              <LogOut size={20} />
              <span>Logout</span>
            </div>
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
