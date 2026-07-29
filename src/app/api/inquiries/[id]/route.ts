import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, admin_note } = body;

    db.prepare(`
      UPDATE inquiries 
      SET status = ?, admin_note = ? 
      WHERE id = ?
    `).run(status, admin_note || null, id);

    return NextResponse.json({ success: true, message: "문의 처리 상태가 변경되었습니다." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    db.prepare("DELETE FROM inquiries WHERE id = ?").run(id);
    return NextResponse.json({ success: true, message: "삭제되었습니다." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
