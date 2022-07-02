/*
 * @Author: tuWei
 * @Date: 2022-07-02 12:21:07
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-02 12:22:29
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
