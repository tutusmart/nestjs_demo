/*
 * @Author: tuWei
 * @Date: 2022-07-08 16:18:15
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-08 18:25:53
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from 'src/posts/posts.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), PostsModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
