import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class GetAllBooksResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    authorId!: number;

    @Expose()
    @ApiProperty()
    categoryId!: number;

    @Expose()
    @ApiProperty()
    title!: string;

    @Expose()
    @ApiProperty()
    image!: string;

    @Expose()
    @ApiProperty()
    pages!: number;

    @Expose()
    @ApiProperty()
    year!: number;
}
