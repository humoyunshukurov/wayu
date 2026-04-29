import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {Authors} from "@/features/common/entities/authors";
import {BookCategories} from "@/features/common/entities/bookCategories";
import type {Relation} from "typeorm";


@Entity('books')
export class Books extends BaseModel{

    @Column({type:"int"})
    authorId!: number

    @Column({type:"int"})
    categoryId!: number

    @Column({length:265})
    title: string

    @Column({length:128})
    image: string

    @Column({type:"text",nullable:true})
    description: string

    @Column({length:256})
    file: string

    @Column({type:"int"})
    pages: number

    @Column({type:"int"})
    year: number


    @ManyToOne(()=>Authors,(author)=>author.books)
    @JoinColumn({name:'authorId'})
    authors:Relation <Authors>

    @ManyToOne(()=>BookCategories,(category)=>category.books)
    @JoinColumn({name:'CategoryId'})
    category:Relation <BookCategories>
}