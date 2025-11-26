import { Type } from "class-transformer"
import { IsInt, IsOptional, Min } from "class-validator"

export class QueryMenuDto{
  @IsOptional()
  @Type(()=>Number)
  @IsInt()
  @Min(1)
  current?:number = 1
  @IsOptional()
  @Type(()=>Number)
  @IsInt()
  size?:number = 10
}