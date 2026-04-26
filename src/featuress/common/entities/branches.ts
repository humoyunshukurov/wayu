import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";

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


}