import {
    Body, Controller, Delete, Get, Param, ParseIntPipe,
    Post, Patch, Query, UploadedFile, UseInterceptors,
    BadRequestException,
} from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiConsumes, ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateNewsRequest} from "./commands/create-news/create-news.request";
import {CreateNewsResponse} from "./commands/create-news/create-news.response";
import {UpdateNewsCommand} from "./commands/update-news/update-news.command";
import {UpdateNewsRequest} from "./commands/update-news/update-news.request";
import {DeleteNewsCommand} from "./commands/delete-news/delete-news.command";
import {GetAllNewsFilters} from "./queries/get-all-news/get-all-news.filters";
import {GetAllNewsQuery} from "./queries/get-all-news/get-all-news.query";
import {GetAllNewsResponse} from "./queries/get-all-news/get-all-news.response";
import {GetNewsByIdQuery} from "./queries/get-news-by-id/get-news-by-id.query";
import {imageStorage, imageFilter} from "@/core/upload.util";

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
    @ApiConsumes('multipart/form-data')
    @ApiCreatedResponse({type: CreateNewsResponse})
    @UseInterceptors(FileInterceptor('image', {storage: imageStorage('news'), fileFilter: imageFilter}))
    async create(
        @Body() req: CreateNewsRequest,
        @UploadedFile() image: Express.Multer.File,
    ) {
        if (!image) throw new BadRequestException('image is required');
        return await this.commandBus.execute(req.toCommand(image.path));
    }

    @Patch(':id')
    @ApiConsumes('multipart/form-data')
    @ApiOkResponse({type: CreateNewsResponse})
    @UseInterceptors(FileInterceptor('image', {storage: imageStorage('news'), fileFilter: imageFilter}))
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() req: UpdateNewsRequest,
        @UploadedFile() image?: Express.Multer.File,
    ) {
        const cmd = new UpdateNewsCommand();
        cmd.id = id;
        cmd.categoryId = req.categoryId;
        cmd.countryId = req.countryId ?? null;
        cmd.title = req.title;
        cmd.date = req.date;
        cmd.content = req.content;
        if (image) cmd.image = image.path;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteNewsCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
