/*
 * @Author: tuWei
 * @Date: 2022-07-02 12:32:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-04 12:48:22
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber } from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  id: number;
}
