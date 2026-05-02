import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsDateString, IsNumber, IsString, MaxLength} from "class-validator";
import {CreateExpenseCommand} from "./create-expense.command";

export class CreateExpenseRequest {
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

    @IsString()
    @MaxLength(64)
    @ApiProperty()
    transactionId!: string;

    toCommand(): CreateExpenseCommand {
        const cmd = new CreateExpenseCommand();
        cmd.amount = this.amount;
        cmd.date = new Date(this.date);
        cmd.title = this.title;
        cmd.description = this.description;
        cmd.transactionId = this.transactionId;
        return cmd;
    }
}
