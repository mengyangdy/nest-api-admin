import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';


// 加载对应的 env 文件
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export default defineConfig({
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
