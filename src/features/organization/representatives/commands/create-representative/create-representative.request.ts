import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsOptional, IsString, MaxLength} from "class-validator";
import {CreateRepresentativeCommand} from "./create-representative.command";

export class CreateRepresentativeRequest {
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

    toCommand(): CreateRepresentativeCommand {
        const cmd = new CreateRepresentativeCommand();
        cmd.fullName = this.fullName;
        cmd.image = this.image;
        cmd.email = this.email;
        cmd.phoneNumber = this.phoneNumber;
        cmd.resume = this.resume;
        return cmd;
    }
}
