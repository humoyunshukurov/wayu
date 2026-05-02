import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";
import {CreateAuthorCommand} from "./create-author.command";

export class CreateAuthorRequest {
    @IsString()
    @MaxLength(64)
    @ApiProperty()
    fullName!: string;

    toCommand(): CreateAuthorCommand {
        const cmd = new CreateAuthorCommand();
        cmd.fullName = this.fullName;
        return cmd;
    }
}
