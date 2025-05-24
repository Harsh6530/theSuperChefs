"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import styles from "./RightSidebar.module.css"
import { X, Mail, Phone, ShoppingBag, Settings, LogOut, ChevronRight } from "lucide-react"

interface RightSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter()

  const handleOrdersClick = () => {
    router.push("/orders")
    onClose()
  }

  const handleSettingsClick = () => {
    router.push("/settings")
    onClose()
  }

  const handleLogoutClick = () => {
    alert("Logout functionality would be implemented here")
    onClose()
  }

  const credentialsString = localStorage.getItem("Credentials");
  const userData = credentialsString? JSON.parse(credentialsString) : {}

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        {/* Header */}
        <div className={styles.header}>
          <h2>Profile</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Profile Section */}
        <div className={styles.profileSection}>
          <div className={styles.avatarContainer}>
            <img src={userData.avatar || "/placeholder.svg"} alt="Profile" className={styles.avatar} />
          </div>

          <div className={styles.userInfo}>
            <h3 className={styles.userName}>{userData.name}</h3>

            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>{userData.email}</span>
              </div>

              <div className={styles.contactItem}>
                <Phone size={16} />
                <span>{userData.mobile}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Options */}
        <div className={styles.menuSection}>
          <div className={styles.menuItem} onClick={handleOrdersClick}>
            <div className={styles.menuItemContent}>
              <ShoppingBag size={20} />
              <span>My Orders</span>
            </div>
            <ChevronRight size={16} />
          </div>

          <div className={styles.menuItem} onClick={handleLogoutClick}>
            <div className={styles.menuItemContent}>
              <LogOut size={20} />
              <span>Logout</span>
            </div>
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </>
  )
}

export default RightSidebar
