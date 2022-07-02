/*
 * @Author: tuWei
 * @Date: 2022-07-02 12:32:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-02 13:15:09
 */
import { IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsInt()
  age: number;
  @IsString()
  remake: string;
}
