import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateSocialLinkRequest} from "./commands/create-social-link/create-social-link.request";
import {CreateSocialLinkResponse} from "./commands/create-social-link/create-social-link.response";
import {UpdateSocialLinkCommand} from "./commands/update-social-link/update-social-link.command";
import {UpdateSocialLinkRequest} from "./commands/update-social-link/update-social-link.request";
import {DeleteSocialLinkCommand} from "./commands/delete-social-link/delete-social-link.command";
import {GetAllSocialLinksQuery} from "./queries/get-all-social-links/get-all-social-links.query";
import {GetAllSocialLinksResponse} from "./queries/get-all-social-links/get-all-social-links.response";

@Controller('admin/social-links')
export class SocialLinksController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllSocialLinksResponse]})
    async getAll() {
        return await this.queryBus.execute(new GetAllSocialLinksQuery());
    }

    @Post()
    @ApiCreatedResponse({type: CreateSocialLinkResponse})
    async create(@Body() req: CreateSocialLinkRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Put(':id')
    @ApiOkResponse({type: CreateSocialLinkResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateSocialLinkRequest) {
        const cmd = new UpdateSocialLinkCommand();
        cmd.id = id;
        cmd.title = req.title;
        cmd.icon = req.icon;
        cmd.link = req.link;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteSocialLinkCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
