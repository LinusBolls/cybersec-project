import BoxState from "@/boxState";
import Env from "@/env";
import { verifyAccessToken } from "@/services/authService";
import { updateBoxCode as updateCodeBox, updateBoxMeta as updateBox, updateBoxState } from "@/services/boxService";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params: { boxId } }: { params: { boxId: string } }) {

    try {
        const accessToken = req.cookies.get("access_token")?.value;

        const user = verifyAccessToken(accessToken!);

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const { meta: { title }, code: { html, css, js } } = await req.json();

        const updatedCodeBox = await updateCodeBox(user.sub, boxId, html, css, js);

        const updatedBox = await updateBox(user.sub, boxId, title);

        updatedBox.boxCode.html = updatedCodeBox.html;
        updatedBox.boxCode.css = updatedCodeBox.css;
        updatedBox.boxCode.js = updatedCodeBox.js;
        updatedBox.title = updatedBox.title;

        return NextResponse.json(updatedBox, { status: 200 });

    } catch (err) {

        const message = (err instanceof Error && Env.verboseLogging) ? (err.message || "Unknown error") : "Unknown error";

        return NextResponse.json({ message }, { status: 400 });
    }
}
