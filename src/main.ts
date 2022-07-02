/*
 * @Author: tuWei
 * @Date: 2022-07-02 10:44:27
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-02 13:31:37
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
