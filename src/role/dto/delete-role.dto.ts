import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt } from "class-validator";

export class DeleteRolesDto {
  @IsArray()
  @ArrayMinSize(1,{
    message: "至少选择一个角色删除"
  })
  @IsInt({
    each: true
  })
  @Type(() => Number)
  ids: number[];
}