/*
 * @Author: tuWei
 * @Date: 2022-07-05 16:04:36
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-13 19:39:06
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { cryptoString } from 'src/libs/lib';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, pass: string) {
    return await this.userService
      .findOneByName(name)
      .then((user) => {
        if (!user) {
          throw {
            data: [],
            message: '用户不存在',
            flag: false,
          };
        }
        return user;
      })
      .then((user: User) => {
        if (user.password != cryptoString(pass)) {
          return {
            data: {},
            message: '密码错误',
            flag: true,
          };
        }
        return user;
      });
  }

  // 登录
  async login(user: any) {
    const payload = {
      username: user.username,
      cellphone: user.cellphone,
      userId: user['id'],
    };
    console.log(payload.userId);
    return {
      data: user,
      message: '登录成功',
      flag: true,
      access_token: this.jwtService.sign(payload),
    };
  }
}
