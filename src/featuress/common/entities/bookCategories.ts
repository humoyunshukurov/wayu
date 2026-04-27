import {Column, Entity, OneToMany} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {Books} from "@/featuress/common/entities/books";


@Entity('bookCategories')

export class BookCategories extends BaseModel{
    @Column({length:64,unique:true})
    title!: string;

    @OneToMany(()=>Books,(book)=>book.category)
    books:Books
}