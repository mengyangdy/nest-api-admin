import { sql } from 'drizzle-orm';
import { datetime, int, mysqlTable, serial, text, varchar } from 'drizzle-orm/mysql-core';

// 用户表
export const users = mysqlTable('users', {
  id: serial('id').primaryKey(), // 自增主键
  username: varchar('username', { length: 50 }).notNull().unique(), // 登录用户名
  password: varchar('password', { length: 255 }).notNull(), // 加密后的密码
  email: varchar('email', { length: 100 }), // 邮箱
  phone: varchar('phone', { length: 20 }), // 手机号
  avatar: varchar('avatar', { length: 255 }), // 头像URL
  nickname: varchar('nickname', { length: 50 }), // 昵称
  gender: int('gender').default(1), // 性别：0-未知，1-男，2-女
  status: int('status').default(1), // 用户状态：1-正常，0-禁用
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
  deletedAt: datetime('deleted_at'), // 逻辑删除时间
});

// 角色表
export const roles = mysqlTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(), // 角色名
  code: varchar('code', { length: 50 }).notNull().unique(), // 角色编码：如 ADMIN, USER, MANAGER
  description: text('description'), // 角色描述
  status: int('status').default(1), // 角色状态：1-启用，0-禁用
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
  deletedAt: datetime('deleted_at'), // 逻辑删除时间
});

// 菜单表
export const menus = mysqlTable('menus', {
  id: serial('id').primaryKey(),
  type: int('type').notNull(), // 菜单类型：1-目录，2-菜单
  name: varchar('name', { length: 50 }).notNull(), // 菜单名称
  routeName: varchar('route_name', { length: 50 }), // 前端路由名称
  routePath: varchar('route_path', { length: 255 }), // 前端路由路径
  pathParam: varchar('path_param', { length: 255 }), // 前端路由路径参数（可选）
  order: int('order').default(0), // 排序
  parentId: int('parent_id').default(0), // 父菜单ID
  iconType: int('icon_type').default(1), // 图标类型：1-iconify  ，2-内置
  icon: varchar('icon', { length: 100 }), // 图标
  status: int('status').default(1), // 状态：1-正常，0-禁用
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
  deletedAt: datetime('deleted_at'), // 逻辑删除时间
});

// 用户-角色多对多
export const userRoles = mysqlTable('user_roles', {
  id: serial('id').primaryKey(),
  userId: int('user_id').notNull(), // 对应 users.id
  roleId: int('role_id').notNull(), // 对应 roles.id
});

// 角色-菜单多对多
export const roleMenus = mysqlTable('role_menus', {
  id: serial('id').primaryKey(),
  roleId: int('role_id').notNull(), // 对应 roles.id
  menuId: int('menu_id').notNull(), // 对应 menus.id
});
