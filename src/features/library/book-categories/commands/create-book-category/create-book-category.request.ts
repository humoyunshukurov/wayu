import {ApiProperty} from "@nestjs/swagger";
import {IsString, MaxLength} from "class-validator";
import {CreateBookCategoryCommand} from "./create-book-category.command";

export class CreateBookCategoryRequest {
    @IsString()
    @MaxLength(64)
    @ApiProperty()
    title!: string;

    toCommand(): CreateBookCategoryCommand {
        const cmd = new CreateBookCategoryCommand();
        cmd.title = this.title;
        return cmd;
    }
}
