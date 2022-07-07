/*
 * @Author: tuWei
 * @Date: 2022-07-02 10:44:27
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-07 13:47:32
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

const dbInfo = {
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
};
const { host, port, username, password } = dbInfo;
@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host,
      port,
      username,
      password,
      database: 'node_nest_api',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
