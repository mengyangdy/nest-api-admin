"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const schema_1 = require("../../db/schema");
const db_1 = require("../../db");
const drizzle_orm_1 = require("drizzle-orm");
let MenuService = class MenuService {
    async create(createMenuDto) {
        const existingMenu = await db_1.db.select().from(schema_1.menus).where((0, drizzle_orm_1.eq)(schema_1.menus.name, createMenuDto.name));
        if (existingMenu.length > 0) {
            throw new common_1.ConflictException('菜单名称已存在');
        }
        await db_1.db.insert(schema_1.menus).values({
            name: createMenuDto.name,
            type: createMenuDto.type,
            routeName: createMenuDto.routeName,
            routePath: createMenuDto.routePath,
            pathParam: createMenuDto.pathParam,
            order: createMenuDto.order,
            parentId: createMenuDto.parentId,
            iconType: createMenuDto.iconType,
            icon: createMenuDto.icon,
            status: createMenuDto.status
        });
        return {
            msg: '创建成功'
        };
    }
    async findAll(query) {
        const { current = 1, size = 10 } = query;
        const skip = (current - 1) * size;
        const selectFields = {
            id: schema_1.menus.id,
            name: schema_1.menus.name,
            type: schema_1.menus.type,
            routeName: schema_1.menus.routeName,
            routePath: schema_1.menus.routePath,
            pathParam: schema_1.menus.pathParam,
            order: schema_1.menus.order,
            parentId: schema_1.menus.parentId,
            iconType: schema_1.menus.iconType,
            icon: schema_1.menus.icon,
            status: schema_1.menus.status,
            createdAt: schema_1.menus.createdAt,
            updatedAt: schema_1.menus.updatedAt
        };
        const [total, records] = await Promise.all([
            db_1.db.select({ id: schema_1.menus.id }).from(schema_1.menus).where((0, drizzle_orm_1.isNull)(schema_1.menus.deletedAt)),
            db_1.db.select(selectFields).from(schema_1.menus).where((0, drizzle_orm_1.isNull)(schema_1.menus.deletedAt)).limit(size).offset(skip)
        ]);
        return {
            records,
            total: total.length,
            current,
            size
        };
    }
    async update(id, updateMenuDto) {
        const existingMenu = await db_1.db.select().from(schema_1.menus).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.menus.id, id)));
        if (existingMenu.length === 0) {
            throw new common_1.NotFoundException('菜单不存在');
        }
        if (updateMenuDto.name && updateMenuDto.name !== existingMenu[0].name) {
            const menuWithSomeMenuName = await db_1.db.select()
                .from(schema_1.menus)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.menus.name, updateMenuDto.name), (0, drizzle_orm_1.isNull)(schema_1.menus.deletedAt)));
            if (menuWithSomeMenuName.length > 0) {
                throw new common_1.ConflictException('菜单名已存在');
            }
        }
        const updateData = {};
        if (updateMenuDto.name)
            updateData.name = updateMenuDto.name;
        await db_1.db.update(schema_1.menus).set(updateData).where((0, drizzle_orm_1.eq)(schema_1.menus.id, id));
        return {
            msg: `更新成功`
        };
    }
    async remove(id) {
        const existingMenu = await db_1.db.select()
            .from(schema_1.menus)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.menus.id, id), (0, drizzle_orm_1.isNull)(schema_1.menus.deletedAt)));
        if (existingMenu.length === 0) {
            throw new common_1.NotFoundException('用户不存在');
        }
        await db_1.db.update(schema_1.menus)
            .set({
            deletedAt: (0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`
        })
            .where((0, drizzle_orm_1.eq)(schema_1.menus.id, id));
        return {
            msg: '用户删除成功'
        };
    }
    async removeBatch(ids) {
        const results = {
            success: [],
            failed: []
        };
        for (const id of ids) {
            try {
                const existingMenu = await db_1.db.select()
                    .from(schema_1.menus)
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.menus.id, id), (0, drizzle_orm_1.isNull)(schema_1.menus.deletedAt))).limit(1);
                if (existingMenu.length === 0) {
                    results.failed.push({
                        id,
                        reason: '菜单不存在或已被删除'
                    });
                }
            }
            catch (error) {
                results.failed.push({ id, reason: error.message || '删除失败' });
            }
        }
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)()
], MenuService);
//# sourceMappingURL=menu.service.js.map