import {BaseModel} from "@/core/base-model";
import {Column, Entity} from "typeorm";

@Entity('socilaLinks')
export class UsefulLinksEntity extends BaseModel{
    @Column({length:128})
    title!:string

    @Column({length:128})
    icon!:string

    @Column({length:128})
    link!:string
}