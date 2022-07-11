/*
 * @Author: tuWei
 * @Date: 2022-07-08 16:18:36
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-11 17:20:23
 */
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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
    return data;
  }
  
  @Get('/queryById/:id')
  @UseGuards(JwtAuthGuardUser)
  async queryById(@Param() params: any) {
    const { id } = params;
    const data = await this.categoryService.findOne(id);
    return {
      flag: true,
      data,
    };
  }

  @Post('/update')
  @UseGuards(JwtAuthGuardUser)
  async update(@Body() params: any) {
    console.log(params);
    const data = await this.categoryService.update(params);
    return {
      flag: true,
      data,
      message: '保存成功'
    };
  }

  @Post('/delete')
  @UseGuards(JwtAuthGuardUser)
  async delete(@Body() params: any) {
    const data = await this.categoryService.delete(params);
    return {
      flag: true,
      data,
      message: '保存成功'
    };
  }
}
