import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {FaqsEntity} from "@/features/common/entities/faqs.entity";
import {Tags} from "@/features/common/entities/tags";
import type {Relation} from "typeorm";

@Entity('faqsTags')
export class FaqsTags extends BaseModel {
    @Column({type: "number"})
    faqsId!: number;

    @Column({type: "number"})
    tagId!: number;

    @ManyToOne(() => FaqsEntity, (faq) => faq.faqTags)
    @JoinColumn({name: 'faqId'})
    faqs: Relation<FaqsEntity>

    @ManyToOne(() => Tags, (tag) => tag.faqtags)
    @JoinColumn({name: 'tagId'})
    tags: Relation <Tags>



}
