import { NextResponse } from "next/server";
import { StandardCheckoutClient, Env } from 'pg-sdk-node';
import connectDb from "../../../../middleware/connectDb";
import mongoose from "mongoose";
import orderSchema from "../../../../models/orderSchema";

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const merchantOrderId = searchParams.get('transactionId');

    if (!merchantOrderId) {
      return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
    }

    // Initialize PhonePe client
    const client = StandardCheckoutClient.getInstance(
      process.env.NEXT_API_MERCHANT_ID,
      process.env.NEXT_API_MERCHANT_KEY,
      parseInt(process.env.NEXT_API_MERCHANT_VERSION || "1"),
      Env.PRODUCTION // Use production environment
    );

    // Get order status from PhonePe
    const response = await client.getOrderStatus(merchantOrderId);
    console.log("Order Status Response:", response);

    // Update order status in MongoDB
    await connectDb();
    await Order.findOneAndUpdate(
      { txn_id: merchantOrderId },
      { 
        status: response.state === "COMPLETED" ? "Order Confirmed" : 
                response.state === "FAILED" ? "Order Failed" : "Order Pending",
        payment_details: response.paymentDetails || []
      }
    );

    return NextResponse.json({
      status: response.state === "COMPLETED" ? "Payment Successful" : 
              response.state === "FAILED" ? "Payment Failed" : "Payment Pending",
      orderId: response.orderId,
      amount: response.amount,
      paymentDetails: response.paymentDetails
    });

  } catch (error) {
    console.error("Error checking order status:", error);
    return NextResponse.json({ 
      error: "Failed to check order status",
      details: error.message 
    }, { status: 500 });
  }
} 