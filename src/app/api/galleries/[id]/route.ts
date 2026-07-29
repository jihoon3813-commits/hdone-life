import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    db.prepare("UPDATE galleries SET views = views + 1 WHERE id = ?").run(id);
    const gallery = db.prepare("SELECT * FROM galleries WHERE id = ?").get(id);

    if (!gallery) {
      return NextResponse.json({ success: false, error: "갤러리를 찾을 수 없습니다." }, { status: 404 });
    }

    const prev = db.prepare("SELECT id, title FROM galleries WHERE id < ? ORDER BY id DESC LIMIT 1").get(id);
    const next = db.prepare("SELECT id, title FROM galleries WHERE id > ? ORDER BY id ASC LIMIT 1").get(id);

    return NextResponse.json({ success: true, gallery, prev, next });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    db.prepare("DELETE FROM galleries WHERE id = ?").run(id);
    return NextResponse.json({ success: true, message: "삭제되었습니다." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
