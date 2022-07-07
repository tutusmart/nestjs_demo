/*
 * @Author: tuWei
 * @Date: 2022-07-07 15:03:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-07 23:53:53
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { QueryPostDto } from './dto/query-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './entities/posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
  ) {}

  create(createPostDto: any) {
    const { user } = createPostDto;
    createPostDto.createdAt = new Date();
    createPostDto.updatedAt = new Date();
    createPostDto.user = user;
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async findAll(queryDto: QueryPostDto) {
    const { userId, current, pageSize, title } = queryDto;
    let sql = 'select p.*,u.username,u.cellphone from posts p left join user u on u.id = ' +`'${userId}'` + ' where userId =' + `'${userId}' and title ` + `Like '%${title}%'` + ` limit ${(current - 1) * pageSize}, ${pageSize}`;
    console.log(sql);
    const data = await this.postRepository.query(sql);
    // const user = await this.userService.findOne(userId);
    return {
      data: data
    }
  }

  async findOne( id: string){
    let sql = 'select p.*,u.username,u.cellphone from posts p left join user u on u.id = p.userId where p.id =' + `'${id}'`;
    console.log(sql);
    const data = await this.postRepository.query(sql);
    if(data && data.length > 0){
      return data[0];
    }else {
      throw new NotFoundException('user is null');
    }
  }

  async update(uto: UpdatePostDto){
    uto.updatedAt = new Date();
    console.log(uto);
    const { id } = uto; 
    uto.user = uto.userId;
    return await this.postRepository.update(id, uto);
  }
}
