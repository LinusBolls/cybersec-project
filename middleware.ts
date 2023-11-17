import Env from '@/env';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Config from './config';
import * as jose from 'jose';

export const verifyAccessToken = async (token: string) => {
    try {
        const data = await jose.jwtVerify<{ sub: string, iat: number, exp: number }>(token, new TextEncoder().encode(Env.accessTokenSecret));

        return data;
    } catch (err) {

        return null;
    }
}
export const verifyRefreshToken = async (token: string) => {
    try {
        const data = await jose.jwtVerify<{ sub: string, iat: number, exp: number }>(token, new TextEncoder().encode(Env.refreshTokenSecret));

        return data;
    } catch (err) {

        return null;
    }
}
export const getAccessToken = async (userId: string) => {
    const accessToken = await new jose.SignJWT({ sub: userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(Date.now() + Config.accessTokenExpiryMs)
        .sign(new TextEncoder().encode(Env.accessTokenSecret));

    return accessToken;
}

/**
 * checks the response for the `access_token` and `refresh_token` cookies.
 * if the accessToken is missing or invalid, but the refreshToken is valid, a new accessToken is generated and sent back to the client.
 * this takes into account the expiry time of both tokens.
 * as of yet, no user permissions are encoded into the access token and no database query is made to check the validity of the user.
 */
export async function middleware(req: NextRequest) {
    try {
        const accessToken = req.cookies.get("access_token")?.value;
        const refreshToken = req.cookies.get("refresh_token")?.value;

        const accessPayload = await verifyAccessToken(accessToken!);
        const refreshPayload = await verifyRefreshToken(refreshToken!);

        const shouldBeRefreshed = accessPayload == null;
        const canBeRefreshed = refreshPayload != null;

        if (!shouldBeRefreshed || !canBeRefreshed) {
            return NextResponse.next();
        }
        /**
         * if we get here, we have a valid refreshToken and an invalid or missing accessToken
         */
        const newAccessToken = await getAccessToken(refreshPayload.payload.sub);

        const res = NextResponse.next();

        res.cookies.set("access_token", newAccessToken, {
            httpOnly: true,
            secure: true,
            maxAge: Config.refreshTokenExpiryMs / 1000,
        });
        return res;

    } catch (err) {
        console.error("error in auth middleware:", err);
    }
}

export const config = {
    matcher: '/:path*',
}