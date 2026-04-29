import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {FaqsEntity} from "@/features/common/entities/faqs.entity";
import {TagsEntity} from "@/features/common/entities/tags.entity";
import type {Relation} from "typeorm";

@Entity('faqsTags')
export class FaqsTagsEntity extends BaseModel {
    @Column({type: "int"})
    faqsId!: number;

    @Column({type: "int"})
    tagId!: number;

    @ManyToOne(() => FaqsEntity, (faq) => faq.faqTags)
    @JoinColumn({name: 'faqId'})
    faqs: Relation<FaqsEntity>

    @ManyToOne(() => TagsEntity, (tag) => tag.faqtags)
    @JoinColumn({name: 'tagId'})
    tags: Relation <TagsEntity>



}
