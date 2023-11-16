/** @type {import('next').NextConfig} */
const nextConfig = {
    /**
     * since we don't interact with any other domains other than our own api,
     * we can set or CORS and CSP to be as strict as possible.
     * 
     * TODO: tighten CSP
     */
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "same-origin" },
                    { key: "Access-Control-Allow-Headers", value: "Content-Type" },
                    // { key: "Content-Security-Policy", value: "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; font-src 'self'; frame-src 'self';" },
                    { key: "X-Content-Type-Options", value: "nosniff" },
                    { key: "X-Frame-Options", value: "SAMEORIGIN" },
                    { key: "Referrer-Policy", value: "no-referrer" },
                    { key: "X-XSS-Protection", value: "1; mode=block" },
                ]
            }
        ]
    }
}
module.exports = nextConfig
