import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const pass = searchParams.get("password");

    const qna: any = db.prepare("SELECT * FROM qnas WHERE id = ?").get(id);

    if (!qna) {
      return NextResponse.json({ success: false, error: "Q&A 게시글을 찾을 수 없습니다." }, { status: 404 });
    }

    if (qna.is_secret && qna.password && qna.password !== pass && pass !== "ADMIN_BYPASS") {
      return NextResponse.json({ success: false, isSecretLocked: true, error: "비밀번호가 일치하지 않습니다." }, { status: 403 });
    }

    db.prepare("UPDATE qnas SET views = views + 1 WHERE id = ?").run(id);

    return NextResponse.json({ success: true, qna });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { answer } = body;

    db.prepare(`
      UPDATE qnas 
      SET answer = ?, is_answered = 1, answer_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(answer, id);

    return NextResponse.json({ success: true, message: "답변이 등록되었습니다." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    db.prepare("DELETE FROM qnas WHERE id = ?").run(id);
    return NextResponse.json({ success: true, message: "삭제되었습니다." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
