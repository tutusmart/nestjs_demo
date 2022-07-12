/*
 * @Author: tuWei
 * @Date: 2022-07-02 20:52:59
 * @LastEditors: tuWei
 * @LastEditTime: 2022-07-12 17:26:07
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

  @ManyToMany((type) => Category, (category) => category.posts, {
    cascade: ["insert", "update"],
  })
  @JoinTable({ name: "posts_categories_category" })
  categories: Category[]

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
