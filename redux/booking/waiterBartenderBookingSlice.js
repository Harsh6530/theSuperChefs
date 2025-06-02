import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: {
    day:String,
    month:String,
    dateNum:Number
  },
  time: "",
  numWaiters: 0,
  numBartenders: 0,
  coupon: "",
  couponApplied: false,
  city: "",
  address: "",
  remarks: "",
  totalAmount: 0,
  bookingFee: 199,
  paymentStatus: "pending",
};

const waiterBartenderBookingSlice = createSlice({
  name: "waiterBartenderBooking",
  initialState,
  reducers: {
    setDate: (state, action) => { state.date = action.payload; },
    setTime: (state, action) => { state.time = action.payload; },
    setNumWaiters: (state, action) => { state.numWaiters = action.payload; },
    setNumBartenders: (state, action) => { state.numBartenders = action.payload; },
    setCoupon: (state, action) => { state.coupon = action.payload; },
    setCouponApplied: (state, action) => { state.couponApplied = action.payload; },
    setCity: (state, action) => { state.city = action.payload; },
    setAddress: (state, action) => { state.address = action.payload; },
    setRemarks: (state, action) => { state.remarks = action.payload; },
    setTotalAmount: (state, action) => { state.totalAmount = action.payload; },
    setBookingFee: (state, action) => { state.bookingFee = action.payload; },
    setPaymentStatus: (state, action) => { state.paymentStatus = action.payload; },
    resetBooking: () => initialState,
  },
});

export const {
  setDate, setTime, setNumWaiters, setNumBartenders, setCoupon, setCouponApplied, setCity, setAddress, setRemarks, setTotalAmount, setBookingFee, setPaymentStatus, resetBooking
} = waiterBartenderBookingSlice.actions;

export default waiterBartenderBookingSlice.reducer; 