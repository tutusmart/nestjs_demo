/*
 * @Author: tuWei
 * @Date: 2022-07-02 22:13:53
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-03 22:56:48
 */
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';
export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  current: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  pageSize: number;
}
