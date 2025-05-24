import { NextResponse } from "next/server";
import { getOrdersbyId } from "@/../server/orderActions";

export async function POST(request: Request) {
  const body = await request.json();
  const {orderData} =  body ;
  try {
    const orders = await getOrdersbyId(orderData);

    if (!orders?.success) {
      return NextResponse.json(
        { error: "Failed to create order", orders },
        { status: 500 }
      );
    }
    return NextResponse.json({ orders }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create order", orders: null },
      { status: 500 }
    );
  }
}
