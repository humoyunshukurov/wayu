import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateUsefulLinkRequest} from "./commands/create-useful-link/create-useful-link.request";
import {CreateUsefulLinkResponse} from "./commands/create-useful-link/create-useful-link.response";
import {UpdateUsefulLinkCommand} from "./commands/update-useful-link/update-useful-link.command";
import {UpdateUsefulLinkRequest} from "./commands/update-useful-link/update-useful-link.request";
import {DeleteUsefulLinkCommand} from "./commands/delete-useful-link/delete-useful-link.command";
import {GetAllUsefulLinksQuery} from "./queries/get-all-useful-links/get-all-useful-links.query";
import {GetAllUsefulLinksResponse} from "./queries/get-all-useful-links/get-all-useful-links.response";

@Controller('admin/useful-links')
export class UsefulLinksController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllUsefulLinksResponse]})
    async getAll() {
        return await this.queryBus.execute(new GetAllUsefulLinksQuery());
    }

    @Post()
    @ApiCreatedResponse({type: CreateUsefulLinkResponse})
    async create(@Body() req: CreateUsefulLinkRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Put(':id')
    @ApiOkResponse({type: CreateUsefulLinkResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateUsefulLinkRequest) {
        const cmd = new UpdateUsefulLinkCommand();
        cmd.id = id;
        cmd.title = req.title;
        cmd.icon = req.icon;
        cmd.link = req.link;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteUsefulLinkCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
