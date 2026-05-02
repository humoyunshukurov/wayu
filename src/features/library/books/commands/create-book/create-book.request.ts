import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsInt, IsOptional, IsString, MaxLength} from "class-validator";
import {CreateBookCommand} from "./create-book.command";

export class CreateBookRequest {
    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    authorId!: number;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    categoryId!: number;

    @IsString()
    @MaxLength(265)
    @ApiProperty()
    title!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    image!: string;

    @IsString()
    @IsOptional()
    @ApiProperty({required: false})
    description?: string;

    @IsString()
    @MaxLength(256)
    @ApiProperty()
    file!: string;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    pages!: number;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    year!: number;

    toCommand(): CreateBookCommand {
        const cmd = new CreateBookCommand();
        cmd.authorId = this.authorId;
        cmd.categoryId = this.categoryId;
        cmd.title = this.title;
        cmd.image = this.image;
        cmd.description = this.description;
        cmd.file = this.file;
        cmd.pages = this.pages;
        cmd.year = this.year;
        return cmd;
    }
}
