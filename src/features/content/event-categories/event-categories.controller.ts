import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Patch, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateEventCategoryRequest} from "./commands/create-event-category/create-event-category.request";
import {CreateEventCategoryResponse} from "./commands/create-event-category/create-event-category.response";
import {UpdateEventCategoryCommand} from "./commands/update-event-category/update-event-category.command";
import {UpdateEventCategoryRequest} from "./commands/update-event-category/update-event-category.request";
import {DeleteEventCategoryCommand} from "./commands/delete-event-category/delete-event-category.command";
import {GetAllEventCategoriesFilters} from "./queries/get-all-event-categories/get-all-event-categories.filters";
import {GetAllEventCategoriesQuery} from "./queries/get-all-event-categories/get-all-event-categories.query";
import {GetAllEventCategoriesResponse} from "./queries/get-all-event-categories/get-all-event-categories.response";
import {GetEventCategoryByIdQuery} from "./queries/get-event-category-by-id/get-event-category-by-id.query";

@Controller('admin/event-categories')
export class EventCategoriesController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllEventCategoriesResponse]})
    async getAll(@Query() filters: GetAllEventCategoriesFilters) {
        return await this.queryBus.execute(new GetAllEventCategoriesQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: CreateEventCategoryResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetEventCategoryByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateEventCategoryResponse})
    async create(@Body() req: CreateEventCategoryRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    @ApiOkResponse({type: CreateEventCategoryResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateEventCategoryRequest) {
        const cmd = new UpdateEventCategoryCommand();
        cmd.id = id;
        cmd.title = req.title;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteEventCategoryCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
