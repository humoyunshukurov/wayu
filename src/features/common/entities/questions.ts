import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {questionStatus} from "@/core/enums/enums";

@Entity('questions')
export class Questions extends BaseModel{
    @Column({length:64})
    fullName!:string

    @Column({length:16})
    phoneNumber!:string

    @Column({length:2000})
    question!:string

    @Column({type:"enum",enum:questionStatus})
    status!:questionStatus
}

