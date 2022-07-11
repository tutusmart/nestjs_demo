/*
 * @Author: tuWei
 * @Date: 2022-07-03 23:03:22
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-11 15:11:50
 */
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { IsString } from 'class-validator';
export class QueryPostDto extends PaginationQueryDto {
  
  userId: string;
  @IsString()
  username: string;
  
  @IsString()
  title: string;
}
