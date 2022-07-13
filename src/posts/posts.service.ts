/*
 * @Author: tuWei
 * @Date: 2022-07-07 15:03:02
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-13 19:41:25
 */
import { Injectable, NotFoundException, Post } from '@nestjs/common';
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
    let p = new Posts();
    Object.assign(p, createPostDto);
    p.createdAt = new Date();
    p.updatedAt = new Date();
    p.user = user;
    //处理分类映射对象
    if(createPostDto.categories && createPostDto.categories.length > 0){
      const categories = [];
      createPostDto.categories.forEach(element => {
        let c = new Category();
        c.id = element;
        categories.push(c);
      });
      p.categories = categories;
    }
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
    // 自定义sql语句插入数据
    // console.log(this.dataSource, '==================');
    // let a1 = await this.dataSource.query(`INSERT into category(id, name, remake, updatedAt, createdAt) values('', '测试一下', '备注一下', '2022-07-11 12:28:01', '2022-07-11 12:28:01')`);
    const { userId, current, pageSize, title, username } = queryDto;
    let sql = `select p.*, u.username, u.cellphone, pcc.*,c.name, group_concat(c.name) cNames, count(p.id) cNum from posts p 
    left join user u 
    on u.id = 
    '${userId}' 
    left join posts_categories_category pcc 
    on p.id = pcc.postsId 
    left join category c 
    on c.id = pcc.categoryId 
    where userId = '${userId}' 
    and title Like '%${title}%' and username Like '%${username}%'
    GROUP BY p.id 
    limit ${(current - 1) * pageSize}, ${pageSize}`;
    const data = await this.postRepository.query(sql);
    const total =  await this.postRepository.query(`select count(id) total from posts`);
    // const list1 =  await this.postRepository.query(`update user set username = '涂威' where id = '8aafc8c3-2148-4174-b54d-32ab578ea066'`);
    // console.log(list1);
    // const user = await this.userService.findOne(userId);
    return {
      data: data,
      total: Number(total[0].total)
    }
  }

  async findOne( id: string){
    let sql = `select p.*,u.username,u.cellphone, group_concat(c.id) categories from posts p 
              left join user u on u.id = p.userId 
              left join posts_categories_category pcc  
              on pcc.postsId = p.id 
              left join category c 
              on c.id = pcc.categoryId
              where p.id = '${id}'
              GROUP BY p.id`;
    const data = await this.postRepository.query(sql);
    if(data && data.length > 0){
      if(data[0].categories){
        data[0].categories = data[0].categories.split(',');
      }
      return data[0];
    }else {
      throw new NotFoundException('user is null');
    }
  }

  async update(uto: UpdatePostDto){
    const { id } = uto; 
    const { user } = uto;
    uto.updatedAt = new Date();
    uto['createdAt'] = new Date();
    const categories = 
    await this.dataSource
          .createQueryBuilder()
          .relation(Posts, "categories")
          .of(id) // you can use just post id as well
          .loadMany()
    uto.user = user;
    if(categories.length > 0) {
      await this.dataSource
            .createQueryBuilder()
            .relation(Posts, "categories")
            .of(id)
            .remove(categories.map(v=> v.id))
    }
    
     //新增现在的分类数据
    if(uto.categories && uto.categories.length > 0) {
        await this.dataSource
          .createQueryBuilder()
          .relation(Posts, "categories")
          .of(id)
          .add(uto.categories)
    }
    //categories 不能直接update 需要上面的操作才能更新
    delete uto.categories;
    return this.dataSource
      .createQueryBuilder()
      .update(Posts)
      .set(uto)
      .where("id = :id", { id })
      .execute()
  }

  async remove(uto: UpdatePostDto){
    const { id } = uto;
    const userIndex = await this.findOne(id);
    return this.postRepository.remove(userIndex);
  }
}
