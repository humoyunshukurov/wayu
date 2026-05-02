import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";
import {CreateLanguageCommand} from "./create-language.command";

export class CreateLanguageRequest {
    @IsString()
    @MaxLength(64)
    @ApiProperty()
    title!: string;

    toCommand(): CreateLanguageCommand {
        const cmd = new CreateLanguageCommand();
        cmd.title = this.title;
        return cmd;
    }
}
