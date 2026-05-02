import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsEnum, IsOptional, IsString, MaxLength} from "class-validator";
import {vacancyType} from "@/core/enums/enums";
import {CreateVacancyCommand} from "./create-vacancy.command";

export class CreateVacancyRequest {
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
    @IsOptional()
    @ApiProperty({required: false, default: true})
    isActive: boolean = true;

    toCommand(): CreateVacancyCommand {
        const cmd = new CreateVacancyCommand();
        cmd.title = this.title;
        cmd.address = this.address;
        cmd.description = this.description;
        cmd.type = this.type;
        cmd.salary = this.salary;
        cmd.isActive = this.isActive;
        return cmd;
    }
}
