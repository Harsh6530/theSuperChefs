"use client";
import { createContext } from "react";
import { useEffect, useState } from "react";

export const dataContext = createContext();

export const DataStateProvider = ({ children }) => {
  const [itemsData, setItemsData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [guestsData, setGuestsData] = useState({ adults: 0, children: 0 });
  const [dateTime, setDateTime] = useState({ date: "", time: "" });

  return (
    <dataContext.Provider
      value={{
        setItemsData,
        setTotalData,
        setGuestsData,
        itemsData,
        totalData,
        guestsData,
        dateTime,
        setDateTime
      }}>
      {children}
    </dataContext.Provider>
  );
};
