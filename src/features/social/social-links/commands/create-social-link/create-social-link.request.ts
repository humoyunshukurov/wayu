import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";
import {CreateSocialLinkCommand} from "./create-social-link.command";

export class CreateSocialLinkRequest {
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

    toCommand(): CreateSocialLinkCommand {
        const cmd = new CreateSocialLinkCommand();
        cmd.title = this.title;
        cmd.icon = this.icon;
        cmd.link = this.link;
        return cmd;
    }
}
