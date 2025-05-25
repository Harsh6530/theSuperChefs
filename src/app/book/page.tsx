"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./book.module.css";
import MembersPopup from "./components/MembersPopup";
import ItemsPopup from "./components/ItemsPopup";
import DetailsPopup from "./components/DetailsPopup";
import TimePopup from "./components/TimePopup";
import { ArrowLeft, ChevronDown, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "../../../redux/auth/authSlice";
import { dataContext } from "../context/dataContext";
import { useContext } from "react";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { totalData, setTotalData, dateTime, setDateTime } =
    useContext(dataContext);

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
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [guests, setGuests] = useState({ adults: 0, children: 0 });
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const totalGuests = guests.adults + guests.children;

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
    new Map(selectedItems.map(item => [item._id, item])).values()
  );

  // Calculate course totals
  const courseCounts: Record<string, number> = {};
  uniqueSelectedItems.forEach(item => {
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
  const guestsTotal = guests.adults * ADULT_PRICE + guests.children * CHILD_PRICE;

  // Calculate final total (excluding booking fee)
  const somethingSelected = totalGuests > 0 || uniqueSelectedItems.length > 0;
  const totalAmount = somethingSelected ? BASE_PRICE + guestsTotal + itemsTotal : 0;

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
    setSelectedDate(index);
    setDateTime({ ...dateTime, date: dates[index] });
  };

  const validator = () => {
    if (
      selectedDate === null ||
      selectedTime === "" ||
      totalGuests === 0 ||
      selectedItems.length === 0
    ) {
      alert("Please fill all the details");
      return;
    }
    setPopup("details");
  };

  useEffect(() => {
    setDateTime({ ...dateTime, date: dates[0] });
  }, []);

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
                      selectedDate === index ? styles.selected : ""
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
                <label>Party Time</label>
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
                    {totalGuests > 0
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
            </div>
          </div>

          <footer className={styles.footer}>
            <div className={styles.info}>
              {somethingSelected && <>
                <p className={styles.amount}>₹ {totalAmount}</p>
                <p className={styles.payableText}>Payable Amount </p>
              </>}
            </div>
            <button
              className={styles.continueButton}
              onClick={() => validator()}
              disabled={!somethingSelected}
            >
              Book
            </button>
          </footer>

          {popup === "members" && (
            <MembersPopup
              setPopup={setPopup}
              guests={guests}
              setGuests={setGuests}
            />
          )}

          {popup === "items" && (
            <ItemsPopup
              setPopup={setPopup}
              selectedItems={selectedItems as any}
              onItemsSelected={setSelectedItems as any}
            />
          )}

          {popup === "time" && (
            <TimePopup
              setPopup={setPopup}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          )}

          {popup === "details" && (
            <DetailsPopup
              setPopup={setPopup}
              guests={guests}
              selectedItems={uniqueSelectedItems}
              totalAmount={totalAmount}
              courseCounts={courseCounts}
              guestsTotal={guestsTotal}
              itemsTotal={itemsTotal}
              BASE_PRICE={BASE_PRICE}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;