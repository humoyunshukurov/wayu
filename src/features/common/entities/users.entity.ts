import {Column, Entity} from "typeorm";
import {BaseModel} from "@/core/base-model";
import {loginType, userRole} from "@/core/enums/enums";

@Entity('users')
export class UsersEntity extends BaseModel {
    @Column({length: 64})
    fullname!: string;

    @Column({length: 64, unique: true})
    login!: string;

    @Column({type: 'enum', enum: loginType})
    loginType!: loginType;

    @Column({type: 'bool', default: false})
    isVerified!: boolean;

    @Column({type: 'bool', default: true})
    isActive!: boolean;

    @Column({type: 'enum', enum: userRole, default: userRole.user})
    role!: userRole;

    @Column({length: 256})
    password!: string;
}
