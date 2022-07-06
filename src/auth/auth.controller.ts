/*
 * @Author: tuWei
 * @Date: 2022-07-05 16:04:57
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-07 00:33:08
 */
//UseGuards 路由守卫
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuardUser } from './guards/local-auth.guard';
import { Log } from 'src/libs/utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuardUser)
  async login(@Request() req) {
    console.log('user auth ctrl', req.user);
    Log({ req, user: req.user });
    return this.authService.login(req.user);
  }
}
