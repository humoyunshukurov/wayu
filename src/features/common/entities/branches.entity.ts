import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModel} from "@/core/base-model";

import {Representatives} from "@/features/common/entities/representatives";
import type {Relation} from "typeorm";
import {CountriesEntity} from "@/features/content/countries/countries.entity";

@Entity('branches')
export class BranchesEntity extends BaseModel{
    @Column({type:"int"})
    countryId!:number

    @Column({type:"int"})
    representativesId!:number

    @Column({length:64})
    city!:string

    @Column({type:"decimal",precision:10, scale:7})
    latitude!:number

    @Column({type:"decimal",precision:10, scale:7})
    phoneNumber!:number

    @ManyToOne(()=>CountriesEntity,(country)=>country.branch)
    @JoinColumn({name:'countryId'})
    country!:Relation <CountriesEntity>

    @ManyToOne(()=>Representatives,(representation)=>representation.branch)
    @JoinColumn({name:'representativeId'})
    representative!:Relation <Representatives>
}