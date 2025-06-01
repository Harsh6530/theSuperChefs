import { NextResponse } from "next/server";
import connectDb from "../../../../middleware/connectDb";
import Menu from "../../../../models/menu";

export async function GET() {
  try {
    await connectDb();
    const items = await Menu.find({});
    return NextResponse.json(items);
  } catch (error) {
    console.error("Menu API error:", error);
    return NextResponse.json({ error: "Failed to fetch menu", details: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
} 