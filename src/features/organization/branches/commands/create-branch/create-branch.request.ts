import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsInt, IsNumber, IsString, MaxLength} from "class-validator";
import {CreateBranchCommand} from "./create-branch.command";

export class CreateBranchRequest {
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

    toCommand(): CreateBranchCommand {
        const cmd = new CreateBranchCommand();
        cmd.countryId = this.countryId;
        cmd.representativeId = this.representativeId;
        cmd.city = this.city;
        cmd.latitude = this.latitude;
        cmd.longitude = this.longitude;
        cmd.phoneNumber = this.phoneNumber;
        return cmd;
    }
}
