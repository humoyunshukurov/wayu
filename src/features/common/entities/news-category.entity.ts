import {Column, Entity, OneToMany} from 'typeorm';
import type {Relation} from 'typeorm';
import {BaseModel} from '@/core/base-model';
import {NewsEntity} from "@/features/news/news/news.entity";


@Entity('news_categories')
export class NewsCategory extends BaseModel {
    @Column({length: 64, unique: true})
    title!: string;

    @OneToMany(() => NewsEntity, news => news.category)
    news?: Relation<NewsEntity>
}