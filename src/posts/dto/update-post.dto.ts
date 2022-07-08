/*
 * @Author: tuWei
 * @Date: 2022-07-02 12:32:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-08 15:29:58
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsDate, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
export class UpdatePostDto extends PartialType(CreatePostDto) {
  userId: string;

  user: User;

  @IsString()
  id: string;

  // @IsString()
  updatedAt: Date;
  
}
