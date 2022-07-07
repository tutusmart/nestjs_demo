/*
 * @Author: tuWei
 * @Date: 2022-07-02 20:52:59
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-07 23:54:59
 */
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  remake: string;

  @ManyToOne(() => User, user => user.posts)
  user: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
