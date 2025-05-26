import { NextResponse } from "next/server";
import { StandardCheckoutClient, Env } from 'pg-sdk-node';

export async function POST(req) {
  try {
    const data = await req.formData();

    const merchantId = data.get("merchantId");
    const transactionId = data.get("transactionId");
    const amount = data.get("amount");
    const providerReferenceId = data.get("providerReferenceId");

    // Initialize PhonePe client
    const client = StandardCheckoutClient.getInstance(
      process.env.NEXT_API_MERCHANT_ID,
      process.env.NEXT_API_MERCHANT_KEY,
      parseInt(process.env.NEXT_API_MERCHANT_VERSION || "1"),
      Env.PRODUCTION
    );

    // Check payment status
    const statusResponse = await client.checkStatus(merchantId, transactionId);

    // Get the base URL from environment or default to production URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thesuperchefs.com';

    if (statusResponse.code === "PAYMENT_SUCCESS") {
      return NextResponse.redirect(
        `${baseUrl}/payment/success?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}`,
        { status: 301 }
      );
    } else {
      return NextResponse.redirect(
        `${baseUrl}/payment/failure?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}&error=${encodeURIComponent(statusResponse.message || 'Payment failed')}`,
        { status: 301 }
      );
    }
  } catch (error) {
    console.error("Error checking payment status:", error);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thesuperchefs.com';
    return NextResponse.redirect(
      `${baseUrl}/payment/failure?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}&error=${encodeURIComponent('Failed to verify payment status')}`,
      { status: 301 }
    );
  }
}
