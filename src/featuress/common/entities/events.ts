import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";

@Entity('events')
export class Events extends BaseModel{
    @Column({type:"int"})
    categoryId:number;

    @Column({length:256})
    title!:string;

    @Column({type:"text"})
    content!:string;

    @Column({length:128})
    image!:string

    @Column({type:"datetime"})
    date!:Date;

    @Column({length:128})
    address!:string;
}