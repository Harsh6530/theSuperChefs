import { NextResponse } from "next/server";
import connectDb from "../../../../middleware/connectDb";
import mongoose from "mongoose";
import orderSchema from "../../../../models/orderSchema";

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export async function POST(req) {
  try {
    const data = await req.json();
    await connectDb();
    // Default status to 'pending' if not provided
    if (!data.status) data.status = "pending";
    const order = await Order.create(data);
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Error saving order:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 