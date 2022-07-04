/*
 * @Author: tuWei
 * @Date: 2022-07-02 10:44:27
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-03 23:02:09
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true, // <- Feature activated.
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      }, //全局检查修饰符类型
    }),
  );
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
