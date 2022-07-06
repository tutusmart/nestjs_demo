/*
 * @Author: tuWei
 * @Date: 2022-07-02 12:32:41
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-06 15:24:39
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Dept } from './dept.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({
    select: true,
  })
  password: string;

  @Column()
  sex: number;

  @Column()
  cellphone: string;

  @Column()
  hobby: string;

  @Column()
  dateOfBirth: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  job: string;

  @Column()
  remake: string;

  @Column({
    select: false,
  })
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToMany((type) => Dept, (dept) => dept.puser)
  @JoinTable()
  depts: Dept[];
}
