import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";

@Entity('tags')
export class Tags extends BaseModel{
    @Column({length:64,unique:true})
    title!:string
}
