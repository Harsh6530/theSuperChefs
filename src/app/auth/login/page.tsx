"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  loginSuccess,
  loginFailure,
  checkAuth,
} from "../../../../redux/auth/authSlice";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  interface RootState {
    auth: {
      isLoggedIn: boolean;
      token: string;
      user: {
        name: string;
        email: string;
        mobile: string;
      };
    };
  }

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const hasPushed = useRef(false);

  if (isLoggedIn && typeof window !== "undefined" && !hasPushed.current) {
    hasPushed.current = true;
    Promise.resolve().then(() => {
      router.push("/");
    });
  }

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        dispatch(
          loginSuccess({
            token: data.token,
            user: {
              name: data.name,
              email: data.email,
              mobile: data.mobile,
            },
          })
        );
        router.push("/book");
      } else {
        dispatch(loginFailure(data));
        alert(data.message);
      }
    } catch (error) {
      dispatch(loginFailure(error));
      alert("An error occurred. Please try again.");
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleLogin(email, password);
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

        <h1 className={styles.title}>Login to your account</h1>

        <form
          className={styles.form}
          onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label
              htmlFor="email"
              className={styles.label}>
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
              type="password"
              className={styles.input}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          <div className={styles.forgotPassword}>
            <Link href="/auth/forgot-password">Forgot password?</Link>
          </div>

          <button
            type="submit"
            className={styles.submitButton}>
            Login
          </button>
        </form>

        <div className={styles.footer}>
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className={styles.link}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
