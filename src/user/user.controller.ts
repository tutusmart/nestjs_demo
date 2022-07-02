/*
 * @Author: tuWei
 * @Date: 2022-07-02 11:40:07
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-02 13:01:39
 */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  @Get('userList')
  getUserList(): string {
    return 'hello this userList';
  }

  @Get(':id')
  getUserById(@Param('id') id: string): string {
    console.log(id);
    return `hello this userList ${id}`;
  }

  @Post('postList')
  userListDto(@Body() cud: CreateUserDto) {
    console.log(cud);
    return cud;
  }
}
