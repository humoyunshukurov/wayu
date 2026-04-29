import {Column, Entity, ManyToOne} from 'typeorm';
import type {Relation} from "typeorm";
import {BaseModel} from '@/core/base-model';
import {NewsCategory} from "@/features/news/news-category/news-category.entity";
import {CountriesEntity} from "@/features/content/countries/countries.entity";

@Entity('news')
export class News extends BaseModel {

    @Column()
    categoryId!: number;

    @Column()
    countryId!: number;


    @ManyToOne(() => NewsCategory, newsCategory => newsCategory.news, {onDelete: "RESTRICT"})
    category?: Relation<NewsCategory>;

    @ManyToOne(()=>CountriesEntity,country=>country.news,{onDelete: "RESTRICT"})
    country?: Relation <CountriesEntity>


    @Column({length: 256})
    title!: string;
}