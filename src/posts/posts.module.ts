/*
 * @Author: tuWei
 * @Date: 2022-07-07 15:01:49
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-07 18:12:55
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Posts } from './entities/posts.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Posts]), UserModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
