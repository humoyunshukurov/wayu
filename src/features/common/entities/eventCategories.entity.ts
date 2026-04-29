import {Column, Entity, OneToMany} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {EventEntity} from "@/features/common/entities/event.entity";
import type {Relation} from "typeorm";


@Entity('eventCategories')
export class EventCategoriesEntity extends BaseModel{
    @Column({length:64,unique:true})
    title!:string

    @OneToMany(()=>EventEntity,(event)=>event.eventCategory)
    event!:Relation <EventEntity>
}