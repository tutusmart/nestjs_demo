/*
 * @Author: tuWei
 * @Date: 2022-07-05 16:04:21
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-14 01:39:51
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/user/entities/user.entity';
import { Dept } from 'src/user/entities/dept.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
// strategies文件夹下面是定义的路由守卫文件， 这里定义了2个规则，userlocal、userjwt， 
// userlocal这个规则目前就是用于验证用户登录守卫，用于判断用户是否能成功登录。
// userjwt这个守卫规则是判断是否有jwt==>token的信息，没有就拦截 使用方法  @UseGuards(LocalAuthGuardUser)
import { JwtStrategyUser } from './strategies/jwt.strategy';
import { LocalStrategyUser } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/libs/lib';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Dept]),
    PassportModule.register({ defaultStrategy: 'userjwt' }),
    //注册 jwt信息
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '365d' },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategyUser, LocalStrategyUser],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
