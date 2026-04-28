import {Column, Entity, OneToMany} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {Events} from "@/featuress/common/entities/events";


@Entity('eventCategories')
export class EventCategories  extends BaseModel{
    @Column({length:64,unique:true})
    title!:string

    @OneToMany(()=>Events,(event)=>event.eventCategory)
    event!:Events
}