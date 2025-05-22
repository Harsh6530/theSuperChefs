import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  date: { type: Date, default: Date.now },
  members: { type: Object, required: true },
  total: { type: Number, required: true },
  items: [
    {
      item: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

export default orderSchema;
