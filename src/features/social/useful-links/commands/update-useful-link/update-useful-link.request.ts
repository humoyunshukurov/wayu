import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";

export class UpdateUsefulLinkRequest {
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
