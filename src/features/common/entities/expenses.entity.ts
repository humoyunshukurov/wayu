import { Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";

@Entity('expenses')

export class ExpensesEntity extends BaseModel{

    @Column({type:"decimal",precision:12,scale:2})
    amount!:number;

    @Column({type:"timestamp"})
    date!:Date

    @Column({length:256})
    title!:string

    @Column({type:"text",nullable:true})
    description!:string

    @Column({length:64,unique:true})
    transactionId!:string
}