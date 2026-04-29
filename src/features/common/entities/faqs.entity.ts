import {Column, Entity, OneToMany} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {FaqsTagsEntity} from "@/features/common/entities/faqsTags.entity";
import type {Relation} from "typeorm";

@Entity('faqs')
export class FaqsEntity extends BaseModel{

    @Column({length:256})
    question!:string

    @Column({length:512})
    answer!:string

    @OneToMany(()=>FaqsTagsEntity,(faqTag)=>faqTag.faqs)
    faqTags!:Relation <FaqsTagsEntity>

}