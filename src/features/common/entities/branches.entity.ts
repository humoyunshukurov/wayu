import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {Representative} from "@/features/common/entities/representatives.entity";
import type {Relation} from "typeorm";
import {CountriesEntity} from "@/features/common/entities/countries.entity";

@Entity('branches')
export class BranchesEntity extends BaseModel{
    @Column({type:"int"})
    countryId!:number

    @Column({type:"int"})
    representativeId!:number

    @Column({length:64})
    city!:string

    @Column({type:"decimal",precision:10, scale:7})
    latitude!:number

    @Column({type:"decimal",precision:10, scale:7})
    longitude!:number

    @Column({length:16})
    phoneNumber!:string

    @ManyToOne(()=>CountriesEntity,(country)=>country.branch)
    @JoinColumn({name:'countryId'})
    country!:Relation <CountriesEntity>

    @ManyToOne(()=>Representative,(representation)=>representation.branch)
    @JoinColumn({name:'representativeId'})
    representative!:Relation <Representative>
}
