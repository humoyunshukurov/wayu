import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";

@Entity('staticInfo')
export class StaticInfoEntity extends BaseModel{
    @Column({length:128 ,nullable:true})
    appStoreLink!:string

    @Column({length:128, nullable:true})
    playMarketLink!:string

    @Column({type:"text"})
    aboutUs!:string
}