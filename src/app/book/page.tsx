"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./book.module.css";
import MembersPopup from "./components/MembersPopup";
import ItemsPopup from "./components/ItemsPopup";
import DetailsPopup from "./components/DetailsPopup";
import TimePopup from "./components/TimePopup";
import CityPopup from "./components/CityPopup";
import { ArrowLeft, ChevronDown, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "../../../redux/auth/authSlice";
import WaiterBartenderPopup from "./components/WaiterBartenderPopup";
import CouponPopup from "./components/CouponPopup";
import AddressPopup from "./components/AddressPopup";
import {
  setGuests,
  setSelectedItems,
  setCity,
  setAddress,
  setRemarks,
  setCoupon,
  setWaiterCount,
  setBartenderCount,
  setSelectedDate,
  setSelectedTime,
} from "../../../redux/booking/bookingSlice";
import React from "react";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

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
    booking: any;
  }

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const currentDate = new Date();
  const dates = [1, 2, 3, 4, 5].map((index) => {
    const temp_date = new Date(currentDate);
    temp_date.setDate(temp_date.getDate() + index);
    const day = temp_date
      .toLocaleDateString("en-Us", { weekday: "long" })
      .slice(0, 3);
    const month = temp_date
      .toLocaleString("en-US", { month: "long" })
      .slice(0, 3);
    const dateNum = temp_date.getDate();

    return {
      day,
      month,
      dateNum,
    };
  });

  const [popup, setPopup] = useState("");

  const {
    guests,
    selectedItems,
    city,
    address,
    remarks,
    coupon,
    waiterCount,
    bartenderCount,
    selectedDate,
    selectedTime,
  } = useSelector((state: RootState) => state.booking);

  interface MenuItem {
    _id: string;
    Course_Type: string;
    Classification: string;
    Cuisine: string;
    Dish_Name: string;
    Remarks?: string;
  }

  // Pricing constants
  const BASE_PRICE = 999;
  const ADULT_PRICE = 100;
  const CHILD_PRICE = 75;
  const COURSE_PRICES: Record<string, number> = {
    Starters: 299,
    "Main Course": 299,
    Sides: 149,
    Desserts: 299,
    Beverages: 149,
    Soups: 149,
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

  // Deduplicate selectedItems by _id
  const uniqueSelectedItems = Array.from(
    new Map(selectedItems.map((item) => [item._id, item])).values()
  );

  // Calculate course totals
  const courseCounts: Record<string, number> = {};
  uniqueSelectedItems.forEach((item) => {
    // Normalize the course name
    const course = COURSE_LABELS[item.Course_Type] || item.Course_Type;
    courseCounts[course] = (courseCounts[course] || 0) + 1;
  });

  // Calculate items total
  let itemsTotal = 0;
  Object.entries(courseCounts).forEach(([course, count]) => {
    const price = COURSE_PRICES[course] || 0;
    itemsTotal += count * price;
  });

  // Calculate guests total
  const guestsTotal =
    guests.adults * ADULT_PRICE + guests.children * CHILD_PRICE;

  const user = useSelector((state: RootState) => state.auth.user);

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const hasPushed = useRef(false);

  if (!isLoggedIn && typeof window !== "undefined" && !hasPushed.current) {
    hasPushed.current = true;
    Promise.resolve().then(() => {
      router.push("/auth/login");
    });
  }

  const selectDate = (index: number) => {
    dispatch(setSelectedDate(dates[index]));
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
  const WAITER_PRICE = 1500;
  const BARTENDER_PRICE = 2000;

  // Add waiter and bartender total
  const waiterTotal = waiterCount * WAITER_PRICE;
  const bartenderTotal = bartenderCount * BARTENDER_PRICE;
  // Calculate final total (excluding booking fee)
  const somethingSelected = guestsTotal > 0 || uniqueSelectedItems.length > 0;
  const totalAmount = somethingSelected
    ? BASE_PRICE + guestsTotal + itemsTotal + waiterTotal + bartenderTotal
    : 0;

  // Calculate discount if coupon is applied
  const COUPON_CODE = "WELCOME15";
  const COUPON_DISCOUNT = 0.15;
  const isCouponApplied = coupon === COUPON_CODE;
  const discountAmount = isCouponApplied
    ? Math.round(totalAmount * COUPON_DISCOUNT)
    : 0;
  const discountedTotal = isCouponApplied
    ? totalAmount - discountAmount
    : totalAmount;

  const [showDetails, setShowDetails] = useState(false);

  const validator = () => {
    if (
      selectedDate === null ||
      selectedTime === "" ||
      guestsTotal === 0 ||
      selectedItems.length === 0 ||
      !city
    ) {
      alert("Please fill all the details");
      return;
    }
    setPopup("address");
  };

  const booking = useSelector((state: RootState) => state.booking);

  // Sync local address/remarks with Redux after AddressPopup
  React.useEffect(() => {
    if (showDetails) {
      setAddress(booking.address || "");
      setRemarks(booking.remarks || "");
    }
  }, [showDetails, booking.address, booking.remarks]);

  console.log(selectedItems);

  return (
    <div className={styles.container}>
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
            <div className={styles.date}>
              <p className={styles.date_head}>Select your party date</p>
              <ul className={styles.dates}>
                {dates.map((elem, index) => (
                  <li
                    className={`${styles.date_element} ${
                      JSON.stringify(selectedDate) ===
                      JSON.stringify(dates[index])
                        ? styles.selected
                        : ""
                    }`}
                    key={index}
                    onClick={() => {
                      selectDate(index);
                    }}>
                    <p>{elem.month}</p>
                    <p className={styles.dateNum}>{elem.dateNum}</p>
                    <p>{elem.day}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.selectionContainer}>
              <div className={styles.selection}>
                <label>Serving Time</label>
                <button
                  className={styles.selector}
                  onClick={() => setPopup("time")}>
                  <p>{selectedTime ? selectedTime : "Select Time"}</p>
                  <Clock size={20} />
                </button>
              </div>

              <div className={styles.selection}>
                <label>Number of People</label>
                <button
                  className={styles.selector}
                  onClick={() => setPopup("members")}>
                  <p>
                    {guestsTotal > 0
                      ? `${guests.adults} Adults, ${guests.children} Children`
                      : "Select Members"}
                  </p>
                  <ChevronDown size={20} />
                </button>
              </div>

              <div className={styles.selection}>
                <label>Items</label>
                <button
                  className={styles.selector}
                  onClick={() => setPopup("items")}>
                  <p>
                    {selectedItems.length > 0
                      ? `${selectedItems.length} items selected`
                      : "Select Items"}
                  </p>
                  <ChevronDown size={20} />
                </button>
              </div>

              <div className={styles.selection}>
                <label>City</label>
                <select
                  name="city"
                  className={styles.selector}
                  value={city}
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
                <label>Waiters & Bartenders</label>
                <button
                  className={styles.selector}
                  type="button"
                  onClick={() => setPopup("waiterbartender")}
                  style={{ justifyContent: "space-between" }}>
                  <span>
                    {waiterCount > 0 || bartenderCount > 0
                      ? `${waiterCount} Waiter${
                          waiterCount !== 1 ? "s" : ""
                        }, ${bartenderCount} Bartender${
                          bartenderCount !== 1 ? "s" : ""
                        }`
                      : "Select Waiters & Bartenders"}
                  </span>
                  <ChevronDown size={20} />
                </button>
              </div>

              <div className={styles.selection}>
                <label>Coupon</label>
                {coupon ? (
                  <div
                    style={{
                      background:
                        "linear-gradient(90deg, #ff9800 0%, #ff4d4f 100%)",
                      color: "#fff",
                      borderRadius: "8px",
                      padding: "10px 18px",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      letterSpacing: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 8,
                      width: "100%",
                      boxSizing: "border-box",
                      minHeight: 44,
                      gap: 8,
                    }}>
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                      {coupon}
                    </span>
                    <button
                      style={{
                        background: "#fff",
                        color: "#ff4d4f",
                        border: "none",
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: 12,
                        padding: "2px 12px",
                        cursor: "pointer",
                        marginLeft: 12,
                      }}
                      onClick={() => setCoupon("")}>
                      Remove
                    </button>
                  </div>
                ) : null}
                <button
                  className={styles.selector}
                  type="button"
                  onClick={() => setPopup("coupon")}
                  style={{
                    justifyContent: "space-between",
                    marginTop: coupon ? 8 : 0,
                  }}>
                  <span>{coupon ? "Change Coupon" : "Apply Coupon"}</span>
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>
          </div>

          <footer className={styles.footer}>
            <div className={styles.info}>
              {somethingSelected && (
                <>
                  {isCouponApplied ? (
                    <>
                      <p className={styles.amount}>
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "#888",
                            fontWeight: 400,
                            fontSize: "1.1rem",
                            marginRight: 8,
                          }}>
                          ₹ {totalAmount}
                        </span>
                        <span
                          style={{
                            color: "#ff4d4f",
                            fontWeight: 700,
                            fontSize: "1.3rem",
                          }}>
                          ₹ {discountedTotal}
                        </span>
                      </p>
                      <p className={styles.payableText}>
                        You save{" "}
                        <span style={{ color: "#ff9800", fontWeight: 700 }}>
                          ₹ {discountAmount}
                        </span>{" "}
                        with coupon!
                      </p>
                    </>
                  ) : (
                    <>
                      <p className={styles.amount}>₹ {totalAmount}</p>
                      <p className={styles.payableText}>Payable Amount </p>
                    </>
                  )}
                </>
              )}
            </div>
            <button
              className={styles.continueButton}
              onClick={() => validator()}
              disabled={!somethingSelected}>
              Proceed
            </button>
          </footer>

          {popup === "members" && (
            <MembersPopup
              setPopup={setPopup}
              guests={guests}
              setGuests={(guests) => dispatch(setGuests(guests))}
            />
          )}

          {popup === "items" && (
            <ItemsPopup
              setPopup={setPopup}
              selectedItems={selectedItems}
              onItemsSelected={(items) => dispatch(setSelectedItems(items))}
            />
          )}

          {popup === "time" && (
            <TimePopup
              setPopup={setPopup}
              selectedTime={selectedTime}
              setSelectedTime={(time) => dispatch(setSelectedTime(time))}
            />
          )}

          {popup === "address" && (
            <AddressPopup
              setPopup={setPopup}
              setShowDetails={setShowDetails}
            />
          )}

          {showDetails && (
            <DetailsPopup
              setPopup={() => setShowDetails(false)}
              guests={guests}
              selectedItems={uniqueSelectedItems}
              totalAmount={discountedTotal}
              courseCounts={courseCounts}
              guestsTotal={guestsTotal}
              itemsTotal={itemsTotal}
              BASE_PRICE={BASE_PRICE}
              city={city}
              waiterCount={waiterCount}
              bartenderCount={bartenderCount}
              waiterTotal={waiterTotal}
              bartenderTotal={bartenderTotal}
              coupon={coupon}
              address={address}
              remarks={remarks}
            />
          )}

          {popup === "city" && (
            <CityPopup
              setPopup={setPopup}
              selectedCity={city}
              setSelectedCity={setCity}
              cities={CITIES}
            />
          )}

          {popup === "waiterbartender" && (
            <WaiterBartenderPopup
              setPopup={setPopup}
              waiterCount={waiterCount}
              setWaiterCount={(count) => dispatch(setWaiterCount(count))}
              bartenderCount={bartenderCount}
              setBartenderCount={(count) => dispatch(setBartenderCount(count))}
              WAITER_PRICE={WAITER_PRICE}
              BARTENDER_PRICE={BARTENDER_PRICE}
            />
          )}

          {popup === "coupon" && (
            <CouponPopup
              setPopup={setPopup}
              coupon={coupon}
              setCoupon={(coupon) => dispatch(setCoupon(coupon))}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
