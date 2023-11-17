import { NextRequest, NextResponse } from "next/server";
import { registerUser } from '../../../../services/authService';
import Config from '@/config';
import Env from "@/env";

export async function POST(req: NextRequest) {

  try {
    const { email, password, name } = await req.json();

    const { refreshToken } = await registerUser(email, password, name);

    const res = NextResponse.json({ ok: 1 }, { status: 201 });

    res.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: Config.refreshTokenExpiryMs / 1000,
    });
    return res;

  } catch (err) {

    const message = (err instanceof Error && Env.verboseLogging) ? (err.message || "Unknown error") : "Unknown error";

    return NextResponse.json({ message }, { status: 400 });
  }
}