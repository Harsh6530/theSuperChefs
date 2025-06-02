import mongoose from "mongoose";

const waiterBartenderOrderSchema = new mongoose.Schema({
  user: { type: String },
  date: { type: String },
  time: { type: String },
  numWaiters: { type: Number },
  numBartenders: { type: Number },
  couponApplied: { type: Boolean, default: false },
  totalAmount: { type: Number },
  bookingFee: { type: Number, default: 199 },
  paymentStatus: { type: String, default: "pending" },
  city: { type: String },
  address: { type: String },
  remarks: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default waiterBartenderOrderSchema; 