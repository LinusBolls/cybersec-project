import { cookies } from "next/headers";
import { verifyAccessToken } from "./authService";

export function getServerSideAuth() {

    try {
        const accessToken = cookies().get("access_token")?.value;

        // console.log(jwt.sign({ sub: "test-user" }, Env.refreshTokenSecret, { expiresIn: Config.refreshTokenExpiryMs }))

        const accessTokenPayload = verifyAccessToken(accessToken!);

        return {
            isSignedIn: true,
            session: accessTokenPayload,
        } as const;
    } catch (err) {
        return {
            isSignedIn: false,
        } as const;
    }
}