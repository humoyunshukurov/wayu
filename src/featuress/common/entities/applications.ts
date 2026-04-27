import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {applicationStatus} from "@/core/enums/enums";
import {Vacancies} from "@/featuress/common/entities/vacancies";


@Entity('applications')
export class Applications extends BaseModel{

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

    @ManyToOne(()=>Vacancies,(vacancy)=>vacancy.applications)
    @JoinColumn({name:'vacancyId'})
    vacancy!:Vacancies

}