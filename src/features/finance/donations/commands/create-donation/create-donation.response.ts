import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class CreateDonationResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    amount!: number;

    @Expose()
    @ApiProperty()
    date!: Date;
}
