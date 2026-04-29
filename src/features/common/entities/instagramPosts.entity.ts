import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";

@Entity('instagramPosts')
export class InstagramPostsEntity extends BaseModel{
    @Column({length:128})
    image!:string;

    @Column({length:128})
    link!:string;


}