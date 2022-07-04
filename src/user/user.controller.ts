/*
 * @Author: tuWei
 * @Date: 2022-07-02 11:40:07
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-04 13:00:00
 */
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('userList')
  async getUserList(@Body() queryUserDto: QueryUserDto) {
    const data = await this.userService.findAll(queryUserDto);
    const total = await this.userService.findAndCount();
    return {
      data,
      total: total[1],
    };
  }

  @Get(':id')
  async getUserById(@Query('version') id: string) {
    console.log(id);
    const data = await this.userService.findOne(id);
    return { data };
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
    };
  }

  @Post('update')
  async updateUser(@Body() updateUser: UpdateUserDto) {
    // const data = await this.userService.findOne(updateUser.id);
    const user = await this.userService.update(updateUser.id, updateUser);
    return {
      data: user,
    };
  }

  @Post('remove')
  async removeUser(@Body('id') id: any) {
    console.log('1212', id);
    const user = await this.userService.remove(id);
    return {
      data: user,
    };
  }
}
