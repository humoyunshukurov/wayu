import {Column, Entity, OneToMany} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {News} from "@/featuress/common/entities/news";

@Entity('newsCategories')
export class NewsCategories extends BaseModel{
    @Column({length:64,nullable:true})
    title!:string

    @OneToMany(()=>News,(news)=>news.newsCategory)
    news:News;
}