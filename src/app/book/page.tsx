"use client";

import { useEffect, useState } from "react";
import styles from "./book.module.css";
import MembersPopup from "./components/MembersPopup";
import ItemsPopup from "./components/ItemsPopup";
import DetailsPopup from "./components/DetailsPopup";
import TimePopup from "./components/TimePopup";
import { ArrowLeft, ChevronDown, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "../../../redux/auth/authSlice";

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
  }

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    router.push("/auth/login");
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
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const totalGuests = guests.adults + guests.children;

  const handleItemSelection = (items) => {
    setSelectedItems(items);
    const itemsTotal = items.reduce((sum, item) => sum + item.price, 0);
    setTotalAmount(0 + itemsTotal);
  };

  const user = useSelector((state: RootState) => state.auth.user);

  const handleCreateOrder = async () => {
    const orderData = {
      user: user.name,
      date: dates[selectedDate],
      time: selectedTime,
      members: {
        adults: guests.adults,
        children: guests.children,
      },
      items: selectedItems,
      mobile: user.phone,
      total: totalAmount,
    };

    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderData }),
    });

    const data = await response.json();

    if (!data?.success) {
      console.error("Failed to create order");
      return;
    }

    alert("Order created successfully");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      selectedDate === null ||
      selectedTime === "" ||
      totalGuests === 0 ||
      selectedItems.length === 0
    ) {
      alert("Please fill all the details");
      return;
    }
    handleCreateOrder();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.white_bg}>
          <header className={styles.header}>
            <button className={styles.backButton}>
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
                    onClick={() => setSelectedDate(index)}>
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
              <p className={styles.amount}>₹ {totalAmount}</p>
              <p className={styles.payableText}>
                Payable Amount{" "}
                <span
                  className={styles.detailsLink}
                  onClick={() => setPopup("details")}>
                  (DETAILS)
                </span>
              </p>
            </div>
            <button className={styles.continueButton}>Continue</button>
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
              selectedItems={selectedItems}
              onItemsSelected={handleItemSelection}
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
              selectedItems={selectedItems}
              totalAmount={totalAmount}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
