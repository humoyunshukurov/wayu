import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsEnum, IsString, MaxLength} from "class-validator";
import {vacancyType} from "@/core/enums/enums";

export class UpdateVacancyRequest {
    @IsString()
    @MaxLength(256)
    @ApiProperty()
    title!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    address!: string;

    @IsString()
    @ApiProperty()
    description!: string;

    @IsEnum(vacancyType)
    @ApiProperty({enum: vacancyType})
    type!: vacancyType;

    @IsString()
    @MaxLength(64)
    @ApiProperty()
    salary!: string;

    @IsBoolean()
    @ApiProperty()
    isActive!: boolean;
}
