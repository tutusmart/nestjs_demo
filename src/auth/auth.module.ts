/*
 * @Author: tuWei
 * @Date: 2022-07-05 16:04:21
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-06 20:25:01
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/user/entities/user.entity';
import { Dept } from 'src/user/entities/dept.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { JwtStrategyUser } from './strategies/jwt.strategy';
import { LocalStrategyUser } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/libs/lib';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Dept]),
    PassportModule.register({ defaultStrategy: 'userjwt' }),
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
