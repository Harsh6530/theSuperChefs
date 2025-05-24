import { NextResponse } from "next/server";
import { createOrder, getOrdersbyId } from "@/../server/orderActions";

export async function POST(request: Request) {
  const body = await request.json();
  const { orderData } = body;

  try {
    const order = await createOrder(orderData);
    if (!order?.success) {
      return NextResponse.json(
        { error: "Failed to create order", order },
        { status: 500 }
      );
    }
    return NextResponse.json({ order }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create order", order: null },
      { status: 500 }
    );
  }
}
