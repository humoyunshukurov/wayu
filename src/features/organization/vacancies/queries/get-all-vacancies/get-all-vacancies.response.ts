import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";
import {vacancyType} from "@/core/enums/enums";

export class GetAllVacanciesResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    title!: string;

    @Expose()
    @ApiProperty()
    address!: string;

    @Expose()
    @ApiProperty({enum: vacancyType})
    type!: vacancyType;

    @Expose()
    @ApiProperty()
    salary!: string;

    @Expose()
    @ApiProperty()
    isActive!: boolean;
}
