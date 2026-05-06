import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class GetAllNewsResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    categoryId!: number;

    @Expose()
    @ApiProperty({nullable: true})
    countryId!: number;

    @Expose()
    @ApiProperty()
    title!: string;

    @Expose()
    @ApiProperty()
    image!: string;

    @Expose()
    @ApiProperty()
    date!: Date;

    @Expose()
    @ApiProperty()
    content!: string;

    @Expose()
    @ApiProperty()
    createdAt!: Date;
}
