import { IsArray, IsInt, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteUsersDto {
  @IsArray()
  @ArrayMinSize(1, { message: '至少选择一个用户删除' })
  @IsInt({ each: true })
  @Type(() => Number)
  ids: number[]; // 用户ID数组
}

