import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";

// 定义统一的响应数据结构
export interface ApiResponse<T = any> {
  success: boolean;
  msg: string;
  data?: T;
  error?: {
    code: string;
    details?: any;
  };
  timestamp: string;
  path: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let msg: string;
    let errorCode: string = "UNKNOWN_ERROR";

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === "string") {
        msg = exceptionResponse;
      } else if (
        typeof exceptionResponse === "object" &&
        exceptionResponse !== null
      ) {
        const responseObj = exceptionResponse as any;
        msg = responseObj.message || exception.message;
        errorCode = responseObj.error || status.toString();
      } else {
        msg = exception.message;
      }
    } else {
      // 处理非 HTTP 异常
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      msg = "服务器内部错误";
      errorCode = "INTERNAL_SERVER_ERROR";
    }

    const apiResponse: ApiResponse = {
      success: false,
      msg,
      error: {
        code: errorCode,
        details: process.env.NODE_ENV === "development" ? exception : undefined,
      },
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(apiResponse);
  }
}
