import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ success: false, error: "Missing credentials" }, { status: 400 });
  }

  let role: "Admin" | "ProjectManager" | "Developer" = "Developer";
  if (email.includes("admin")) role = "Admin";
  else if (email.includes("pm")) role = "ProjectManager";

  const token = "fake-jwt-token-" + Date.now();

  return NextResponse.json({
    success: true,
    token,
    role,
    email
  });
}
