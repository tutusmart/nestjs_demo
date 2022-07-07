/*
 * @Author: tuWei
 * @Date: 2022-07-02 12:32:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-07 23:43:23
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @ApiProperty()
  user:string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  remake: string;

}
