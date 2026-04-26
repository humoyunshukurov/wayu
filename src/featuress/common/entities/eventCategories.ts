import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";


@Entity('eventCategories')
export class EventCategories  extends BaseModel{
    @Column({length:64,unique:true})
    title!:string
}