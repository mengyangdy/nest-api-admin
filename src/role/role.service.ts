import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { db } from "../../db";
import { roles } from "../../db/schema";
import { and, eq, isNull, like, sql } from "drizzle-orm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { QueryRoleDto } from "./dto/query-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Injectable()
export class RoleService {
  async create(createRoleDto: CreateRoleDto) {
    const existingRole=await db.select().from(roles).where(eq(roles.name, createRoleDto.name))
    if(existingRole.length >0){
      throw new ConflictException('角色名称已存在')
    }
    await db.insert(roles).values({
      name: createRoleDto.name,
      code: createRoleDto.code,
      description: createRoleDto.description,
      status: createRoleDto.status
    })
    return {
      msg:'创建成功'
    }
  }

  async findAll(query:QueryRoleDto) {
    const {
      current =1 ,
      size=10,
      status,
      name,
      code
    }=query
    const conditions:any[]=[]
    if(status !== undefined && status !== null ){
      conditions.push(eq(roles.status, status))
    }
    if(name && name.trim() !== ''){
      conditions.push(like(roles.name, `%${name}%`))
    }
    if(code && code.trim() !== ''){
      conditions.push(like(roles.code, `%${code}%`))
    }

    const skip = (current - 1) * size

    const notDeletedCondition=isNull(roles.deletedAt)
    const allConditions=conditions.length >0 ?and(...conditions,notDeletedCondition):notDeletedCondition

    const selectFields={
      id:roles.id,
      name:roles.name,
      code:roles.code,
      description:roles.description,
      status:roles.status,
      createdAt:roles.createdAt,
      updatedAt:roles.updatedAt
    }

    const [total,records]=await Promise.all([
      db.select({id:roles.id}).from(roles).where(allConditions),
      db.select(selectFields).from(roles).where(allConditions).limit(size).offset(skip)
    ])
    return {
      records,
      total:total.length,
      current,
      size
    }
  }

  async update(id: number,updateRoleDto:UpdateRoleDto) {
    const existingRole=await db.select().from(roles).where(and(eq(roles.id,id),isNull(roles.deletedAt)))
    if(existingRole.length === 0){
      throw new NotFoundException('角色不存在')
    }

    if(updateRoleDto.name && updateRoleDto.name !== existingRole[0].name){
      const roleWithSameName=await db.select().from(roles).where(and(eq(roles.name,updateRoleDto.name),isNull(roles.deletedAt)))
      if(roleWithSameName.length >0){
        throw new ConflictException('角色名称已存在')
      }
    }
    const updateData:any={}
    if(updateRoleDto.name){
      updateData.name=updateRoleDto.name
    }
    if(updateRoleDto.code){
      updateData.code=updateRoleDto.code
    }
    if(updateRoleDto.description){
      updateData.description=updateRoleDto.description
    }
    if(updateRoleDto.status !== undefined){
      updateData.status=updateRoleDto.status
    }
    await db.update(roles).set(updateData).where(eq(roles.id,id))
    return {
      msg:'更新成功'
    }
}


  async remove(id: number) {
    const existingRole=await db.select().from(roles).where(and(eq(roles.id,id),isNull(roles.deletedAt)))
    if(existingRole.length === 0){
      throw new NotFoundException('角色不存在')
    }
    await db.update(roles).set({deletedAt:sql`CURRENT_TIMESTAMP`}).where(eq(roles.id,id))
    return {
      msg:'删除成功'
    }
  }
  async removeBatch(ids:number[]){
    const results = {
      success: [] as number[],    // 成功删除的ID
      failed: [] as { id: number, reason: string }[], // 失败的ID及原因
    };
    for (const id of ids) {
      try {
        // 检查用户是否存在
        const existingRole = await db.select()
          .from(roles)
          .where(and(eq(roles.id, id), isNull(roles.deletedAt)))
          .limit(1);
        
        if (existingRole.length === 0) {
          results.failed.push({ id, reason: '角色不存在或已被删除' });
          continue;
        }
        
        // 执行删除
        await db.update(roles)
          .set({ deletedAt: sql`CURRENT_TIMESTAMP` })
          .where(eq(roles.id, id));
        
        results.success.push(id);
        
      } catch (error) {
        results.failed.push({ id, reason: error.message || '删除失败' });
      }
    }
        // 如果全部失败，抛异常
        if (results.success.length === 0) {
          throw new NotFoundException({
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
}
