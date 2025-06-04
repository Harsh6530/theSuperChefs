import { NextResponse } from "next/server";
import { StandardCheckoutClient, Env } from 'pg-sdk-node';

export async function POST(req) {
  // Basic Authentication
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    console.log("Authentication failed: Missing or invalid Authorization header");
    return new NextResponse('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Restricted Area"' } });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  const expectedUsername = "TheSuperChefs";
  const expectedPassword = "thesuperchef123";

  if (username !== expectedUsername || password !== expectedPassword) {
    console.log("Authentication failed: Incorrect username or password");
    return new NextResponse('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Restricted Area"' } });
  }

  console.log("Authentication successful");

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
      Env.SANDBOX // Use SANDBOX environment as per your configuration
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
    // Note: Cannot reliably get form data in catch block from req.formData() after it's been consumed
    // Attempting to get some identifiers for logging, but they might be undefined
    const transactionId = data ? data.get("transactionId") : "N/A";
    const amount = data ? data.get("amount") : "N/A";
    const providerReferenceId = data ? data.get("providerReferenceId") : "N/A";
    console.log("Attempting to redirect to failure page due to error.", { transactionId, amount, providerReferenceId });

    const redirectUrl = `${baseUrl}/payment/failure?transactionId=${transactionId}&amount=${amount}&providerReferenceId=${providerReferenceId}&error=${encodeURIComponent('Failed to verify payment status')}`;

    return NextResponse.redirect(
      redirectUrl,
      { status: 301 }
    );
  }
}
