import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateInstagramPostRequest} from "./commands/create-instagram-post/create-instagram-post.request";
import {CreateInstagramPostResponse} from "./commands/create-instagram-post/create-instagram-post.response";
import {UpdateInstagramPostCommand} from "./commands/update-instagram-post/update-instagram-post.command";
import {UpdateInstagramPostRequest} from "./commands/update-instagram-post/update-instagram-post.request";
import {DeleteInstagramPostCommand} from "./commands/delete-instagram-post/delete-instagram-post.command";
import {GetAllInstagramPostsFilters} from "./queries/get-all-instagram-posts/get-all-instagram-posts.filters";
import {GetAllInstagramPostsQuery} from "./queries/get-all-instagram-posts/get-all-instagram-posts.query";
import {GetAllInstagramPostsResponse} from "./queries/get-all-instagram-posts/get-all-instagram-posts.response";

@Controller('admin/instagram-posts')
export class InstagramPostsController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [GetAllInstagramPostsResponse]})
    async getAll(@Query() filters: GetAllInstagramPostsFilters) {
        return await this.queryBus.execute(new GetAllInstagramPostsQuery(filters));
    }

    @Post()
    @ApiCreatedResponse({type: CreateInstagramPostResponse})
    async create(@Body() req: CreateInstagramPostRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Put(':id')
    @ApiOkResponse({type: CreateInstagramPostResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateInstagramPostRequest) {
        const cmd = new UpdateInstagramPostCommand();
        cmd.id = id;
        cmd.image = req.image;
        cmd.link = req.link;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteInstagramPostCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
