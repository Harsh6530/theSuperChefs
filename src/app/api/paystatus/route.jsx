import { NextResponse } from "next/server";
import { StandardCheckoutClient, Env } from 'pg-sdk-node';

export async function POST(req) {
  // Basic Authentication
  const authHeader = req.headers.get('authorization');
  const expectedUsername = "TheSuperChefs";
  const expectedPassword = "thesuperchef123";

  // Get the raw request body as text for callback validation
  const rawBody = await req.text();

  try {
    // Initialize PhonePe client with SANDBOX environment
    const client = StandardCheckoutClient.getInstance(
      process.env.NEXT_API_MERCHANT_ID,
      process.env.NEXT_API_MERCHANT_KEY,
      parseInt(process.env.NEXT_API_MERCHANT_VERSION || "1"),
      Env.PRODUCTION // Use SANDBOX environment as per your configuration
    );

    // Validate the callback signature and payload
    console.log("Attempting to validate PhonePe callback...");
    const callbackResponse = client.validateCallback(
      expectedUsername,
      expectedPassword,
      authHeader,
      rawBody
    );

    console.log("Callback validated successfully.");
    console.log("Callback Payload state:", callbackResponse.payload.state);
    console.log("Callback Payload:", callbackResponse.payload);

    const paymentStatus = callbackResponse.payload.state;
    const transactionId = callbackResponse.payload.transactionId; // Assuming transactionId is in payload
    const merchantOrderId = callbackResponse.payload.merchantOrderId; // Assuming merchantOrderId is in payload
    const amount = callbackResponse.payload.amount / 100; // Assuming amount is in paise and needs conversion
    const providerReferenceId = callbackResponse.payload.providerReferenceId; // Assuming providerReferenceId is in payload

    // Get the base URL from environment or default to production URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thesuperchefs.com';

    let redirectUrl;

    if (paymentStatus === "checkout.order.completed") {
      console.log("Payment successful. Redirecting...");
      // Construct success URL with relevant details from callback
      redirectUrl = `${baseUrl}/payment/success?transactionId=${transactionId || merchantOrderId}&amount=${amount}&providerReferenceId=${providerReferenceId || 'N/A'}`;
      console.log("Redirecting to success URL:", redirectUrl); // Debugging
      return NextResponse.redirect(
        redirectUrl,
        { status: 301 }
      );
      
    } else if (paymentStatus === "checkout.order.failed") {
       console.log("Payment failed. Redirecting...");
      // Construct failure URL with relevant details from callback
       redirectUrl = `${baseUrl}/payment/failure?transactionId=${transactionId || merchantOrderId}&amount=${amount}&providerReferenceId=${providerReferenceId || 'N/A'}&error=${encodeURIComponent('Payment failed as per gateway callback')}`;
       console.log("Redirecting to failure URL:", redirectUrl); // Debugging
      return NextResponse.redirect(
        redirectUrl,
        { status: 301 }
      );

    } else {
      console.log("Received unknown payment status:", paymentStatus);
      // Optionally redirect to a generic status page or failure
      redirectUrl = `${baseUrl}/payment/failure?error=${encodeURIComponent(`Unknown payment status received: ${paymentStatus}`)}`;
       console.log("Redirecting to failure URL due to unknown status:", redirectUrl); // Debugging
       return NextResponse.redirect(
        redirectUrl,
        { status: 301 }
      );
    }
  } catch (error) {
    console.error("Error processing PhonePe callback:", error);
    // Redirect to failure page in case of any error during callback processing
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thesuperchefs.com';
     const redirectUrl = `${baseUrl}/payment/failure?error=${encodeURIComponent('Failed to process payment callback')}`;
     console.log("Redirecting to failure URL due to callback processing error:", redirectUrl); // Debugging
    return NextResponse.redirect(
      redirectUrl,
      { status: 301 }
    );
  }
}
