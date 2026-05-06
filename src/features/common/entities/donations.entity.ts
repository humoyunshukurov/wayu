import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {paymentProvider} from "@/core/enums/enums";

@Entity('donations')
export class DonationsEntity extends BaseModel{
    @Column({type:"decimal",precision:12,scale:2})
    amount!:number;

    @Column({length:64})
    fullName!:string;

    @Column({type:"timestamp"})
    date!:Date;

    @Column({type:"enum",enum:paymentProvider})
    paidBy!:paymentProvider;
}
