"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const drizzle_kit_1 = require("drizzle-kit");
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: './db/schema.ts',
    dialect: 'mysql',
    out: './db/drizzle',
    dbCredentials: {
        host: process.env.DATABASE_HOST || '',
        port: parseInt(process.env.DATABASE_PORT || '3306'),
        user: process.env.DATABASE_USER || '',
        password: process.env.DATABASE_PASSWORD || '',
        database: process.env.DATABASE_NAME || '',
    },
});
//# sourceMappingURL=drizzle.config.js.map