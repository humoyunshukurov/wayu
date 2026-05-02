import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsInt, IsString, MaxLength} from "class-validator";

export class UpdateNewsRequest {
    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    categoryId!: number;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    countryId!: number;

    @IsString()
    @MaxLength(256)
    @ApiProperty()
    title!: string;
}
