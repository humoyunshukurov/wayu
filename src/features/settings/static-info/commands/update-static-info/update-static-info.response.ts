import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class UpdateStaticInfoResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    appStoreLink?: string;

    @Expose()
    @ApiProperty()
    playMarketLink?: string;

    @Expose()
    @ApiProperty()
    aboutUs!: string;
}
