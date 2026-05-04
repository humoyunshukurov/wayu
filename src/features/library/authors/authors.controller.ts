import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Patch, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateAuthorRequest} from "./commands/create-author/create-author.request";
import {CreateAuthorResponse} from "./commands/create-author/create-author.response";
import {UpdateAuthorCommand} from "./commands/update-author/update-author.command";
import {UpdateAuthorRequest} from "./commands/update-author/update-author.request";
import {DeleteAuthorCommand} from "./commands/delete-author/delete-author.command";
import {GetAllAuthorsFilters} from "./queries/get-all-authors/get-all-authors.filters";
import {GetAllAuthorsQuery} from "./queries/get-all-authors/get-all-authors.query";
import {GetAllAuthorsResponse} from "./queries/get-all-authors/get-all-authors.response";
import {GetAuthorByIdQuery} from "./queries/get-author-by-id/get-author-by-id.query";

@Controller('admin/authors')
export class AuthorsController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllAuthorsResponse]})
    async getAll(@Query() filters: GetAllAuthorsFilters) {
        return await this.queryBus.execute(new GetAllAuthorsQuery(filters));
    }

    @Get(':id')
    @ApiOkResponse({type: CreateAuthorResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetAuthorByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateAuthorResponse})
    async create(@Body() req: CreateAuthorRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    @ApiOkResponse({type: CreateAuthorResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateAuthorRequest) {
        const cmd = new UpdateAuthorCommand();
        cmd.id = id;
        cmd.fullName = req.fullName;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteAuthorCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
