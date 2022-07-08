/*
 * @Author: tuWei
 * @Date: 2022-07-08 16:19:01
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-08 18:25:34
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createDto: any) {
    createDto.createdAt = new Date();
    createDto.updatedAt = new Date();
    // const data = this.CategoryRepository.create(createDto);
    return this.categoryRepository.save(createDto);
  }

  findAll(qto: any) {
    const { current, pageSize, name } = qto;
    const sql = `select * from category where name Like '%` +name + `%' limit ${(current - 1) * pageSize}, ${pageSize}`;
    console.log(sql);
    return this.categoryRepository.query(sql);
  }
}
