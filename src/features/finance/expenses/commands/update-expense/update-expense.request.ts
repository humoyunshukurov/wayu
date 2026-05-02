import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsDateString, IsNumber, IsString, MaxLength} from "class-validator";

export class UpdateExpenseRequest {
    @IsNumber()
    @Type(() => Number)
    @ApiProperty()
    amount!: number;

    @IsDateString()
    @ApiProperty({example: "2026-05-01T10:00:00.000Z"})
    date!: string;

    @IsString()
    @MaxLength(256)
    @ApiProperty()
    title!: string;

    @IsString()
    @ApiProperty()
    description!: string;
}
