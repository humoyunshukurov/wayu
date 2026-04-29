import {Column, Entity, OneToMany} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {FaqsTags} from "@/features/common/entities/faqsTags";
import type {Relation} from "typeorm";

@Entity('tags')
export class Tags extends BaseModel{
    @Column({length:64,unique:true})
    title!:string

    @OneToMany(()=>FaqsTags,(faqtag)=>faqtag.faqs)
    faqtags:Relation <FaqsTags>;
}
