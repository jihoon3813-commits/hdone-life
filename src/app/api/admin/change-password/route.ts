import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, error: "현재 비밀번호와 새 비밀번호를 입력해 주세요." }, { status: 400 });
    }

    if (newPassword.length < 4) {
      return NextResponse.json({ success: false, error: "새 비밀번호는 최소 4자 이상이어야 합니다." }, { status: 400 });
    }

    const adminUser: any = db.prepare("SELECT * FROM users WHERE email = ?").get("admin");

    if (!adminUser || adminUser.password !== currentPassword) {
      return NextResponse.json({ success: false, error: "현재 비밀번호가 일치하지 않습니다." }, { status: 400 });
    }

    db.prepare("UPDATE users SET password = ? WHERE id = ?").run(newPassword, adminUser.id);

    return NextResponse.json({ success: true, message: "관리자 비밀번호가 성공적으로 변경되었습니다." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
