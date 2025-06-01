import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import bookingReducer from "../booking/bookingSlice";
import waiterBartenderBookingReducer from "../booking/waiterBartenderBookingSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        booking: bookingReducer,
        waiterBartenderBooking: waiterBartenderBookingReducer,
    }
});

export default store;