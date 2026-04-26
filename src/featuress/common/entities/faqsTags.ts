import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";

@Entity('faqsTags')
export class Authors extends BaseModel{
    @Column({type:"number"})
    faqsId!: number;

    @Column({type:"number"})
    tagId!: number;


}