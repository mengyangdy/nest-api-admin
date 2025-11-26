import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 启用全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动过滤掉 DTO 中未定义的属性
      forbidNonWhitelisted: true, // 如果存在未定义的属性，抛出错误
      transform: true, // 自动转换类型
    }),
  );

  // 注册全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 注册全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 设置全局前缀
  app.setGlobalPrefix('api');

  //swiper
  const config = new DocumentBuilder()
    .setTitle('Nest Admin API')
    .setDescription('Nest Admin API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(5001, `0.0.0.0`);
}
bootstrap();
