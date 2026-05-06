import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsInt, IsNumber, IsString, MaxLength} from "class-validator";

export class UpdateBranchRequest {
    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    countryId!: number;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    representativeId!: number;

    @IsString()
    @MaxLength(64)
    @ApiProperty()
    city!: string;

    @IsNumber()
    @Type(() => Number)
    @ApiProperty()
    latitude!: number;

    @IsNumber()
    @Type(() => Number)
    @ApiProperty()
    longitude!: number;

    @IsString()
    @MaxLength(16)
    @ApiProperty()
    phoneNumber!: string;
}
