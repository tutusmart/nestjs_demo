/*
 * @Author: tuWei
 * @Date: 2022-07-08 16:18:36
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-08 17:59:26
 */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuardUser } from 'src/auth/guards/jwt-auth.guard';
import { CategoryService } from './category.service';
import { QueryCategoryDto } from './dto/query-category.dto';

@Controller('category')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @UseGuards(JwtAuthGuardUser)
  async createCategory(@Body() qto: Object) {
    const data = await this.categoryService.create(qto);
    return {
      data,
      flag: true,
      message: '添加成功',
    };
  }

  @Post('categoryList')
  @UseGuards(JwtAuthGuardUser)
  async getCategoryList(@Body() qto: QueryCategoryDto) {
    console.log(qto);
    const data = await this.categoryService.findAll(qto);
    return {
      data,
      flag: true,
      message: '查询成功',
    };
  }
  
}
