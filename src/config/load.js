import dotenv from 'dotenv';

dotenv.config();

const envMap = {
    serverPort: "API_HOST_PORT",
    authTokenKey: "TOKEN_KEY",
    authTokenExpiry: "TOKEN_EXPIRY",

    sendgridApiKey: "SENDGRID_API_KEY",

    dbHost: "DB_HOST",
    dbName: "DB_DATABASE",
    dbUser: "DB_USER",
    dbPassword: "DB_PASSWORD",
    dbPort: "DB_PORT",
    stripeAPIKey: "STRIPE_API_KEY",
    stripeWebhookSecret: "STRIPE_WEBHOOK_SECRET"
}

let env = {};

for (const envKey in envMap) {
    env[envKey] = process.env[envMap[envKey]];
    if (!env[envKey]) throw new Error(`Environment variable ${envMap[envKey]} is not defined`);
}

export default env;