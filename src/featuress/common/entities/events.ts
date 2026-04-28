import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {EventCategories} from "@/featuress/common/entities/eventCategories";

@Entity('events')
export class Events extends BaseModel{
    @Column({type:"int"})
    categoryId:number;

    @Column({length:256})
    title!:string;

    @Column({type:"text"})
    content!:string;

    @Column({length:128})
    image!:string

    @Column({type:"datetime"})
    date!:Date;

    @Column({length:128})
    address!:string;

    @ManyToOne(()=>EventCategories,(eventCategory)=>eventCategory.event)
    @JoinColumn({name:'categoryId'})
    eventCategory:EventCategories
}