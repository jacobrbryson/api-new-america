export default {
    isProd: !!process.env.IS_PROD,
    port: process.env.PORT || 8080,
    info: {
        name: "New America API",
        version: 1.0,
        updated: new Date("2024-07-17")
    },
    jwt: {
        key: process.env.JWT_KEY || "jwt_key_1234",
        expiresIn: process.env.JWT_EXPIRES_IN || "10y" //10 years
    },
    conn: {
        host: process.env.CONN_HOST,
        user: process.env.CONN_USER,
        password: process.env.CONN_PASSWORD,
        database: process.env.CONN_DATABASE,
        charset: "utf8mb4",
        multipleStatements: true,
    },
    steam: {
        appId: process.env.STEAM_APP_ID,
        identity: process.env.STEAM_IDENTITY,
        key: process.env.STEAM_KEY,
        host: "partner.steam-api.com"
    }
};

