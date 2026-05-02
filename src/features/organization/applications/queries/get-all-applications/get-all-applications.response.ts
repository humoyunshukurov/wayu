import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";
import {applicationStatus} from "@/core/enums/enums";

export class GetAllApplicationsResponse {
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
    email!: string;

    @Expose()
    @ApiProperty()
    vacancyId!: number;

    @Expose()
    @ApiProperty({enum: applicationStatus})
    status!: applicationStatus;
}
