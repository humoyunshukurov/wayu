import {ApiProperty} from "@nestjs/swagger";
import {IsEnum} from "class-validator";
import {applicationStatus} from "@/core/enums/enums";

export class UpdateApplicationStatusRequest {
    @IsEnum(applicationStatus)
    @ApiProperty({enum: applicationStatus})
    status!: applicationStatus;
}
