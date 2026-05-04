import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Patch, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateBookRequest} from "./commands/create-book/create-book.request";
import {CreateBookResponse} from "./commands/create-book/create-book.response";
import {UpdateBookCommand} from "./commands/update-book/update-book.command";
import {UpdateBookRequest} from "./commands/update-book/update-book.request";
import {DeleteBookCommand} from "./commands/delete-book/delete-book.command";
import {GetAllBooksFilters} from "./queries/get-all-books/get-all-books.filters";
import {GetAllBooksQuery} from "./queries/get-all-books/get-all-books.query";
import {GetAllBooksResponse} from "./queries/get-all-books/get-all-books.response";
import {GetBookByIdQuery} from "./queries/get-book-by-id/get-book-by-id.query";

@Controller('admin/books')
export class BooksController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllBooksResponse]})
    async getAll(@Query() filters: GetAllBooksFilters) {
        return await this.queryBus.execute(new GetAllBooksQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: CreateBookResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetBookByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateBookResponse})
    async create(@Body() req: CreateBookRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    @ApiOkResponse({type: CreateBookResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateBookRequest) {
        const cmd = new UpdateBookCommand();
        cmd.id = id;
        cmd.authorId = req.authorId;
        cmd.categoryId = req.categoryId;
        cmd.title = req.title;
        cmd.image = req.image;
        cmd.description = req.description;
        cmd.file = req.file;
        cmd.pages = req.pages;
        cmd.year = req.year;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteBookCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
