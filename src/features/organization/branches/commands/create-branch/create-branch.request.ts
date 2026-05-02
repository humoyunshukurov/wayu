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
    representativesId!: number;

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
    phoneNumber!: number;

    toCommand(): CreateBranchCommand {
        const cmd = new CreateBranchCommand();
        cmd.countryId = this.countryId;
        cmd.representativesId = this.representativesId;
        cmd.city = this.city;
        cmd.latitude = this.latitude;
        cmd.phoneNumber = this.phoneNumber;
        return cmd;
    }
}
