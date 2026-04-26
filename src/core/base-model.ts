import {BaseEntity,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

export class BaseModel extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number


    @UpdateDateColumn({type:"timestamp",nullable:true})
    updatedAt!:Date

}