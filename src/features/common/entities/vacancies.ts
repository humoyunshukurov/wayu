import {Column, Entity, OneToMany} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {vacancyType} from "@/core/enums/enums";
import {Applications} from "@/features/common/entities/applications";
import type {Relation} from "typeorm";

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

    @OneToMany(()=>Applications,(application)=>application.vacancy)
    applications!:Relation <Applications>
}