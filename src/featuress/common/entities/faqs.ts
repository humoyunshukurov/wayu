import {Column, Entity, OneToMany} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {FaqsTags} from "@/featuress/common/entities/faqsTags";

@Entity('faqs')
export class Faqs extends BaseModel{

    @Column({length:256})
    question!:string

    @Column({length:512})
    answer!:string

    @OneToMany(()=>FaqsTags,(faqTag)=>faqTag.faqs)
    faqTags!:FaqsTags

}