/*
 * @Author: tuWei
 * @Date: 2022-07-06 12:44:41
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-14 01:41:15
 */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../../libs/lib';

@Injectable()
export class JwtStrategyUser extends PassportStrategy(Strategy, 'userjwt') {
  
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  public getRequest(context: ExecutionContext): Request {
    console.log(context);
    return context.switchToHttp().getRequest<Request>();
  }

  async validate(payload: any) {
    console.log('jwt ->payload', payload);
    return {
      ...payload
    };
  }
}
