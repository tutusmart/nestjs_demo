/*
 * @Author: tuWei
 * @Date: 2022-07-12 18:31:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-14 01:40:40
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
// 本地策略 passport-local
@Injectable()
export class LocalStrategyUser extends PassportStrategy(Strategy, 'userlocal') {
  constructor(private readonly authService: AuthService) {
    super();
  }
  // 用于验证的方法
  async validate(username: string, password: string): Promise<any> {
    console.log(username, password);
    const user = await this.authService.validateUser(username, password);
    console.log('validate', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
