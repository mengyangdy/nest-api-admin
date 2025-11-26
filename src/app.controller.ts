import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './login.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: '测试接口' })
  @ApiResponse({ status: 200, description: '获取Hello World' })
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
