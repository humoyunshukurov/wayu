import {Column, Entity, ManyToOne} from 'typeorm';
import type {Relation} from "typeorm";
import {BaseModel} from '@/core/base-model';
import {NewsCategory} from "@/features/common/entities/news-category.entity";
import {CountriesEntity} from "@/features/common/entities/countries.entity";

@Entity('news')
export class NewsEntity extends BaseModel {

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