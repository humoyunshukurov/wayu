import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {NewsCategories} from "@/featuress/common/entities/newsCategories";
import {Countries} from "@/featuress/common/entities/countries";

@Entity('news')
export class News extends BaseModel{
    @Column({type:"number"})
    NewscategoryId!:number;

    @Column({type:"int",nullable:true})
    countryId:number;

    @Column({length:256})
    image!:string;

    @Column({type:"datetime"})

    @Column({type:"text"})
    content!:string;

    @ManyToOne(()=>NewsCategories,(newsCategory)=>newsCategory.news)
    @JoinColumn({name:'NewsCategoriesId'})
    newsCategory:NewsCategories;


    @ManyToOne(()=>Countries,(country)=>country.news)
    @JoinColumn({name:'countryId'})
    country:Countries;
}