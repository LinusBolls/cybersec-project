import { NextRequest, NextResponse } from "next/server";
import { loginUser } from '../../../../services/authService';
import Config from '@/config';
import Env from "@/env";

export async function POST(req: NextRequest) {

  try {
    const { email, password } = await req.json();

    const { accessToken, refreshToken } = await loginUser(email, password);

    const res = NextResponse.json({ ok: 1 }, { status: 200 });

    res.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: Config.accessTokenExpiryMs / 1000,
    });
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