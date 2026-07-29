import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "9", 10);
    const offset = (page - 1) * limit;

    const galleries = db.prepare("SELECT * FROM galleries ORDER BY id DESC LIMIT ? OFFSET ?").all(limit, offset);
    const totalRes = db.prepare("SELECT COUNT(*) as total FROM galleries").get() as { total: number };

    return NextResponse.json({
      success: true,
      galleries,
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
    const { title, content, main_image, images } = body;

    const result = db.prepare(`
      INSERT INTO galleries (title, content, author, main_image, images_json)
      VALUES (?, ?, '관리자', ?, ?)
    `).run(title, content || "", main_image, JSON.stringify(images || [main_image]));

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
