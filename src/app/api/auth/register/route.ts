import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, phone } = body;

    if (!email || !password || !name || !phone) {
      return NextResponse.json({ success: false, error: "모든 항목을 입력해 주세요." }, { status: 400 });
    }

    const existing: any = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
    if (existing) {
      return NextResponse.json({ success: false, error: "이미 가입된 이메일 주소입니다." }, { status: 400 });
    }

    const result = db.prepare(`
      INSERT INTO users (email, password, name, phone, role)
      VALUES (?, ?, ?, ?, 'user')
    `).run(email, password, name, phone);

    return NextResponse.json({ success: true, userId: result.lastInsertRowid, message: "회원가입이 완료되었습니다." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
