import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {Faqs} from "@/featuress/common/entities/faqs";
import {Tags} from "@/featuress/common/entities/tags";

@Entity('faqsTags')
export class FaqsTags extends BaseModel {
    @Column({type: "number"})
    faqsId!: number;

    @Column({type: "number"})
    tagId!: number;

    @ManyToOne(() => Faqs, (faq) => faq.faqTags)
    @JoinColumn({name: 'faqId'})
    faqs: Faqs

    @ManyToOne(() => Tags, (tag) => tag.faqtags)
    @JoinColumn({name: 'tagId'})
    tags: Tags



}
