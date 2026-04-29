import {Column, Entity, OneToMany} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {Books} from "@/features/common/entities/books";
import type {Relation} from "typeorm";

@Entity('authors')
export class Authors extends BaseModel{
    @Column({length:64})
    fullName!:string

    @OneToMany(()=>Books,(book)=>book.authors)
    books!:Relation <Books>
}