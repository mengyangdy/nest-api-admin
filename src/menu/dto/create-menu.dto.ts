import { IsInt, IsOptional, IsString, MinLength } from "class-validator"

export class CreateMenuDto {
  @IsInt()
  type:number
  @MinLength(3,{message:'菜单名最少3个字符'})
  @IsString()
  name:string
  @IsOptional()
  @IsString()
  routeName?:string
  @IsOptional()
  @IsString()
  routePath?:string
  @IsOptional()
  @IsString()
  pathParam?:string
  @IsInt()
  order:number
  @IsOptional()
  @IsInt()
  parentId?:number
  @IsInt()
  iconType:number
  @IsOptional()
  @IsString()
  icon?:string
  @IsOptional()
  @IsInt()
  status?:number
}
