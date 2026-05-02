import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";
import {CreateTagCommand} from "./create-tag.command";

export class CreateTagRequest {
    @IsString()
    @MaxLength(64)
    @ApiProperty()
    title!: string;

    toCommand(): CreateTagCommand {
        const cmd = new CreateTagCommand();
        cmd.title = this.title;
        return cmd;
    }
}
