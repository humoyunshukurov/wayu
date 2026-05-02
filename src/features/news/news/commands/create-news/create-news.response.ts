import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class CreateNewsResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    categoryId!: number;

    @Expose()
    @ApiProperty()
    countryId!: number;

    @Expose()
    @ApiProperty()
    title!: string;
}
