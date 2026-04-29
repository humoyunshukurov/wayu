import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {applicationStatus} from "@/core/enums/enums";
import {VacanciesEntity} from "@/features/common/entities/vacancies.entity";
import type {Relation} from "typeorm";


@Entity('applications')
export class ApplicationsEntity extends BaseModel{

    @Column({length: 64})
    fullName!: string;

    @Column({length:16})
    phoneNumber!: string;

    @Column({length:64})
    email!: string;

    @Column({type:"int"})
    vacancyId!: number

    @Column({length:128})
    resume!: string;

    @Column({type:"enum" ,enum:applicationStatus})
    status!:applicationStatus;

    @ManyToOne(()=>VacanciesEntity,(vacancy)=>vacancy.applications)
    @JoinColumn({name:'vacancyId'})
    vacancy!:Relation<VacanciesEntity>
}