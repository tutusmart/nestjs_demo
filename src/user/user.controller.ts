/*
 * @Author: tuWei
 * @Date: 2022-07-02 11:40:07
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-10 13:01:18
 */
import {
  Body,
  Controller,
  Get,
  Param,
  Request,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard';
import { Log } from 'src/libs/utils';
// import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('userList')
  @UseGuards(JwtAuthGuardUser)
  async getUserList(@Body() queryUserDto: QueryUserDto, @Request() req) {
    Log({ req, user: req.user });
    const data = await this.userService.findAll(queryUserDto);
    const total = await this.userService.findAndCount();
    return {
      message: '查询成功',
      data,
      total: total[1],
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuardUser)
  async getUserById(@Param() params: UpdateUserDto) {
    const { id } = params;
    const data = await this.userService.findOne(id);
    console.log(params);
    return {
      message: '查询成功',
      flag: true,
      data,
    };
  }

  @Post('postList')
  @UseGuards(JwtAuthGuardUser)
  userListDto(@Body() cud: CreateUserDto) {
    return cud;
  }

  @Post('addUser')
  async createUser(@Body() cud: CreateUserDto) {
    const data = await this.userService.create(cud);
    return {
      data,
      message: '添加成功',
    };
  }

  @Post('update')
  @UseGuards(JwtAuthGuardUser)
  async updateUser(@Body() updateUser: UpdateUserDto) {
    console.log(updateUser);
    const user = await this.userService.update(updateUser.id, updateUser);
    return {
      message: '修改成功',
      data: user,
    };
  }

  @Post('remove')
  @UseGuards(JwtAuthGuardUser)
  async removeUser(@Body('id') id: any) {
    const user = await this.userService.remove(id);
    return {
      data: user,
    };
  }
}
