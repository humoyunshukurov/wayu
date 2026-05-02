import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";

export class UpdateAuthorRequest {
    @IsString()
    @MaxLength(64)
    @ApiProperty()
    fullName!: string;
}
