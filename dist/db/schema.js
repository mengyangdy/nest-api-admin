"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMenus = exports.userRoles = exports.menus = exports.roles = exports.users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.users = (0, mysql_core_1.mysqlTable)('users', {
    id: (0, mysql_core_1.serial)('id').primaryKey(),
    username: (0, mysql_core_1.varchar)('username', { length: 50 }).notNull().unique(),
    password: (0, mysql_core_1.varchar)('password', { length: 255 }).notNull(),
    email: (0, mysql_core_1.varchar)('email', { length: 100 }),
    phone: (0, mysql_core_1.varchar)('phone', { length: 20 }),
    avatar: (0, mysql_core_1.varchar)('avatar', { length: 255 }),
    nickname: (0, mysql_core_1.varchar)('nickname', { length: 50 }),
    gender: (0, mysql_core_1.int)('gender').default(1),
    status: (0, mysql_core_1.int)('status').default(1),
    createdAt: (0, mysql_core_1.datetime)('created_at').default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, mysql_core_1.datetime)('updated_at').default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
    deletedAt: (0, mysql_core_1.datetime)('deleted_at'),
});
exports.roles = (0, mysql_core_1.mysqlTable)('roles', {
    id: (0, mysql_core_1.serial)('id').primaryKey(),
    name: (0, mysql_core_1.varchar)('name', { length: 50 }).notNull().unique(),
    code: (0, mysql_core_1.varchar)('code', { length: 50 }).notNull().unique(),
    description: (0, mysql_core_1.text)('description'),
    status: (0, mysql_core_1.int)('status').default(1),
    createdAt: (0, mysql_core_1.datetime)('created_at').default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, mysql_core_1.datetime)('updated_at').default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
    deletedAt: (0, mysql_core_1.datetime)('deleted_at'),
});
exports.menus = (0, mysql_core_1.mysqlTable)('menus', {
    id: (0, mysql_core_1.serial)('id').primaryKey(),
    type: (0, mysql_core_1.int)('type').notNull(),
    name: (0, mysql_core_1.varchar)('name', { length: 50 }).notNull(),
    routeName: (0, mysql_core_1.varchar)('route_name', { length: 50 }),
    routePath: (0, mysql_core_1.varchar)('route_path', { length: 255 }),
    pathParam: (0, mysql_core_1.varchar)('path_param', { length: 255 }),
    order: (0, mysql_core_1.int)('order').default(0),
    parentId: (0, mysql_core_1.int)('parent_id').default(0),
    iconType: (0, mysql_core_1.int)('icon_type').default(1),
    icon: (0, mysql_core_1.varchar)('icon', { length: 100 }),
    status: (0, mysql_core_1.int)('status').default(1),
    createdAt: (0, mysql_core_1.datetime)('created_at').default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`),
    updatedAt: (0, mysql_core_1.datetime)('updated_at').default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
    deletedAt: (0, mysql_core_1.datetime)('deleted_at'),
});
exports.userRoles = (0, mysql_core_1.mysqlTable)('user_roles', {
    id: (0, mysql_core_1.serial)('id').primaryKey(),
    userId: (0, mysql_core_1.int)('user_id').notNull(),
    roleId: (0, mysql_core_1.int)('role_id').notNull(),
});
exports.roleMenus = (0, mysql_core_1.mysqlTable)('role_menus', {
    id: (0, mysql_core_1.serial)('id').primaryKey(),
    roleId: (0, mysql_core_1.int)('role_id').notNull(),
    menuId: (0, mysql_core_1.int)('menu_id').notNull(),
});
//# sourceMappingURL=schema.js.map