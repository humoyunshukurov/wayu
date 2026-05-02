import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";
import {CreateUsefulLinkCommand} from "./create-useful-link.command";

export class CreateUsefulLinkRequest {
    @IsString()
    @MaxLength(128)
    @ApiProperty()
    title!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    icon!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    link!: string;

    toCommand(): CreateUsefulLinkCommand {
        const cmd = new CreateUsefulLinkCommand();
        cmd.title = this.title;
        cmd.icon = this.icon;
        cmd.link = this.link;
        return cmd;
    }
}
