import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import type {Relation} from "typeorm";
import {BaseModel} from '@/core/base-model';
import {NewsCategory} from "@/features/common/entities/news-category.entity";
import {CountriesEntity} from "@/features/common/entities/countries.entity";

@Entity('news')
export class NewsEntity extends BaseModel {

    @Column({type:"int"})
    categoryId!: number;

    @Column({type:"int",nullable:true})
    countryId!: number;

    @Column({length: 256})
    title!: string;

    @Column({length: 128})
    image!: string;

    @Column({type:"date"})
    date!: Date;

    @Column({type:"text"})
    content!: string;

    @ManyToOne(() => NewsCategory, newsCategory => newsCategory.news, {onDelete: "RESTRICT"})
    @JoinColumn({name:'categoryId'})
    category?: Relation<NewsCategory>;

    @ManyToOne(()=>CountriesEntity, country=>country.news, {onDelete: "RESTRICT"})
    @JoinColumn({name:'countryId'})
    country?: Relation<CountriesEntity>;
}
