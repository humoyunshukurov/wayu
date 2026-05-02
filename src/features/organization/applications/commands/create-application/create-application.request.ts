import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsEmail, IsInt, IsString, MaxLength} from "class-validator";
import {CreateApplicationCommand} from "./create-application.command";

export class CreateApplicationRequest {
    @IsString()
    @MaxLength(64)
    @ApiProperty()
    fullName!: string;

    @IsString()
    @MaxLength(16)
    @ApiProperty()
    phoneNumber!: string;

    @IsEmail()
    @MaxLength(64)
    @ApiProperty()
    email!: string;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    vacancyId!: number;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    resume!: string;

    toCommand(): CreateApplicationCommand {
        const cmd = new CreateApplicationCommand();
        cmd.fullName = this.fullName;
        cmd.phoneNumber = this.phoneNumber;
        cmd.email = this.email;
        cmd.vacancyId = this.vacancyId;
        cmd.resume = this.resume;
        return cmd;
    }
}
