/*
 * @Author: tuWei
 * @Date: 2022-07-02 11:40:07
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-07 00:43:13
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
  async getUserById(@Query('version') id: string) {
    const data = await this.userService.findOne(id);
    return {
      message: '查询成功',
      data,
    };
  }

  @Post('postList')
  userListDto(@Body() cud: CreateUserDto) {
    return cud;
  }

  @Post('addUser')
  async createUser(@Body() cud: CreateUserDto) {
    const data = await this.userService.create(cud);
    return {
      data,
      message: '查询成功',
    };
  }

  @Post('update')
  async updateUser(@Body() updateUser: UpdateUserDto) {
    // const data = await this.userService.findOne(updateUser.id);
    const user = await this.userService.update(updateUser.id, updateUser);
    return {
      message: '修改成功',
      data: user,
    };
  }

  @Post('remove')
  async removeUser(@Body('id') id: any) {
    const user = await this.userService.remove(id);
    return {
      data: user,
    };
  }
}
