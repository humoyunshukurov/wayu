import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";

export class UpdateNewsCategoryRequest {
    @IsString()
    @MaxLength(64)
    @ApiProperty()
    title!: string;
}
