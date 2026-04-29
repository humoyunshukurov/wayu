import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";

@Entity('newsTags')

export class NewsTags extends BaseModel{
    @Column({type:"int"})
    newsId!:number

    @Column({type:"int"})
    tagId!:number
}