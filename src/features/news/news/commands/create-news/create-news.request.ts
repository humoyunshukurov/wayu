import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsDateString, IsInt, IsOptional, IsString, MaxLength} from "class-validator";
import {CreateNewsCommand} from "./create-news.command";

export class CreateNewsRequest {
    @ApiProperty({type: 'string', format: 'binary'})
    image!: any;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    categoryId!: number;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({required: false, nullable: true})
    countryId?: number;

    @IsString()
    @MaxLength(256)
    @ApiProperty()
    title!: string;

    @IsDateString()
    @ApiProperty({example: '2024-01-15'})
    date!: string;

    @IsString()
    @ApiProperty()
    content!: string;

    toCommand(imagePath: string): CreateNewsCommand {
        const cmd = new CreateNewsCommand();
        cmd.categoryId = this.categoryId;
        cmd.countryId = this.countryId ?? null;
        cmd.title = this.title;
        cmd.image = imagePath;
        cmd.date = this.date;
        cmd.content = this.content;
        return cmd;
    }
}
