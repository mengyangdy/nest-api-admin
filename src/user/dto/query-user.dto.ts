import { IsOptional, IsInt, IsString, Min } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class QueryUserDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  current?: number = 1; // 当前页码

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  size?: number = 10; // 每页数量

  @IsOptional()
  @Transform(({ value }) => value === '' || value === null || value === undefined ? undefined : Number(value))
  @IsInt()
  status?: number; // 用户状态

  @IsOptional()
  @IsString()
  username?: string; // 用户名

  @IsOptional()
  @Transform(({ value }) => value === '' || value === null || value === undefined ? undefined : Number(value))
  @IsInt()
  gender?: number; // 用户性别：0-未知，1-男，2-女

  @IsOptional()
  @IsString()
  nickname?: string; // 昵称

  @IsOptional()
  @IsString()
  phone?: string; // 手机号

  @IsOptional()
  @IsString()
  email?: string; // 邮箱
}

