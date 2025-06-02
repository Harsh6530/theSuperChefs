import { NextResponse } from "next/server";
const PDFDocument = (await import("pdfkit")).default;
import { PassThrough } from "stream";
import path from "path";

// Helper to convert a stream to a buffer
async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

export async function POST(req) {
  try {
    const { transactionDetails, orderData } = await req.json();

    const doc = new PDFDocument({ margin: 40 });
    const stream = new PassThrough();
    doc.pipe(stream);

    // Register and use a custom font (Poppins-Regular.ttf in public/fonts)
    const fontPath = path.join(process.cwd(), "public", "fonts", "Poppins-Regular.ttf");
    doc.registerFont("Poppins", fontPath);
    doc.font("Poppins");

    // Header
    doc.fontSize(22).text("The SuperChefs", { align: "center" });
    doc.moveDown(0.5);
    doc.fontSize(16).text("Payment Receipt", { align: "center" });
    doc.moveDown(1.5);

    // Transaction Details
    doc.fontSize(14).text("Transaction Details:");
    doc.moveDown(0.5);
    doc.fontSize(12);
    doc.text(`Transaction ID: ${transactionDetails.txnId}`);
    doc.text(`Status: ${transactionDetails.status}`);
    doc.text(`Date: ${transactionDetails.date}`);
    doc.text(`Time: ${transactionDetails.time}`);
    doc.text(`Amount Paid: ₹${transactionDetails.amount}`);
    doc.moveDown(1);

    // Order Details
    doc.fontSize(14).text("Order Details:");
    doc.moveDown(0.5);
    doc.fontSize(12);
    if (orderData?.user) {
      doc.text(`Name: ${orderData.user.name}`);
      doc.text(`Mobile: ${orderData.user.mobile}`);
    }
    if (orderData?.order_data) {
      doc.text(`Address: ${orderData.order_data.address}`);
      doc.text(`City: ${orderData.order_data.city}`);
      doc.text(`Date: ${orderData.order_data.date}`);
      doc.text(`Time: ${orderData.order_data.time}`);
      doc.text(`Total: ₹${orderData.order_data.totalAmount || orderData.order_data.amount}`);
      doc.moveDown(0.5);
      doc.text("Items:");
      (orderData.order_data.items_data || orderData.order_data.selectedItems || []).forEach((item, idx) => {
        doc.text(`  ${idx + 1}. ${item.name} x${item.quantity || 1}`);
      });
    }

    doc.moveDown(1);
    doc.fontSize(10).fillColor('gray').text("Thank you for choosing The SuperChefs!", { align: "center" });

    doc.end();

    // Convert PDF stream to buffer
    const pdfBuffer = await streamToBuffer(stream);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=receipt_${transactionDetails.txnId}.pdf`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { message: "Error generating PDF", error: error.message },
      { status: 500 }
    );
  }
} 