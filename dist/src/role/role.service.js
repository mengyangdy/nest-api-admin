"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../../db");
const schema_1 = require("../../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
let RoleService = class RoleService {
    async create(createRoleDto) {
        const existingRole = await db_1.db.select().from(schema_1.roles).where((0, drizzle_orm_1.eq)(schema_1.roles.name, createRoleDto.name));
        if (existingRole.length > 0) {
            throw new common_1.ConflictException('角色名称已存在');
        }
        await db_1.db.insert(schema_1.roles).values({
            name: createRoleDto.name,
            code: createRoleDto.code,
            description: createRoleDto.description,
            status: createRoleDto.status
        });
        return {
            msg: '创建成功'
        };
    }
    async findAll(query) {
        const { current = 1, size = 10, status, name, code } = query;
        const conditions = [];
        if (status !== undefined && status !== null) {
            conditions.push((0, drizzle_orm_1.eq)(schema_1.roles.status, status));
        }
        if (name && name.trim() !== '') {
            conditions.push((0, drizzle_orm_1.like)(schema_1.roles.name, `%${name}%`));
        }
        if (code && code.trim() !== '') {
            conditions.push((0, drizzle_orm_1.like)(schema_1.roles.code, `%${code}%`));
        }
        const skip = (current - 1) * size;
        const notDeletedCondition = (0, drizzle_orm_1.isNull)(schema_1.roles.deletedAt);
        const allConditions = conditions.length > 0 ? (0, drizzle_orm_1.and)(...conditions, notDeletedCondition) : notDeletedCondition;
        const selectFields = {
            id: schema_1.roles.id,
            name: schema_1.roles.name,
            code: schema_1.roles.code,
            description: schema_1.roles.description,
            status: schema_1.roles.status,
            createdAt: schema_1.roles.createdAt,
            updatedAt: schema_1.roles.updatedAt
        };
        const [total, records] = await Promise.all([
            db_1.db.select({ id: schema_1.roles.id }).from(schema_1.roles).where(allConditions),
            db_1.db.select(selectFields).from(schema_1.roles).where(allConditions).limit(size).offset(skip)
        ]);
        return {
            records,
            total: total.length,
            current,
            size
        };
    }
    async update(id, updateRoleDto) {
        const existingRole = await db_1.db.select().from(schema_1.roles).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.roles.id, id), (0, drizzle_orm_1.isNull)(schema_1.roles.deletedAt)));
        if (existingRole.length === 0) {
            throw new common_1.NotFoundException('角色不存在');
        }
        if (updateRoleDto.name && updateRoleDto.name !== existingRole[0].name) {
            const roleWithSameName = await db_1.db.select().from(schema_1.roles).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.roles.name, updateRoleDto.name), (0, drizzle_orm_1.isNull)(schema_1.roles.deletedAt)));
            if (roleWithSameName.length > 0) {
                throw new common_1.ConflictException('角色名称已存在');
            }
        }
        const updateData = {};
        if (updateRoleDto.name) {
            updateData.name = updateRoleDto.name;
        }
        if (updateRoleDto.code) {
            updateData.code = updateRoleDto.code;
        }
        if (updateRoleDto.description) {
            updateData.description = updateRoleDto.description;
        }
        if (updateRoleDto.status !== undefined) {
            updateData.status = updateRoleDto.status;
        }
        await db_1.db.update(schema_1.roles).set(updateData).where((0, drizzle_orm_1.eq)(schema_1.roles.id, id));
        return {
            msg: '更新成功'
        };
    }
    async remove(id) {
        const existingRole = await db_1.db.select().from(schema_1.roles).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.roles.id, id), (0, drizzle_orm_1.isNull)(schema_1.roles.deletedAt)));
        if (existingRole.length === 0) {
            throw new common_1.NotFoundException('角色不存在');
        }
        await db_1.db.update(schema_1.roles).set({ deletedAt: (0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP` }).where((0, drizzle_orm_1.eq)(schema_1.roles.id, id));
        return {
            msg: '删除成功'
        };
    }
    async removeBatch(ids) {
        const results = {
            success: [],
            failed: [],
        };
        for (const id of ids) {
            try {
                const existingRole = await db_1.db.select()
                    .from(schema_1.roles)
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.roles.id, id), (0, drizzle_orm_1.isNull)(schema_1.roles.deletedAt)))
                    .limit(1);
                if (existingRole.length === 0) {
                    results.failed.push({ id, reason: '角色不存在或已被删除' });
                    continue;
                }
                await db_1.db.update(schema_1.roles)
                    .set({ deletedAt: (0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP` })
                    .where((0, drizzle_orm_1.eq)(schema_1.roles.id, id));
                results.success.push(id);
            }
            catch (error) {
                results.failed.push({ id, reason: error.message || '删除失败' });
            }
        }
        if (results.success.length === 0) {
            throw new common_1.NotFoundException({
                message: '所有用户删除失败',
                details: results.failed
            });
        }
        return {
            message: `成功删除 ${results.success.length} 个，失败 ${results.failed.length} 个`,
            successCount: results.success.length,
            failedCount: results.failed.length,
            successIds: results.success,
            failedDetails: results.failed
        };
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)()
], RoleService);
//# sourceMappingURL=role.service.js.map