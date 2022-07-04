/*
 * @Author: tuWei
 * @Date: 2022-07-03 23:03:22
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-03 23:04:16
 */
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { IsString } from 'class-validator';
export class QueryUserDto extends PaginationQueryDto {
  @IsString()
  userName: string;

  @IsString()
  cellphone: string;
}
