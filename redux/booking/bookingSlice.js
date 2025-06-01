import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guests: { adults: 0, children: 0 },
  selectedItems: [],
  city: "",
  address: "",
  remarks: "",
  coupon: "",
  waiterCount: 0,
  bartenderCount: 0,
  selectedDate: 0,
  selectedTime: "",
  landmark: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setGuests: (state, action) => { state.guests = action.payload; },
    setSelectedItems: (state, action) => { state.selectedItems = action.payload; },
    setCity: (state, action) => { state.city = action.payload; },
    setAddress: (state, action) => { state.address = action.payload; },
    setRemarks: (state, action) => { state.remarks = action.payload; },
    setCoupon: (state, action) => { state.coupon = action.payload; },
    setWaiterCount: (state, action) => { state.waiterCount = action.payload; },
    setBartenderCount: (state, action) => { state.bartenderCount = action.payload; },
    setSelectedDate: (state, action) => { state.selectedDate = action.payload; },
    setSelectedTime: (state, action) => { state.selectedTime = action.payload; },
    setLandmark: (state, action) => { state.landmark = action.payload; },
    resetBooking: () => initialState,
  },
});

export const {
  setGuests, setSelectedItems, setCity, setAddress, setRemarks, setCoupon,
  setWaiterCount, setBartenderCount, setSelectedDate, setSelectedTime, setLandmark, resetBooking
} = bookingSlice.actions;

export default bookingSlice.reducer; 