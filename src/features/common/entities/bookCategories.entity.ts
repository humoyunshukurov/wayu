import {Column, Entity, OneToMany} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {BooksEntity} from "@/features/common/entities/books.entity";
import type {Relation} from "typeorm";


@Entity('bookCategories')

export class BookCategoriesEntity extends BaseModel{
    @Column({length:64,unique:true})
    title!: string;

    @OneToMany(()=>BooksEntity,(book)=>book.category)
    books:Relation <BooksEntity>
}