"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import styles from "./forgot-password.module.css"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [errors, setErrors] = useState({ email: "", number: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    let valid = true
    const newErrors = { email: "", number: "" }

    if (!email) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
      valid = false
    }

    if (!number) {
      newErrors.number = "Phone number is required"
      valid = false
    } else if (!/^\d{10}$/.test(number)) {
      newErrors.number = "Phone number must be 10 digits"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Handle password reset logic here
      console.log("Password reset form submitted", { email, number })
      setIsSubmitted(true)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <div className={styles.logo}>
              <Image src="/logo.png" alt="ChefKart Logo" width={200} height={40} />
            </div>
          </Link>
        </div>

        {!isSubmitted ? (
          <>
            <h1 className={styles.title}>Forgot Password</h1>
            <p className={styles.subtitle}>Enter your email and phone number to reset your password</p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="number" className={styles.label}>
                  Phone Number
                </label>
                <input
                  id="number"
                  type="tel"
                  className={styles.input}
                  placeholder="Enter your phone number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
                {errors.number && <span className={styles.error}>{errors.number}</span>}
              </div>

              <button type="submit" className={styles.submitButton}>
                Reset Password
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successMessage}>
            <h1 className={styles.title}>Check Your Email</h1>
            <p className={styles.subtitle}>
              We&apos;ve sent password reset instructions to your email. Please check your inbox.
            </p>
          </div>
        )}

        <div className={styles.footer}>
          Remember your password?{" "}
          <Link href="/auth/login" className={styles.link}>
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
