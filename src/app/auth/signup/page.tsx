"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./signup.module.css";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      number: "",
      email: "",
      password: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.number.trim()) {
      newErrors.number = "Phone number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.number)) {
      newErrors.number = "Phone number must be 10 digits";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        router.push("/auth/login");
      } else {
        console.error("Signup failed", data);
        alert(data.message);
        setErrors({
          name: data.errors?.name || "",
          number: data.errors?.number || "",
          email: data.errors?.email || "",
          password: data.errors?.password || "",
        });
      }
    } catch (error) {
      console.error("An error occurred during signup", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleSignup();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <div className={styles.logo}>
              <Image
                src="/logo.png"
                alt="ChefKart Logo"
                width={200}
                height={40}
              />
            </div>
          </Link>
        </div>

        <h1 className={styles.title}>Create your account</h1>

        <form
          className={styles.form}
          onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label
              htmlFor="name"
              className={styles.label}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={styles.input}
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label
              htmlFor="number"
              className={styles.label}>
              Phone Number
            </label>
            <input
              id="number"
              name="number"
              type="tel"
              className={styles.input}
              placeholder="Enter your phone number"
              value={formData.number}
              onChange={handleChange}
            />
            {errors.number && (
              <span className={styles.error}>{errors.number}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label
              htmlFor="email"
              className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.input}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label
              htmlFor="password"
              className={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={styles.input}
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}>
            Sign Up
          </button>
        </form>

        <div className={styles.footer}>
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className={styles.link}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
