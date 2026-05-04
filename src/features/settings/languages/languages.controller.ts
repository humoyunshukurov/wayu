import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Patch} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateLanguageRequest} from "./commands/create-language/create-language.request";
import {CreateLanguageResponse} from "./commands/create-language/create-language.response";
import {UpdateLanguageCommand} from "./commands/update-language/update-language.command";
import {UpdateLanguageRequest} from "./commands/update-language/update-language.request";
import {DeleteLanguageCommand} from "./commands/delete-language/delete-language.command";
import {GetAllLanguagesQuery} from "./queries/get-all-languages/get-all-languages.query";
import {GetLanguageByIdQuery} from "./queries/get-language-by-id/get-language-by-id.query";

@Controller('admin/languages')
export class LanguagesController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    @Get()
    @ApiOkResponse({type: [CreateLanguageResponse]})
    async getAll() {
        return await this.queryBus.execute(new GetAllLanguagesQuery());
    }

    @Get(':id')
    @ApiOkResponse({type: CreateLanguageResponse})
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.queryBus.execute(new GetLanguageByIdQuery(id));
    }

    @Post()
    @ApiCreatedResponse({type: CreateLanguageResponse})
    async create(@Body() req: CreateLanguageRequest) {
        return await this.commandBus.execute(req.toCommand());
    }

    @Patch(':id')
    @ApiOkResponse({type: CreateLanguageResponse})
    async update(@Param('id', ParseIntPipe) id: number, @Body() req: UpdateLanguageRequest) {
        const cmd = new UpdateLanguageCommand();
        cmd.id = id;
        cmd.title = req.title;
        return await this.commandBus.execute(cmd);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        const cmd = new DeleteLanguageCommand();
        cmd.id = id;
        return await this.commandBus.execute(cmd);
    }
}
