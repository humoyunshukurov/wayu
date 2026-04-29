import {Column, Entity, OneToMany} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {Books} from "@/features/common/entities/books";
import type {Relation} from "typeorm";


@Entity('bookCategories')

export class BookCategories extends BaseModel{
    @Column({length:64,unique:true})
    title!: string;

    @OneToMany(()=>Books,(book)=>book.category)
    books:Relation <Books>
}