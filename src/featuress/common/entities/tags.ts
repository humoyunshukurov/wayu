import {Column, Entity, OneToMany} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {FaqsTags} from "@/featuress/common/entities/faqsTags";

@Entity('tags')
export class Tags extends BaseModel{
    @Column({length:64,unique:true})
    title!:string

    @OneToMany(()=>FaqsTags,(faqtag)=>faqtag.faqs)
    faqtags:FaqsTags;
}
