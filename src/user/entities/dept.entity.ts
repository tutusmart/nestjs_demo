/*
 * @Author: tuWei
 * @Date: 2022-07-02 20:52:59
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-02 22:12:55
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Dept {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deptName: string;

  @Column()
  code: string;

  @Column()
  remake: string;

  @ManyToMany(type => User, user => user.depts)
  puser: User[];
}
