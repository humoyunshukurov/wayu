import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";

@Entity('newsCategories')
export class NewsCategories extends BaseModel{
    @Column({length:64,nullable:true})
    title!:string
}