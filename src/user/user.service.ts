/*
 * @Author: tuWei
 * @Date: 2022-07-02 12:11:34
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-04 12:58:59
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryUserDto } from './dto/query-user.dto';
import { Like, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

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
    const { current, pageSize, userName, cellphone } = queryDto;
    return await this.userRepository.find({
      where: {
        userName: Like(`%${userName}%`),
        cellphone: Like(`%${cellphone}%`),
      },
      skip: current - 1,
      take: (current - 1) * pageSize,
    });
  }

  create(createUserDto: any) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException('user is null');
    }
    console.log(user);
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const userIndex = await this.findOne(id);
    return this.userRepository.remove(userIndex);
  }
}
