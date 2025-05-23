
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  time:{ type: String, required: true },
  mobile: { type: String, required: true },
  date: { type: Date, default: Date.now },
  members: { type: Object, required: true },
  total: { type: Number, required: true },
  items: [
    {
      _id: { type: String, required: true },
      item: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: String, required: true },
    },
  ],
});

export default orderSchema;
