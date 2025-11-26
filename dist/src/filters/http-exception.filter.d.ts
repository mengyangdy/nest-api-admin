import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
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
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
