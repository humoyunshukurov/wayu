import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsInt, IsString, MaxLength} from "class-validator";
import {CreateNewsCommand} from "./create-news.command";

export class CreateNewsRequest {
    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    categoryId!: number;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    countryId!: number;

    @IsString()
    @MaxLength(256)
    @ApiProperty()
    title!: string;

    toCommand(): CreateNewsCommand {
        const cmd = new CreateNewsCommand();
        cmd.categoryId = this.categoryId;
        cmd.countryId = this.countryId;
        cmd.title = this.title;
        return cmd;
    }
}
