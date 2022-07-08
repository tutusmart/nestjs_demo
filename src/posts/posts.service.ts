/*
 * @Author: tuWei
 * @Date: 2022-07-07 15:03:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-09 01:43:09
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { UserService } from 'src/user/user.service';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { QueryPostDto } from './dto/query-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './entities/posts.entity';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
    @InjectEntityManager()
    private manager: EntityManager,
    private dataSource: DataSource,
  ) {}

  async create(createPostDto: any) {
    const { user } = createPostDto;
    const p = new Posts();
    p.createdAt = new Date();
    p.updatedAt = new Date();
    p.title = createPostDto.title;
    p.remake = createPostDto.remake;
    p.content = createPostDto.content;
    p.user = user;
    const c = new Category();
    c.id = createPostDto.categories[0];
    const c1 = new Category();
    c1.id = createPostDto.categories[1];
    p.categories = [c, c1];
    console.log(p);
    return await this.dataSource.manager.save(p);
    // createPostDto.createdAt = new Date();
    // createPostDto.updatedAt = new Date();
    // const category1 = new Category();
    // category1.name = createPostDto.categories[0];
    // category1.remake = createPostDto.remake;
    // this.manager.save(category1)
    // createPostDto.user = user;
    // const posts = new Posts();
    // posts.title = createPostDto.title;
    // posts.content = createPostDto.content;
    // console.log(createPostDto);
    // console.log('==========',c);
    // return await this.dataSource.manager.save(c);
  }

  async findAll(queryDto: QueryPostDto) {
    const { userId, current, pageSize, title } = queryDto;
    let sql = 'select p.*,u.username,u.cellphone from posts p left join user u on u.id = ' +`'${userId}'` + ' where userId =' + `'${userId}' and title ` + `Like '%${title}%'` + ` limit ${(current - 1) * pageSize}, ${pageSize}`;
    const data = await this.postRepository.query(sql);
    // const user = await this.userService.findOne(userId);
    return {
      data: data
    }
  }

  async findOne( id: string){
    let sql = 'select p.*,u.username,u.cellphone from posts p left join user u on u.id = p.userId where p.id =' + `'${id}'`;
    const data = await this.postRepository.query(sql);
    if(data && data.length > 0){
      return data[0];
    }else {
      throw new NotFoundException('user is null');
    }
  }

  async update(uto: UpdatePostDto){
    uto.updatedAt = new Date();
    const { id } = uto; 
    return await this.postRepository.update(id, uto);
  }

  async remove(uto: UpdatePostDto){
    const { id } = uto;
    const userIndex = await this.findOne(id);
    return this.postRepository.remove(userIndex);
  }
}
