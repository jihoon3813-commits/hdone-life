import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;

    let query = "SELECT * FROM notices";
    let countQuery = "SELECT COUNT(*) as total FROM notices";
    const params: any[] = [];

    if (search) {
      query += " WHERE title LIKE ? OR content LIKE ?";
      countQuery += " WHERE title LIKE ? OR content LIKE ?";
      params.push(`%${search}%`, `%${search}%`);
    }

    query += " ORDER BY is_important DESC, id DESC LIMIT ? OFFSET ?";
    
    const notices = db.prepare(query).all(...params, limit, offset);
    const totalRes = db.prepare(countQuery).get(...params) as { total: number };

    return NextResponse.json({
      success: true,
      notices,
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
    const { title, content, is_important, attachment_name, attachment_url } = body;

    const result = db.prepare(`
      INSERT INTO notices (title, content, author, is_important, attachment_name, attachment_url)
      VALUES (?, ?, '관리자', ?, ?, ?)
    `).run(title, content, is_important ? 1 : 0, attachment_name || null, attachment_url || null);

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
