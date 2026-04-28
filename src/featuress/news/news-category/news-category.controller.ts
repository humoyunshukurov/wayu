import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateNewsCategoryResponse} from "@/featuress/news/news-category/commends/create-news-category.response";
import {CreateNewsCategoryCommand} from "@/featuress/news/news-category/commends/create-new-category.command";
import {GetAllNewsCategoriesFilters} from "@/featuress/news/news-category/queries/get-all-news-categories.filters";
import {GetAllNewsCategoriesResponse} from "@/featuress/news/news-category/queries/get-all-news-categories.response";
import {GetAllNewsCategoriesQuery} from "@/featuress/news/news-category/queries/get-all-news-categories.query";



@Controller('admin/news-category')
export class NewsCategoryController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queriesBus: QueryBus,
    ) {
    }

    @Get()
    @ApiOkResponse({type: [GetAllNewsCategoriesResponse]})
    async getAllNewsCategories(@Query() filters: GetAllNewsCategoriesFilters) {
        return await this.queriesBus.execute(new GetAllNewsCategoriesQuery(filters));
    }

    @Post()
    @ApiCreatedResponse({type: CreateNewsCategoryResponse})
    async createNewsCategory(@Body() command: CreateNewsCategoryCommand) {
        return await this.commandBus.execute(command);
    }
}