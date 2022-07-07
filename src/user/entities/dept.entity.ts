/*
 * @Author: tuWei
 * @Date: 2022-07-02 20:52:59
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-07 17:01:17
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Dept {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  deptName: string;

  @Column()
  code: string;

  @Column()
  remake: string;

  // @ManyToMany((type) => User, (user) => user.deptId)
  // puser: User[];
}
