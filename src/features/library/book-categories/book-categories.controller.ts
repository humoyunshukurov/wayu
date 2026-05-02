import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateBookCategoryRequest} from "./commands/create-book-category/create-book-category.request";
import {CreateBookCategoryResponse} from "./commands/create-book-category/create-book-category.response";
import {UpdateBookCategoryCommand} from "./commands/update-book-category/update-book-category.command";
import {UpdateBookCategoryRequest} from "./commands/update-book-category/update-book-category.request";
import {DeleteBookCategoryCommand} from "./commands/delete-book-category/delete-book-category.command";
import {GetAllBookCategoriesFilters} from "./queries/get-all-book-categories/get-all-book-categories.filters";
import {GetAllBookCategoriesQuery} from "./queries/get-all-book-categories/get-all-book-categories.query";
import {GetAllBookCategoriesResponse} from "./queries/get-all-book-categories/get-all-book-categories.response";
import {GetBookCategoryByIdQuery} from "./queries/get-book-category-by-id/get-book-category-by-id.query";

@Controller('admin/book-categories')
export class BookCategoriesController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllBookCategoriesResponse]})
    async getAll(@Query() filters: GetAllBookCategoriesFilters) {
        return await this.queryBus.execute(new GetAllBookCategoriesQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: CreateBookCategoryResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetBookCategoryByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateBookCategoryResponse})
    async create(@Body() req: CreateBookCategoryRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Put(':id')
    @ApiOkResponse({type: CreateBookCategoryResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateBookCategoryRequest) {
        const cmd = new UpdateBookCategoryCommand();
        cmd.id = id;
        cmd.title = req.title;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteBookCategoryCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
