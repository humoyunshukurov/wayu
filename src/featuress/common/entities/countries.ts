import {BaseModel} from "@/core/base-model";
import {Column, Entity, OneToMany} from "typeorm";
import {Branch} from "@/featuress/common/entities/branches";
import {News} from "@/featuress/common/entities/news";


@Entity('socialLinks')
export class Countries extends BaseModel{
    @Column({type:"string",unique:true})
    title!:string

    @Column({type:"string"})
    flag!:string

    @OneToMany(()=>Branch,(branch)=>branch.country)
    branch!:Branch

    @OneToMany(()=>News,(news)=>news.country)
    news!:News;
}