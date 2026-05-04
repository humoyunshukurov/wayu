import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Patch, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateNewsRequest} from "./commands/create-news/create-news.request";
import {CreateNewsResponse} from "./commands/create-news/create-news.response";
import {UpdateNewsCommand} from "./commands/update-news/update-news.command";
import {UpdateNewsRequest} from "./commands/update-news/update-news.request";
import {DeleteNewsCommand} from "./commands/delete-news/delete-news.command";
import {GetAllNewsFilters} from "./queries/get-all-news/get-all-news.filters";
import {GetAllNewsQuery} from "./queries/get-all-news/get-all-news.query";
import {GetAllNewsResponse} from "./queries/get-all-news/get-all-news.response";
import {GetNewsByIdQuery} from "./queries/get-news-by-id/get-news-by-id.query";

@Controller('admin/news')
export class NewsController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllNewsResponse]})
    async getAll(@Query() filters: GetAllNewsFilters) {
        return await this.queryBus.execute(new GetAllNewsQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: CreateNewsResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetNewsByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateNewsResponse})
    async create(@Body() req: CreateNewsRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    @ApiOkResponse({type: CreateNewsResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateNewsRequest) {
        const cmd = new UpdateNewsCommand();
        cmd.id = id;
        cmd.categoryId = req.categoryId;
        cmd.countryId = req.countryId;
        cmd.title = req.title;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteNewsCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
