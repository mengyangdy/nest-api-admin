import * as schema from './schema';
declare const pool: import("mysql2/promise").Pool;
declare const db: import("drizzle-orm/mysql2").MySql2Database<typeof schema> & {
    $client: import("mysql2/promise").Pool;
};
export { db, pool };
