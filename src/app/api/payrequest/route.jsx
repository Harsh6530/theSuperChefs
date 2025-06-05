"use server";

import { NextResponse } from "next/server";
import { StandardCheckoutClient, Env, StandardCheckoutPayRequest } from 'pg-sdk-node';
import { randomUUID } from 'crypto';

export async function POST(req) {
  try {
    const data = await req.json();
    
    // Debug logging
    // console.log("Environment:", process.env.NODE_ENV);
    // console.log("PhonePe Client ID:", process.env.PHONEPE_CLIENT_ID);
    // console.log("PhonePe Client Secret:", process.env.PHONEPE_CLIENT_SECRET ? "Present" : "Missing");
    
    // Validate required fields
    if (!data.amount || !data.merchantTransactionId) {
      return NextResponse.json(
        { message: "Missing required fields", error: "Amount and merchantTransactionId are required" },
        { status: 400 }
      );
    }

    // Validate environment variables
    // if (!process.env.PHONEPE_CLIENT_ID || !process.env.PHONEPE_CLIENT_SECRET) {
    //   return NextResponse.json(
    //     { message: "Configuration Error", error: "Missing PhonePe credentials" },
    //     { status: 500 }
    //   );
    // }

    // Initialize PhonePe client with production environment
    const client = StandardCheckoutClient.getInstance(
      process.env.NEXT_API_MERCHANT_ID,
      process.env.NEXT_API_MERCHANT_KEY,
      parseInt(process.env.NEXT_API_MERCHANT_VERSION || "1"),
      Env.PRODUCTION // Use production environment
    );

    // Get the base URL from environment or default to production URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thesuperchefs.com';

    // Create payment request using the builder pattern
    const request = StandardCheckoutPayRequest.builder()
      .merchantOrderId(data.merchantTransactionId)
      .amount(data.amount)
      .redirectUrl(`${baseUrl}payment/status?transactionId=${data.merchantTransactionId}`)  // Pass transactionId in URL
      .build();

    // Debug logging
    console.log("Payment Request:", {
      merchantOrderId: data.merchantTransactionId,
      amount: data.amount,
      redirectUrl: `${baseUrl}payment/status?transactionId=${data.merchantTransactionId}`
    });

    // Initiate payment
    const response = await client.pay(request);
    
    if (!response || !response.redirectUrl) {
      throw new Error("Invalid response from PhonePe");
    }

    // Return the checkout page URL to redirect the user
    return NextResponse.json({ 
      message: "Success", 
      data: {
        redirectUrl: response.redirectUrl
      }
    });
  } catch (error) {
    console.error("Error in payment initiation:", error);
    return NextResponse.json(
      { 
        message: "Error", 
        error: error.message || "Failed to initiate payment",
        details: error.response?.data || error.stack
      },
      { status: 500 }
    );
  }
}
