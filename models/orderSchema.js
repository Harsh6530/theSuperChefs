import mongoose from "mongoose";
import { type } from "os";

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  time: { type: String, required: true },
  mobile: { type: String, required: true },
  address: {type: String, required: true},
  date: { type: String, required: true },
  status: { type: String, default: "Order Placed" },
  members: { type: Object, required: true },
  total: { type: Number, required: true },
  items: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: String, required: true },
    },
  ],
  txn_id: { type: String, default: "" },
  
  city: { type: String, required: true },
  waiterCount: { type: Number, required: true },
  bartenderCount: { type: Number, required: true, max: 2 },
  coupon: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now() },
});

export default orderSchema;
