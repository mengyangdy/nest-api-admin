import { IsNotEmpty, IsString, Matches, Length, IsEmail, IsOptional } from "class-validator";

export class RegisterDto {
  @IsNotEmpty({ message: "用户名不能为空" })
  @IsString({ message: "用户名必须是字符串" })
  username: string;

  @IsNotEmpty({ message: "密码不能为空" })
  @IsString({ message: "密码必须是字符串" })
  password: string;

  @IsNotEmpty({ message: "手机号不能为空" })
  @IsString({ message: "手机号必须是字符串" })
  @Length(11, 11, { message: "手机号必须是11位" })
  @Matches(/^1[3-9]\d{9}$/, { message: "手机号格式不正确" })
  phone: string;

  @IsOptional()
  @IsEmail({}, { message: "邮箱格式不正确" })
  email?: string;

  @IsOptional()
  @IsString({ message: "昵称必须是字符串" })
  nickname?: string;

  @IsOptional()
  @IsString({ message: "头像URL必须是字符串" })
  avatar?: string;
}