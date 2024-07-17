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
        expiresIn: "10y" //10 years
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
        appId: 1594280,
        identity: "newamericasteamwebapi",
        key: "B64F064A9AC958E2CA80674B2D9E760D",
        host: "partner.steam-api.com"
    }
};



