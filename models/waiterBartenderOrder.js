import mongoose from "mongoose";

const waiterBartenderOrderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  numWaiters: { type: Number, required: true },
  numBartenders: { type: Number, required: true },
  couponApplied: { type: Boolean, default: false },
  totalAmount: { type: Number, required: true },
  bookingFee: { type: Number, default: 199 },
  paymentStatus: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default waiterBartenderOrderSchema; 