import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateNewsCategoryCommand} from "@/features/news/news-category/commends/create-new-category.command";
import {CreateNewsCategoryResponse} from "@/features/news/news-category/commends/create-news-category.response";
import {UpdateNewsCategoryCommand} from "@/features/news/news-category/commends/update-news-category.command";
import {UpdateNewsCategoryRequest} from "@/features/news/news-category/commends/update-news-category.request";
import {DeleteNewsCategoryCommand} from "@/features/news/news-category/commends/delete-news-category.command";
import {GetAllNewsCategoriesFilters} from "@/features/news/news-category/queries/get-all-news-categories.filters";
import {GetAllNewsCategoriesQuery} from "@/features/news/news-category/queries/get-all-news-categories.query";
import {GetAllNewsCategoriesResponse} from "@/features/news/news-category/queries/get-all-news-categories.response";
import {GetNewsCategoryByIdQuery} from "@/features/news/news-category/queries/get-news-category-by-id.query";

@Controller('admin/news-category')
export class NewsCategoryController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    @Get()
    @ApiOkResponse({type: [GetAllNewsCategoriesResponse]})
    async getAll(@Query() filters: GetAllNewsCategoriesFilters) {
        return await this.queryBus.execute(new GetAllNewsCategoriesQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: CreateNewsCategoryResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetNewsCategoryByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateNewsCategoryResponse})
    async create(@Body() command: CreateNewsCategoryCommand) {
        return await this.commandBus.execute(command);
    }

    @Put(':id')
    @ApiOkResponse({type: CreateNewsCategoryResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateNewsCategoryRequest) {
        const cmd = new UpdateNewsCategoryCommand();
        cmd.id = id;
        cmd.title = req.title;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteNewsCategoryCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
