import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        // 如果返回的数据已经包含 success 字段，直接返回
        if (data && typeof data === "object" && "success" in data) {
          return {
            ...data,
            timestamp: new Date().toISOString(),
          };
        }

        // 否则包装成统一格式
        return {
          code: "0000",
          success: true,
          msg: data.msg ? data.msg : "操作成功",
          data: data.data ? data.data : data,
          timestamp: new Date().toISOString(),
        };
      })
    );
  }
}
