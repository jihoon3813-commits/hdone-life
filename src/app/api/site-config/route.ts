import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const config = db.prepare("SELECT * FROM site_config LIMIT 1").get();
    return NextResponse.json({ success: true, config });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { site_name, company_kr_name, phone, email, address, business_number, ceo_name, privacy_officer, hours } = body;

    db.prepare(`
      UPDATE site_config 
      SET site_name = ?, company_kr_name = ?, phone = ?, email = ?, address = ?, business_number = ?, ceo_name = ?, privacy_officer = ?, hours = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `).run(site_name, company_kr_name, phone, email, address, business_number, ceo_name, privacy_officer, hours);

    return NextResponse.json({ success: true, message: "사이트 설정이 수정되었습니다." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
