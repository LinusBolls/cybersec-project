import { verifyAccessToken } from "@/services/authService";
import { createBox, getBoxes } from "@/services/boxService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const boxes = await getBoxes({ state: "PUBLISHED" });

    return NextResponse.json(boxes, { status: 200 });
}

export async function POST(req: NextRequest) {

    const accessToken = req.cookies.get("access_token")?.value;

    const user = verifyAccessToken(accessToken!);

    const box = await createBox(user.sub, []);

    return NextResponse.json(box, { status: 201 });
} 3