import { cookies } from "next/headers";
import { verifyAccessToken } from "./authService";

export async function getServerSideAuth() {
    try {
        const accessToken = cookies().get("access_token")?.value;

        const accessTokenPayload = await verifyAccessToken(accessToken!);

        return {
            isSignedIn: true,
            session: {
                userId: accessTokenPayload.sub,
            },
        } as const;
    } catch (err) {
        return {
            isSignedIn: false,
        } as const;
    }
}