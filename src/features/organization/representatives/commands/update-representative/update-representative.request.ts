import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsOptional, IsString, MaxLength} from "class-validator";

export class UpdateRepresentativeRequest {
    @IsString()
    @MaxLength(64)
    @ApiProperty()
    fullName!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    image!: string;

    @IsEmail()
    @IsOptional()
    @MaxLength(64)
    @ApiProperty({required: false})
    email?: string;

    @IsString()
    @MaxLength(16)
    @ApiProperty()
    phoneNumber!: string;

    @IsString()
    @ApiProperty()
    resume!: string;
}
