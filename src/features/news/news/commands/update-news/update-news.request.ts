import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsDateString, IsInt, IsOptional, IsString, MaxLength} from "class-validator";

export class UpdateNewsRequest {
    @IsOptional()
    @ApiProperty({type: 'string', format: 'binary', required: false})
    image?: any;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    categoryId!: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({required: false, nullable: true})
    countryId?: number;

    @IsString()
    @MaxLength(256)
    @ApiProperty()
    title!: string;

    @IsDateString()
    @ApiProperty({example: '2024-01-15'})
    date!: string;

    @IsString()
    @ApiProperty()
    content!: string;
}
