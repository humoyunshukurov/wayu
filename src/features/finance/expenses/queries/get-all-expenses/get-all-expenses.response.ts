import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class GetAllExpensesResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    amount!: number;

    @Expose()
    @ApiProperty()
    date!: Date;

    @Expose()
    @ApiProperty()
    title!: string;

    @Expose()
    @ApiProperty()
    transactionId!: string;
}
