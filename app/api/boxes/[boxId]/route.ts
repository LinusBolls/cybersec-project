import BoxState from "@/boxState";
import Env from "@/env";
import { verifyAccessToken } from "@/services/authService";
import { updateBoxState } from "@/services/boxService";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params: { params: { boxId } } }: any) {

    try {
        const accessToken = req.cookies.get("access_token")?.value;

        const user = verifyAccessToken(accessToken!);

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const { state } = await req.json();

        if (!state) {
            return NextResponse.json({ ok: 1 }, { status: 200 });
        }

        if (!Object.values(BoxState).includes(state)) {
            return NextResponse.json({ error: 'Invalid state' }, { status: 400 });
        }
        const updatedBox = await updateBoxState(user.sub, boxId, state);

        return NextResponse.json(updatedBox, { status: 200 });

    } catch (err) {

        const message = (err instanceof Error && Env.verboseLogging) ? (err.message || "Unknown error") : "Unknown error";

        return NextResponse.json({ message }, { status: 400 });
    }
}
