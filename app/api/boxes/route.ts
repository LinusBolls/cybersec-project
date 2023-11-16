import Env from "@/env";
import { verifyAccessToken } from "@/services/authService";
import { createBox, getBoxes } from "@/services/boxService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        const boxes = await getBoxes({ state: "PUBLISHED" });

        return NextResponse.json(boxes, { status: 200 });

    } catch (err) {

        const message = (err instanceof Error && Env.verboseLogging) ? (err.message || "Unknown error") : "Unknown error";

        return NextResponse.json({ message }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {

    try {
        const accessToken = req.cookies.get("access_token")?.value;

        const user = verifyAccessToken(accessToken!);

        const box = await createBox(user.sub, []);

        return NextResponse.json(box, { status: 201 });

    } catch (err) {

        const message = (err instanceof Error && Env.verboseLogging) ? (err.message || "Unknown error") : "Unknown error";

        return NextResponse.json({ message }, { status: 400 });
    }
} 3