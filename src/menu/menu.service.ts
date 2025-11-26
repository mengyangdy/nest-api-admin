import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { menus } from 'db/schema';
import { db } from 'db';
import { eq,isNull,and, sql } from 'drizzle-orm';

import { QueryMenuDto } from './dto/query-menu.dto';

@Injectable()
export class MenuService {
  async create(createMenuDto: CreateMenuDto) {
    const existingMenu=await db.select().from(menus).where(eq(menus.name, createMenuDto.name))
    if(existingMenu.length >0){
      throw new ConflictException('菜单名称已存在')
    }
    await db.insert(menus).values({
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
    })
    return {
      msg: '创建成功'
    }
  }

  async findAll(query: QueryMenuDto) {
    const {current =1, size =10} = query
    const skip=(current-1)*size

    const selectFields={
      id: menus.id,
      name: menus.name,
      type: menus.type,
      routeName: menus.routeName,
      routePath: menus.routePath,
      pathParam: menus.pathParam,
      order: menus.order,
      parentId: menus.parentId,
      iconType: menus.iconType,
      icon: menus.icon,
      status: menus.status,
      createdAt: menus.createdAt,
      updatedAt: menus.updatedAt
    }

    const [total,records]=await Promise.all([
      db.select({id:menus.id}).from(menus).where(isNull(menus.deletedAt)),
      db.select(selectFields).from(menus).where(isNull(menus.deletedAt)).limit(size).offset(skip)
    ])  
    return {
      records,
      total:total.length,
      current,
      size
    }
  }


  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const existingMenu=await db.select().from(menus).where(and(eq(menus.id,id)))
    if(existingMenu.length === 0){
      throw new NotFoundException('菜单不存在');
    }
    if(updateMenuDto.name && updateMenuDto.name !== existingMenu[0].name){
      const menuWithSomeMenuName=await db.select()
      .from(menus)
      .where(and(eq(menus.name ,updateMenuDto.name),isNull(menus.deletedAt)))
      if(menuWithSomeMenuName.length >0){
        throw new ConflictException('菜单名已存在')
      }
    }
    const updateData:any={}
    if(updateMenuDto.name) updateData.name=updateMenuDto.name


    await db.update(menus).set(updateData).where(eq(menus.id,id))

    return {
      msg:`更新成功`
    }
  }

  async remove(id: number) {
    const existingMenu=await db.select()
    .from(menus)
    .where(and(eq(menus.id,id),isNull(menus.deletedAt)))
    if(existingMenu.length === 0){
      throw new NotFoundException('用户不存在')
    }
    await db.update(menus)
    .set({
      deletedAt:sql`CURRENT_TIMESTAMP`
    })
    .where(eq(menus.id,id))

    return {
      msg:'用户删除成功'
    }
  }

  async removeBatch(ids:number[]){
    const results={
      success:[] as number[],
      failed:[] as {
        id:number,
        reason:string
      }[]
    }
    for(const id of ids){
      try {
        const existingMenu=await db.select()
        .from(menus)
        .where(and(eq(menus.id,id),isNull(menus.deletedAt))).limit(1)
        if(existingMenu.length === 0){
          results.failed.push({
            id,
            reason:'菜单不存在或已被删除'
          })
        }
      } catch (error) {
        results.failed.push({ id, reason: error.message || '删除失败' });
      }
    }
  }
}
