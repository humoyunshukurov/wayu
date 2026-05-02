import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsDateString, IsNumber} from "class-validator";
import {CreateDonationCommand} from "./create-donation.command";

export class CreateDonationRequest {
    @IsNumber()
    @Type(() => Number)
    @ApiProperty()
    amount!: number;

    @IsDateString()
    @ApiProperty({example: "2026-05-01T10:00:00.000Z"})
    date!: string;

    toCommand(): CreateDonationCommand {
        const cmd = new CreateDonationCommand();
        cmd.amount = this.amount;
        cmd.date = new Date(this.date);
        return cmd;
    }
}
