import { NextResponse } from "next/server";
import { login, signup, forgotPassword } from "@/../server/authActions";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const user = await login({ email, password });
  console.log(user);
  if (!user?.success) {
    return NextResponse.json(
      { error: user?.message || "Invalid email or password" },
      { status: 401 }
    );
  }

  return NextResponse.json(user);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { email, password, name, number } = body;

  const user = await signup({ email, password, name, mobile: number });
  if (!user?.success) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  return NextResponse.json(user);
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { email } = body;

  const user = await forgotPassword({ email });
  if (!user?.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 401 });
  }

  return NextResponse.json(user);
}
