import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const accountId = body.email || body.username || body.id;
    const password = body.password;

    if (!accountId || !password) {
      return NextResponse.json({ success: false, error: "아이디와 비밀번호를 입력해 주세요." }, { status: 400 });
    }

    const user: any = db.prepare("SELECT * FROM users WHERE email = ?").get(accountId);

    if (!user || user.password !== password) {
      return NextResponse.json({ success: false, error: "아이디 또는 비밀번호가 올바르지 않습니다." }, { status: 401 });
    }

    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
    };

    return NextResponse.json({ success: true, user: userData });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
