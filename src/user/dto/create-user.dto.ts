/*
 * @Author: tuWei
 * @Date: 2022-07-02 12:32:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-04 12:55:36
 */
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsString()
  cellphone: string;

  @IsString()
  password: string;

  @IsNumber()
  sex: number;

  @IsString()
  hobby: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  address: string;

  @IsString()
  email: string;

  @IsString()
  job: string;

  @IsString()
  remake: string;
}
