/** @type {import('next').NextConfig} */
const nextConfig = {
    /**
     * since we don't interact with any other domains other than our own api,
     * we can set or CORS and CSP to be as strict as possible.
     * 
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
                    /**
                     * based on the csp of https://codepen.io
                     */
                    // { key: "Content-Security-Policy", value: "default-src 'self'; base-uri 'self'; block-all-mixed-content; connect-src blob: *; font-src data: *; frame-src data: blob: *; img-src 'self' *.wp.com gravatar.com static.filestackapi.com *.buysellads.net *.buysellads.com *.carbonads.net *.doubleclick.net *.adsafeprotected.com *.unsplash.com *.googleusercontent.com avatars.githubusercontent.com data: blob:; form-action 'self'; media-src 'self'; object-src 'none'; script-src 'self' 'unsafe-eval' *.buysellads.com *.carbonads.com *.carbonads.net *.filestackapi.com *.firebaseio.com *.paypal.com *.paypalobjects.com *.braintreegateway.com *.stripe.com *.wufoo.com wufoo.com www.google.com www.gstatic.com; style-src 'unsafe-inline' *" },
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
