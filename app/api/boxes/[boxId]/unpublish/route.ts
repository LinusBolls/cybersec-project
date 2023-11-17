import Env from "@/env";
import { verifyAccessToken } from "@/services/authService";
import { updateBoxState } from "@/services/boxService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params: { boxId } }: { params: { boxId: string } }) {

    try {
        const accessToken = req.cookies.get("access_token")?.value;

        const user = await verifyAccessToken(accessToken!);

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const updatedBox = await updateBoxState(user.sub, boxId, "PRIVATE");

        return NextResponse.json(updatedBox, { status: 200 });

    } catch (err) {

        const message = (err instanceof Error && Env.verboseLogging) ? (err.message || "Unknown error") : "Unknown error";

        return NextResponse.json({ message }, { status: 400 });
    }
}
