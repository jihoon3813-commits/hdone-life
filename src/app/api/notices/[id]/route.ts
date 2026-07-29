import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    // Increase view count
    db.prepare("UPDATE notices SET views = views + 1 WHERE id = ?").run(id);
    const notice = db.prepare("SELECT * FROM notices WHERE id = ?").get(id);

    if (!notice) {
      return NextResponse.json({ success: false, error: "공지사항을 찾을 수 없습니다." }, { status: 404 });
    }

    // Previous and Next post
    const prev = db.prepare("SELECT id, title FROM notices WHERE id < ? ORDER BY id DESC LIMIT 1").get(id);
    const next = db.prepare("SELECT id, title FROM notices WHERE id > ? ORDER BY id ASC LIMIT 1").get(id);

    return NextResponse.json({ success: true, notice, prev, next });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    db.prepare("DELETE FROM notices WHERE id = ?").run(id);
    return NextResponse.json({ success: true, message: "삭제되었습니다." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
