import { NextResponse } from "next/server";
import { StandardCheckoutClient, Env } from 'pg-sdk-node';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const transactionId = searchParams.get('transactionId');

    if (!transactionId) {
      return NextResponse.json({ message: "Error", error: "Missing transactionId" }, { status: 400 });
    }

    // Initialize PhonePe client with SANDBOX environment
    const client = StandardCheckoutClient.getInstance(
      process.env.NEXT_API_MERCHANT_ID,
      process.env.NEXT_API_MERCHANT_KEY,
      parseInt(process.env.NEXT_API_MERCHANT_VERSION || "1"),
      Env.SANDBOX
    );

    // Check payment status using PhonePe's getOrderStatus API
    console.log(`Checking status for transactionId: ${transactionId}`);
    const statusResponse = await client.getOrderStatus(transactionId);

    console.log("Status check response:", statusResponse);

    // Check if statusResponse is valid and has a state property
    if (!statusResponse || typeof statusResponse.state === 'undefined') {
         console.error("Invalid status response from PhonePe:", statusResponse);
         return NextResponse.json({ message: "Error", error: "Invalid status response from gateway" }, { status: 500 });
    }

    // Return the status and relevant details to the frontend
    // The status is typically in statusResponse.state for getOrderStatus
    return NextResponse.json({ 
      message: "Success", 
      status: statusResponse.state, // Use the actual status state from PhonePe (e.g., COMPLETED, FAILED)
      details: statusResponse, // Provide full details for potential debugging on frontend
    });

  } catch (error) {
    console.error("Error in /api/check-payment-status:", error);
    return NextResponse.json(
      { message: "Error", error: error.message || "Failed to check payment status" },
      { status: 500 }
    );
  }
} 