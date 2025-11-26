import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2/promise';

import * as schema from './schema';

// 加载对应的 env 文件
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

// 创建连接池配置
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

// 创建连接池
const pool = createPool(poolConfig);

// 创建 Drizzle 实例
const db = drizzle(pool, { schema, mode: 'default' });

export { db, pool };
