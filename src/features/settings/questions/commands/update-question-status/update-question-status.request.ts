import {ApiProperty} from "@nestjs/swagger";
import {IsEnum} from "class-validator";
import {questionStatus} from "@/core/enums/enums";

export class UpdateQuestionStatusRequest {
    @IsEnum(questionStatus)
    @ApiProperty({enum: questionStatus})
    status!: questionStatus;
}
