/*
 * @Author: tuWei
 * @Date: 2022-07-02 12:11:34
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-08 17:48:01
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryUserDto } from './dto/query-user.dto';
import { Like, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { cryptoString } from '../libs/lib';

import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAndCount() {
    return await this.userRepository.findAndCount();
  }

  async findAll(queryDto: QueryUserDto) {
    const { current, pageSize, username, cellphone } = queryDto;
    // return await this.userRepository.find({
    //   where: {
    //     username: Like(`%${username}%`),
    //     cellphone: Like(`%${cellphone}%`),
    //   },
    //   skip: current - 1,
    //   take: (current - 1) * pageSize,
    // });
    let sql = 'select * from user where username ' + `LIKE '%${username}%' or `+ 'cellphone ' + `LIKE '%${cellphone}%'` + ` limit ${(current - 1) * pageSize}, ${pageSize}`;
    console.log(sql);
    return await this.userRepository.query(sql)
  }

  create(createUserDto: any) {
    const { password, createdAt } = createUserDto;
    createUserDto.password = cryptoString(password);
    createUserDto.createdAt = createdAt || new Date();
    createUserDto.updatedAt = new Date();
    return this.userRepository.save(createUserDto);
  }

  async findOne(id: any) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException('user is null');
    }
    return user;
  }

  async findOneByName(username: any): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    return user;
  }

  

  async update(id: string, updateUserDto: UpdateUserDto) {
    updateUserDto.updatedAt = new Date();
    const isExist = await this.userRepository.count({
      where: {
        id,
      },
    });
    if (isExist > 1) {
      return {
        statusCode: 201,
        message: '已存在',
      };
    }
    return await this.userRepository.update(id, updateUserDto);
    // const user = await this.userRepository.preload({
    //   id: id,
    //   ...updateUserDto,
    // });
    // console.log('=====', id);
    // if (!user) {
    //   throw new NotFoundException('user is null');
    // }
    // return this.userRepository.save(user);
  }

  async remove(id: string) {
    const userIndex = await this.findOne(id);
    return this.userRepository.remove(userIndex);
  }
}
