import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {vacancyType} from "@/core/enums/enums";


@Entity('vacancies')
export class Vacancies extends BaseModel{

    @Column({length:256})
    title!: string;

    @Column({length:128})
    address!: string;

    @Column({type:"text"})
    description!: string;

    @Column({type:"enum",enum:vacancyType})
    type!:vacancyType

    @Column({length:64})
    salary!: string;

    @Column({type:"bool",default:true})
    isActive!:boolean
}