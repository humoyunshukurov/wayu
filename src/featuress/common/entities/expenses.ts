import {BaseEntity, Column, Entity} from "typeorm";

@Entity('expenses')

export class Expense extends BaseEntity{
    @Column({type:"decimal",precision:12,scale:2})
    amount!:number;

    @Column({type:"datetime"})
    date!:Date

    @Column({length:256})
    title!:string

    @Column({type:"text"})
    description!:string

    @Column({length:64,unique:true})
    transactionId!:string
}