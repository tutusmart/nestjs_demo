/*
 * @Author: tuWei
 * @Date: 2022-07-02 12:32:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-07 23:52:35
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsDate, IsString } from 'class-validator';
export class UpdatePostDto extends PartialType(CreatePostDto) {
  userId: string;

  user: string;

  @IsString()
  id: string;

  // @IsString()
  updatedAt: Date;
  
}
