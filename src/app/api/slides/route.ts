import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const slides = db.prepare("SELECT * FROM main_slides WHERE is_active = 1 ORDER BY display_order ASC").all();
    return NextResponse.json({ success: true, slides });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, subtitle, bg_image, link_url, display_order } = body;

    const result = db.prepare(`
      INSERT INTO main_slides (title, subtitle, bg_image, link_url, display_order)
      VALUES (?, ?, ?, ?, ?)
    `).run(title, subtitle, bg_image, link_url, display_order || 1);

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
