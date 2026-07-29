import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;

    const inquiries = db.prepare("SELECT * FROM inquiries ORDER BY id DESC LIMIT ? OFFSET ?").all(limit, offset);
    const totalRes = db.prepare("SELECT COUNT(*) as total FROM inquiries").get() as { total: number };

    return NextResponse.json({
      success: true,
      inquiries,
      pagination: {
        total: totalRes.total,
        page,
        limit,
        totalPages: Math.ceil(totalRes.total / limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, type, interest_product, title, content, attachment_url, is_agreed } = body;

    // Validation
    if (!name || !phone || !type || !title || !content) {
      return NextResponse.json({ success: false, error: "필수 정보를 모두 입력해 주세요." }, { status: 400 });
    }

    if (!is_agreed) {
      return NextResponse.json({ success: false, error: "개인정보 수집 및 이용에 동의해야 합니다." }, { status: 400 });
    }

    const result = db.prepare(`
      INSERT INTO inquiries (name, phone, email, type, interest_product, title, content, attachment_url, is_agreed)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    `).run(name, phone, email || null, type, interest_product || null, title, content, attachment_url || null);

    return NextResponse.json({ success: true, id: result.lastInsertRowid, message: "온라인 문의가 성공적으로 접수되었습니다. 담당자가 조속히 연락드리겠습니다." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
