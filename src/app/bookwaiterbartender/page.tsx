"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./styles/bookwaiterandbartender.module.css";
import DateSelector from "./components/DateSelector";
import TimeSelector from "./components/TimeSelector";
import CouponSection from "./components/CouponSection";
import SummaryFooter from "./components/SummaryFooter";
import { checkAuth } from "../../../redux/auth/authSlice";
import DetailsPopup from "./components/DetailsPopup";
import TimePopup from "./components/TimePopup";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  setDate,
  setTime,
  setNumWaiters,
  setNumBartenders,
  setCoupon,
  setCouponApplied,
  setCity,
  setAddress,
  setRemarks,
  setTotalAmount,
  setBookingFee,
  resetBooking,
} from "../../../redux/booking/waiterBartenderBookingSlice";
import CityPopup from "./components/CityPopup";
import CouponPopup from "./components/CouponPopup";
import WaiterBartenderPopup from "./components/WaiterBartenderPopup";
import AddressPopup from "./components/AddressPopup";
import ReduxProvider from "../../../redux/ReduxProvider";
import { X } from "lucide-react";
import { ArrowLeft } from "lucide-react";
const PageContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [popup, setPopup] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  interface RootState {
    auth: {
      isLoggedIn: boolean;
      token: string;
      user: {
        name: string;
        email: string;
        phone: string;
      };
    };
    booking: {
      date: {
        day: string;
        month: string;
        dateNum: number;
      };
      time: string;
      numWaiters: number;
      numBartenders: number;
      coupon: string;
      couponApplied: boolean;
      city: string;
      address: string;
      remarks: string;
      totalAmount: number;
    };
  }

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const hasPushed = useRef(false);

  if (!isLoggedIn && typeof window !== "undefined" && !hasPushed.current) {
    hasPushed.current = true;
    Promise.resolve().then(() => {
      router.push("/auth/login");
    });
  }

  const booking = useSelector(
    (state: RootState) => state.waiterBartenderBooking
  );

  // Handlers for popups
  const handleProceed = () => {
    setPopup("address");
  };

  const handleRemoveCoupon = () => {
    dispatch(setCoupon(""));
    dispatch(setCouponApplied(false));
  };

  const CITIES = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Noida",
    "Gurgaon",
    "Ghaziabad",
    "Faridabad",
    "Gr Noida",
  ];

  // Calculate total
  const WAITER_PRICE = 1499;
  const BARTENDER_PRICE = 2499;
  const BASE_PRICE = 999;
  let total =
    BASE_PRICE +
    booking.numWaiters * WAITER_PRICE +
    booking.numBartenders * BARTENDER_PRICE;
  let discount = booking.couponApplied ? Math.round(total * 0.15) : 0;
  const finalTotal = total - discount;

  // Update total in Redux
  useEffect(() => {
    dispatch(setTotalAmount(finalTotal));
  }, [booking.numWaiters, booking.numBartenders, booking.couponApplied, finalTotal, dispatch]);

  return (
    <div
      className={styles.container}
      style={{ margin: "32px 0" }}>
      <div className={styles.wrapper}>
        <div className={styles.white_bg}>
          <header className={styles.header}>
            <button
              className={styles.backButton}
              onClick={() => router.back()}>
              <ArrowLeft size={20} />
            </button>
            <p>Booking Details</p>
          </header>
          <div className={styles.content}>
            <DateSelector
              selectedDate={booking.date}
              setSelectedDate={(d) => dispatch(setDate(d))}
            />
            <TimeSelector
              selectedTime={booking.time}
              setSelectedTime={(t) => dispatch(setTime(t))}
              onClick={() => setPopup("time")}
            />
            <div className={styles.selection}>
              <label>City</label>
              <select
                name="city"
                className={styles.selector}
                value={booking.city}
                onChange={(e) => {
                  const selectedCity = e.target.value;
                  dispatch(setCity(selectedCity));
                }}>
                <option
                  value=""
                  disabled>
                  Select a city
                </option>
                {CITIES.map((city, index) => (
                  <option
                    key={index}
                    value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.selection}>
              <label className={`mt-1 `}>Select Waiters and Bartenders</label>
              <button
                onClick={() => setPopup("waiterbartender")}
                className={` ${styles.selector}`}>{`${booking.numWaiters} Waiters, ${booking.numBartenders} Bartenders`}</button>
            </div>
            <div className={styles.selection}>
              <label>Coupon</label>
              <div className={styles.couponContainer}>
                {booking.coupon ? (
                  <div className={styles.appliedCoupon}>
                    <span>{booking.coupon}</span>
                    <button
                      onClick={handleRemoveCoupon}
                      className={styles.removeCoupon}>
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setPopup("coupon")}
                    className={styles.selector}>
                    Apply Coupon
                  </button>
                )}
              </div>
            </div>
          </div>
          <SummaryFooter
            numWaiters={booking.numWaiters}
            numBartenders={booking.numBartenders}
            couponApplied={booking.couponApplied}
            onBook={handleProceed}
          />
          {popup === "city" && (
            <CityPopup
              setPopup={setPopup}
              selectedCity={booking.city}
              setSelectedCity={(c) => {
                dispatch(setCity(c));
                setPopup("");
              }}
            />
          )}
          {popup === "waiterbartender" && (
            <WaiterBartenderPopup
              setPopup={setPopup}
              numWaiters={booking.numWaiters}
              setNumWaiters={(n) => dispatch(setNumWaiters(n))}
              numBartenders={booking.numBartenders}
              setNumBartenders={(n) => dispatch(setNumBartenders(n))}
            />
          )}
          {popup === "coupon" && (
            <CouponPopup
              setPopup={setPopup}
              coupon={booking.coupon}
              setCoupon={(c) => dispatch(setCoupon(c))}
              couponApplied={booking.couponApplied}
              setCouponApplied={(v) => dispatch(setCouponApplied(v))}
            />
          )}
          {popup === "address" && (
            <AddressPopup
              setPopup={setPopup}
              setShowDetails={setShowDetails}
              address={booking.address}
              setAddress={(a) => dispatch(setAddress(a))}
              remarks={booking.remarks}
              setRemarks={(r) => dispatch(setRemarks(r))}
            />
          )}
          {showDetails && (
            <DetailsPopup
              setPopup={() => setShowDetails(false)}
              numWaiters={booking.numWaiters}
              numBartenders={booking.numBartenders}
              couponApplied={booking.couponApplied}
              selectedDate={booking.date}
              selectedTime={booking.time}
              city={booking.city}
              address={booking.address}
              remarks={booking.remarks}
              totalAmount={finalTotal}
            />
          )}
          {popup === "time" && (
            <TimePopup
              setPopup={setPopup}
              selectedTime={booking.time}
              setSelectedTime={(t) => dispatch(setTime(t))}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Page = () => (
  <ReduxProvider>
    <PageContent />
  </ReduxProvider>
);

export default Page;
