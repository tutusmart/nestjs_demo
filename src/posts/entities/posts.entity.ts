/*
 * @Author: tuWei
 * @Date: 2022-07-02 20:52:59
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-09 01:38:31
 */
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';

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
  user: User;

  @ManyToMany((type) => Category, (category) => category.posts)
  @JoinTable()
  categories: Category[]

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
