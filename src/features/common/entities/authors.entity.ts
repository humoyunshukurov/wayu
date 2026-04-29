import {Column, Entity, OneToMany} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {BooksEntity} from "@/features/common/entities/books.entity";
import type {Relation} from "typeorm";

@Entity('authors')
export class AuthorsEntity extends BaseModel{
    @Column({length:64})
    fullName!:string

    @OneToMany(()=>BooksEntity,(book)=>book.authors)
    books!:Relation <BooksEntity>
}