/*
 * @Author: tuWei
 * @Date: 2022-07-02 12:32:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-08 19:34:55
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreatePostDto {
  @IsString()
  title: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  remake: string;

  @ApiProperty()
  @IsArray()
  categories: [];
}
