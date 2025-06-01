import { NextResponse } from "next/server";
import { StandardCheckoutClient, Env } from 'pg-sdk-node';

export async function POST(req) {
  try {
    const data = await req.formData();

    const merchantId = data.get("merchantId");
    const transactionId = data.get("transactionId");
    const amount = data.get("amount");
    const providerReferenceId = data.get("providerReferenceId");

    // Debugging: Log incoming data
    console.log("Received data in /api/paystatus:", { merchantId, transactionId, amount, providerReferenceId });

    // Initialize PhonePe client
    const client = StandardCheckoutClient.getInstance(
      process.env.NEXT_API_MERCHANT_ID,
      process.env.NEXT_API_MERCHANT_KEY,
      parseInt(process.env.NEXT_API_MERCHANT_VERSION || "1"),
      Env.PRODUCTION
    );

    // Check payment status
    const statusResponse = await client.checkStatus(merchantId, transactionId);

    // Debugging: Log status response
    console.log("PhonePe status response:", statusResponse);
    console.log("Status code:", statusResponse.code);

    // Get the base URL from environment or default to production URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thesuperchefs.com';

    let redirectUrl;

    if (statusResponse.code === "PAYMENT_SUCCESS") {
      redirectUrl = `${baseUrl}/payment/success?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}`;
      console.log("Redirecting to success URL:", redirectUrl); // Debugging
      return NextResponse.redirect(
        redirectUrl,
        { status: 301 }
      );
    } else {
      redirectUrl = `${baseUrl}/payment/failure?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}&error=${encodeURIComponent(statusResponse.message || 'Payment failed')}`;
       console.log("Redirecting to failure URL:", redirectUrl); // Debugging
      return NextResponse.redirect(
        redirectUrl,
        { status: 301 }
      );
    }
  } catch (error) {
    console.error("Error checking payment status:", error);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thesuperchefs.com';
    const transactionId = req.formData().then(data => data.get("transactionId")).catch(() => "N/A"); // Attempt to get transactionId for logging
    const amount = req.formData().then(data => data.get("amount")).catch(() => "N/A"); // Attempt to get amount for logging
    console.log("Attempting to redirect to failure page due to error.");

    const redirectUrl = `${baseUrl}/payment/failure?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}&error=${encodeURIComponent('Failed to verify payment status')}`;

    return NextResponse.redirect(
      redirectUrl,
      { status: 301 }
    );
  }
}
