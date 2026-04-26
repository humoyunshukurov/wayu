import {BaseModel} from "@/core/base-model";
import {Column, Entity} from "typeorm";


@Entity('socialLinks')
export class Countries extends BaseModel{
    @Column({type:"string",unique:true})
    title!:string

    @Column({type:"string"})
    flag!:string
}