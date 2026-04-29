
import {Column, Entity, OneToMany} from "typeorm";
import {BranchesEntity} from "@/features/common/entities/branches.entity";
import {News} from "@/features/news/news/news";
import type {Relation} from "typeorm";
import {BaseModel} from "@/core/base-model";


@Entity('socialLinks')
export class CountriesEntity extends BaseModel{
    @Column({type:"string",unique:true})
    title!:string

    @Column({type:"string"})
    flag!:string

    @OneToMany(()=>BranchesEntity,(branch)=>branch.country)
    branch!:Relation <BranchesEntity>

    @OneToMany(()=>News,(news)=>news.country)
    news!:Relation <News>;
}