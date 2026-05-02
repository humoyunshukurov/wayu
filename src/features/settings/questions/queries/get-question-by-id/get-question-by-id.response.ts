import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";
import {questionStatus} from "@/core/enums/enums";

export class GetQuestionByIdResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    fullName!: string;

    @Expose()
    @ApiProperty()
    phoneNumber!: string;

    @Expose()
    @ApiProperty()
    question!: string;

    @Expose()
    @ApiProperty({enum: questionStatus})
    status!: questionStatus;

    @Expose()
    @ApiProperty()
    createdAt!: Date;
}
