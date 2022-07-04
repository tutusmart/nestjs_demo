/*
 * @Author: tuWei
 * @Date: 2022-07-02 12:32:41
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-04 12:55:39
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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
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

  @ManyToMany(type => Dept, dept => dept.puser)
  @JoinTable()
  depts: Dept[];
}
