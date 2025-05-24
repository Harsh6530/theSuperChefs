import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  time: { type: String, required: true },
  mobile: { type: String, required: true },
  date: { type: String, required:true },
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
  createdAt: { type: Date, default: Date.now() },
});

export default orderSchema;
