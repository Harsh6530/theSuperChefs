import { NextResponse } from "next/server";
import { StandardCheckoutClient, Env } from 'pg-sdk-node';
import connectDb from "../../../../middleware/connectDb";
import mongoose from "mongoose";
import orderSchema from "../../../../models/orderSchema";

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

const expectedUsername = "TheSuperChefs";
const expectedPassword = "thesuperchef123";

export async function POST(req) {
  try {
    // Get the raw body as string
    const responseBody = await req.text();
    // Get the authorization header
    const authorization = req.headers.get('authorization');
    
    // Debug logging
    console.log("=== Webhook Debug Info ===");
    console.log("Headers:", Object.fromEntries(req.headers.entries()));
    console.log("Raw body:", responseBody);
    console.log("Authorization header:", authorization);
    
    if (!authorization) {
      console.log("Error: Missing authorization header");
      return NextResponse.json({ message: "Missing authorization header" }, { status: 400 });
    }

    // Initialize PhonePe client
    const client = StandardCheckoutClient.getInstance(
      process.env.NEXT_API_MERCHANT_ID,
      process.env.NEXT_API_MERCHANT_KEY,
      parseInt(process.env.NEXT_API_MERCHANT_VERSION || "1"),
      Env.PRODUCTION // Use production environment
    );

    try {
      // Validate callback
      const callbackResponse = client.validateCallback(
        expectedUsername,
        expectedPassword,
        authorization,
        responseBody
      );
      console.log("Webhook callbackResponse:", callbackResponse);
      console.log("Webhook payload:", callbackResponse.payload);

      // Update order status in MongoDB
      const { merchantOrderId, state } = callbackResponse.payload;
      await connectDb();
      await Order.findOneAndUpdate(
        { txn_id: merchantOrderId },
        { status: state === "COMPLETED" ? "Payment Successful" : "Payment Failed" }
      );

      // Extract info for redirect
      const { orderId, amount, providerReferenceId } = callbackResponse.payload || {};
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thesuperchefs.com';
      let redirectUrl;
      if (state === 'COMPLETED') {
        redirectUrl = `${baseUrl}/payment/success?orderId=${orderId || ''}&merchantOrderId=${merchantOrderId || ''}&amount=${amount || ''}&providerReferenceId=${providerReferenceId || ''}`;
      } else {
        redirectUrl = `${baseUrl}/payment/failure?orderId=${orderId || ''}&merchantOrderId=${merchantOrderId || ''}&amount=${amount || ''}&providerReferenceId=${providerReferenceId || ''}&state=${state || ''}`;
      }
      return NextResponse.redirect(redirectUrl, { status: 302 });
    } catch (validationError) {
      console.error("Callback validation error:", validationError);
      return NextResponse.json({ 
        message: "Callback validation failed", 
        error: validationError.message 
      }, { status: 400 });
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thesuperchefs.com';
    const redirectUrl = `${baseUrl}/payment/failure?error=${encodeURIComponent(error.message)}`;
    return NextResponse.redirect(redirectUrl, { status: 302 });
  }
}

export async function GET(req) {
  return NextResponse.json({ message: "GET /api/paystatus is reachable." });
}
