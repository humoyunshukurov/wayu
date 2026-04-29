import {Column, Entity, OneToMany} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {FaqsTagsEntity} from "@/features/common/entities/faqsTags.entity";
import type {Relation} from "typeorm";

@Entity('tags')
export class TagsEntity extends BaseModel{
    @Column({length:64,unique:true})
    title!:string

    @OneToMany(()=>FaqsTagsEntity,(faqtag)=>faqtag.faqs)
    faqtags:Relation <FaqsTagsEntity>;
}
