import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";

@Entity('news')
export class News extends BaseModel{
    @Column({type:"number"})
    categoryId!:number;

    @Column({type:"int",nullable:true})
    countryId:number;

    @Column({length:256})
    image!:string;

    @Column({type:"datetime"})

    @Column({type:"text"})
    content!:string;
}