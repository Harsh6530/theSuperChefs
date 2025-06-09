import { NextResponse } from "next/server";
import connectDb from "../../../../middleware/connectDb";
import mongoose from "mongoose";
import orderSchema from "../../../../models/orderSchema";

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { txn_id } = body;

    if (!txn_id) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    await connectDb();
    const order = await Order.findOne({ txn_id });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
} 