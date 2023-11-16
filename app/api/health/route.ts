import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    return NextResponse.json({ ok: 1 }, { status: 200 })
}