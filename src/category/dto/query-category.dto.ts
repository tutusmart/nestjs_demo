/*
 * @Author: tuWei
 * @Date: 2022-07-03 23:03:22
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-08 17:59:55
 */
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { IsString } from 'class-validator';
export class QueryCategoryDto extends PaginationQueryDto {
  
  @IsString()
  name: string;
}
