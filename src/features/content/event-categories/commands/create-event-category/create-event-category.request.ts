import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";
import {CreateEventCategoryCommand} from "./create-event-category.command";

export class CreateEventCategoryRequest {
    @IsString()
    @MaxLength(64)
    @ApiProperty()
    title!: string;

    toCommand(): CreateEventCategoryCommand {
        const cmd = new CreateEventCategoryCommand();
        cmd.title = this.title;
        return cmd;
    }
}
