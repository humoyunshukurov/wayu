import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {Countries} from "@/featuress/common/entities/countries";
import {Representatives} from "@/featuress/common/entities/representatives";

@Entity('branches')
export class Branch extends BaseModel{
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

    @ManyToOne(()=>Countries,(country)=>country.branch)
    @JoinColumn({name:'countryId'})
    country!:Countries

    @ManyToOne(()=>Representatives,(representation)=>representation.branch)
    @JoinColumn({name:'representativeId'})
    representative!:Representatives
}