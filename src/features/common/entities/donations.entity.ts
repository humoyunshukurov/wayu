import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";

@Entity('donations')

export class DonationsEntity extends BaseModel{
    @Column({type:"decimal",precision:10,scale:2})
    amount!:number;

    @Column({type:"timestamp"})
    date!:Date


}