/*
 * @Author: tuWei
 * @Date: 2022-07-08 16:19:01
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-13 19:39:24
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private dataSource: DataSource,
  ) {}

  create(createDto: any) {
    createDto.createdAt = new Date();
    createDto.updatedAt = new Date();
    return this.categoryRepository.save(createDto);
  }

  async findAll(qto: any) {
    const { current, pageSize, name } = qto;
    const sql = `select c.*,pcc.postsId,p.title, COUNT(p.id) postNum  from category c 
    left JOIN posts_categories_category pcc 
    on c.id = pcc.categoryId 
    LEFT JOIN posts p 
    ON p.id = pcc.postsId 
    where name Like '%` + name + `%' 
    GROUP BY c.id 
    limit ${(current - 1) * pageSize}, ${pageSize}`;
    const data = await this.categoryRepository.query(sql);
    const total =  await this.categoryRepository.query(`select count(id) total from category`);
    return {
      data,
      total: Number(total[0].total),
      message: '查询成功',
      flag: true,
    }
  }

  async findOne(id: string){
    const sql = `select * from category where id = '${id}'`;
    const data = await this.categoryRepository.query(sql);
    if(!data){
      throw new NotFoundException('category is null');
    }
    return data[0]
  }

  async update(pam: any){
    if(pam.id){
      const sql = `update category set name = '${pam.name}', remake = '${pam.remake}', updatedAt = '${new Date().toLocaleDateString()}'  where id = '${pam.id}'`;
      const data = await this.categoryRepository.query(sql);
      return data
    } else {
      throw new NotFoundException('categoryId is null');
    }
  }

  async delete(pam: any){
    if(pam.id) {
      const sql = `delete from category  where id = '${pam.id}'`;
      const data = await this.dataSource.query(sql);;
      return data;
    }else {
      throw new NotFoundException('delete need ID');
    }
  }
}
