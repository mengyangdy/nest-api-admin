import { IsInt, IsOptional, IsString, MinLength } from "class-validator"

export class CreateRoleDto {
  @IsString()
  @MinLength(3, { message: "角色名称至少3个字符" })
  name:string
  @IsString()
  @MinLength(3, { message: "角色编码至少3个字符" })
  code:string
  @IsOptional()
  @IsString()
  description?:string
  @IsInt()
  status:number
}
