import mongoose from "mongoose";
import { type } from "os";

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  time: { type: String, required: true },
  mobile: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true },
  members: { type: Object, default: {} },
  total: { type: Number, required: true },
  items: [
    {
      id: { type: Number, default: 0 },
      name: { type: String, default: "" },
      price: { type: Number, default: 0 },
      category: { type: String, default: "" },
    },
  ],
  txn_id: { type: String, default: "" },
  // ref_id: { type: String, default: "" },
  city: { type: String, default: "" },
  waiterCount: { type: Number, default: 0 },
  bartenderCount: { type: Number, default: 0},
  coupon: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now() },
});

export default orderSchema;
