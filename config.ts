const Config = {
    accessTokenExpiryMs: 15 * 60 * 1000, // 15 mins
    refreshTokenExpiryMs: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const;
export default Config;