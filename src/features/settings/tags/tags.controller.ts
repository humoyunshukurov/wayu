import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Patch} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateTagRequest} from "./commands/create-tag/create-tag.request";
import {CreateTagResponse} from "./commands/create-tag/create-tag.response";
import {UpdateTagCommand} from "./commands/update-tag/update-tag.command";
import {UpdateTagRequest} from "./commands/update-tag/update-tag.request";
import {DeleteTagCommand} from "./commands/delete-tag/delete-tag.command";
import {GetAllTagsQuery} from "./queries/get-all-tags/get-all-tags.query";
import {GetTagByIdQuery} from "./queries/get-tag-by-id/get-tag-by-id.query";

@Controller('admin/tags')
export class TagsController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [CreateTagResponse]})
    async getAll() {
        return await this.queryBus.execute(new GetAllTagsQuery());
    }

    @Get(':id')
    @ApiOkResponse({type: CreateTagResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetTagByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateTagResponse})
    async create(@Body() req: CreateTagRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    @ApiOkResponse({type: CreateTagResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateTagRequest) {
        const cmd = new UpdateTagCommand();
        cmd.id = id;
        cmd.title = req.title;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteTagCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
