import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { DeleteUsersDto } from 'src/user/dto/delete-users.dto';
import { DeleteRolesDto } from './dto/delete-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll(@Query() query:QueryRoleDto) {
    return this.roleService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id,updateRoleDto);
  }

  @Delete('batch')
  removeBatch(@Body() deleteRolesDto:DeleteRolesDto){
    return this.roleService.removeBatch(deleteRolesDto.ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
