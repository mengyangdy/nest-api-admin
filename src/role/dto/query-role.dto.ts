import { Transform, Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class QueryRoleDto {
  @IsOptional()
  @Type(()=>Number)
  @IsInt()
  @Min(1)
  current?: number = 1;

  @IsOptional()
  @Type(()=>Number)
  @IsInt()
  @Min(1)
  size?: number = 10;
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  code?: string;
  @IsOptional()
  @Transform(({value})=>value === '' || value === null || value === undefined ? undefined : Number(value))
  @IsInt()
  status?: number;
}
