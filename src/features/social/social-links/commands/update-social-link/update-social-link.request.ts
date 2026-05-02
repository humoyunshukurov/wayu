import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";

export class UpdateSocialLinkRequest {
    @IsString()
    @MaxLength(128)
    @ApiProperty()
    title!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    icon!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    link!: string;
}
