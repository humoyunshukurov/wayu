import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString, MaxLength} from "class-validator";

export class UpdateStaticInfoRequest {
    @IsString()
    @IsOptional()
    @MaxLength(128)
    @ApiProperty({required: false})
    appStoreLink?: string;

    @IsString()
    @IsOptional()
    @MaxLength(128)
    @ApiProperty({required: false})
    playMarketLink?: string;

    @IsString()
    @ApiProperty()
    aboutUs!: string;
}
