import { IsString, IsEmail, IsOptional, IsInt, IsArray, MinLength, Matches, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: "用户名至少3个字符" })
  username: string;

  @IsOptional()
  @IsEmail({}, { message: "邮箱格式不正确" })
  email?: string;

  @IsOptional()
  @IsString()
  @Length(11, 11, { message: "手机号必须是11位" })
  @Matches(/^1[3-9]\d{9}$/, { message: "手机号格式不正确" })
  phone?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsInt()
  gender?: number; // 性别：0-未知，1-男，2-女

  @IsOptional()
  @IsInt()
  status?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  userRoles?: number[]; // 角色ID数组
}
