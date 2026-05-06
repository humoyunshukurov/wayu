import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {AuthorsEntity} from "@/features/common/entities/authors.entity";
import {BookCategoriesEntity} from "@/features/common/entities/bookCategories.entity";
import type {Relation} from "typeorm";
import {BaseModel} from "@/core/base-model";


@Entity('books')
export class BooksEntity extends BaseModel{

    @Column({type:"int"})
    authorId!: number

    @Column({type:"int"})
    categoryId!: number

    @Column({length:256})
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


    @ManyToOne(()=>AuthorsEntity,(author)=>author.books)
    @JoinColumn({name:'authorId'})
    authors:Relation <AuthorsEntity>

    @ManyToOne(()=>BookCategoriesEntity,(category)=>category.books)
    @JoinColumn({name:'categoryId'})
    category:Relation <BookCategoriesEntity>
}