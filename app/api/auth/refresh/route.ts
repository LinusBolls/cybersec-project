import { NextRequest, NextResponse } from 'next/server';
import { refreshToken } from '../../../../services/authService';
import Config from '@/config';

export async function POST(req: NextRequest) {

  try {
    const reqRefreshToken = req.cookies.get("refresh_token");

    const newToken = await refreshToken(reqRefreshToken?.value!);

    const res = NextResponse.json({ ok: 1 }, { status: 200 });

    res.cookies.set("access_token", `Bearer ${newToken}`, {
      httpOnly: true,
      secure: true,
      maxAge: Config.accessTokenExpiryMs / 1000,
    });
    return res;

  } catch (err) {

    const message = err instanceof Error ? (err.message || "Unknown error") : "Unexpected error";

    NextResponse.json({ message }, { status: 400 });
  }
}
