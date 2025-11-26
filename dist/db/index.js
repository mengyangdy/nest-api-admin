"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.db = void 0;
const dotenv = require("dotenv");
const mysql2_1 = require("drizzle-orm/mysql2");
const promise_1 = require("mysql2/promise");
const schema = require("./schema");
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
const poolConfig = {
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '3306', 10),
    user: process.env.DATABASE_USER || '',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'nest_admin_sql',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 60000,
    charset: 'utf8mb4',
    timezone: '+08:00',
};
const pool = (0, promise_1.createPool)(poolConfig);
exports.pool = pool;
const db = (0, mysql2_1.drizzle)(pool, { schema, mode: 'default' });
exports.db = db;
//# sourceMappingURL=index.js.map