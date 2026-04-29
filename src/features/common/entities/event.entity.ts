import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {EventCategoriesEntity} from "@/features/common/entities/eventCategories.entity";
import type {Relation} from "typeorm";

@Entity('events')
export class EventEntity extends BaseModel{
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

    @ManyToOne(()=>EventCategoriesEntity,(eventCategory)=>eventCategory.event)
    @JoinColumn({name:'categoryId'})
    eventCategory:Relation <EventCategoriesEntity>
}