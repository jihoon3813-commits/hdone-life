import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const popups = db.prepare("SELECT * FROM popups WHERE is_active = 1").all();
    return NextResponse.json({ success: true, popups });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content_html, image_url, link_url, width, height, top_pos, left_pos } = body;

    const result = db.prepare(`
      INSERT INTO popups (title, content_html, image_url, link_url, width, height, top_pos, left_pos, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    `).run(title, content_html || null, image_url || null, link_url || null, width || 600, height || 400, top_pos || 100, left_pos || 100);

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
