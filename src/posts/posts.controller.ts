/*
 * @Author: tuWei
 * @Date: 2022-07-07 15:02:53
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-12 12:55:33
 */
import { Body, Controller, Post, UseGuards, Request, Get, Param } from '@nestjs/common';
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { QueryPostDto } from './dto/query-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuardUser)
  async createUser(@Body() qto: CreatePostDto, @Request() req) {
    qto.user = req.user.userId;
    const data = await this.postsService.create(qto);
    return {
      data,
      flag: true,
      message: '添加成功',
    };
  }

  @Post('list')
  @UseGuards(JwtAuthGuardUser)
  async getList(@Body() qto: QueryPostDto, @Request() req) {
    qto.userId = req.user.userId;
    const data = await this.postsService.findAll(qto);
    return {
      ...data,
      flag: true,
    };
  }

  @Get('/queryById/:id')
  @UseGuards(JwtAuthGuardUser)
  async queryById(@Param() params: UpdatePostDto, @Request() req) {
    const data = await this.postsService.findOne(params.id);
    return {
      flag: true,
      data,
    };
  }

  @Post('updateById')
  @UseGuards(JwtAuthGuardUser)
  async updateById(@Body() uto: UpdatePostDto, @Request() req) {
    uto.user = req.user.userId;
    const data = await this.postsService.update(uto);
    return {
      message: '更新成功',
      flag: true,
      data,
    };
  }

  @Get('/remove/:id')
  @UseGuards(JwtAuthGuardUser)
  async remove(@Param() params: UpdatePostDto, @Request() req) {
    const data = await this.postsService.remove(params);
    return {
      flag: true,
      data,
    };
  }
}
function Transaction() {
  throw new Error('Function not implemented.');
}

