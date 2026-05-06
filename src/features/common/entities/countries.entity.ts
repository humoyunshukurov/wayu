
import {Column, Entity, OneToMany} from "typeorm";
import {BranchesEntity} from "@/features/common/entities/branches.entity";
import {NewsEntity} from "@/features/news/news/news.entity";
import type {Relation} from "typeorm";
import {BaseModel} from "@/core/base-model";


@Entity('countries')
export class CountriesEntity extends BaseModel{
    @Column({length:64,unique:true})
    title!:string

    @Column({length:128})
    flag!:string

    @OneToMany(()=>BranchesEntity,(branch)=>branch.country)
    branch!:Relation <BranchesEntity>

    @OneToMany(()=>NewsEntity,(news)=>news.country)
    news!:Relation <NewsEntity>;
}