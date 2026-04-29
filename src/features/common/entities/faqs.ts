import {Column, Entity, OneToMany} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {FaqsTags} from "@/features/common/entities/faqsTags";
import type {Relation} from "typeorm";

@Entity('faqs')
export class Faqs extends BaseModel{

    @Column({length:256})
    question!:string

    @Column({length:512})
    answer!:string

    @OneToMany(()=>FaqsTags,(faqTag)=>faqTag.faqs)
    faqTags!:Relation <FaqsTags>

}