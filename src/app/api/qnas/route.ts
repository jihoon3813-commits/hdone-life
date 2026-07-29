import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;

    const qnas = db.prepare("SELECT id, title, author, views, is_secret, is_answered, created_at FROM qnas ORDER BY id DESC LIMIT ? OFFSET ?").all(limit, offset);
    const totalRes = db.prepare("SELECT COUNT(*) as total FROM qnas").get() as { total: number };

    return NextResponse.json({
      success: true,
      qnas,
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
    const { title, content, author, password, is_secret } = body;

    if (!title || !content || !author) {
      return NextResponse.json({ success: false, error: "필수 입력 항목이 누락되었습니다." }, { status: 400 });
    }

    const result = db.prepare(`
      INSERT INTO qnas (title, content, author, password, is_secret)
      VALUES (?, ?, ?, ?, ?)
    `).run(title, content, author, password || null, is_secret ? 1 : 0);

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
