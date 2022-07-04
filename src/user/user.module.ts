/*
 * @Author: tuWei
 * @Date: 2022-07-02 12:21:07
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-02 21:36:15
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Dept } from './entities/dept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Dept])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
